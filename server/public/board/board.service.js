"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BoardService = class BoardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId) {
        try {
            const boardsCount = await this.prisma.board.count();
            const board = await this.prisma.board.create({
                data: {
                    userId,
                    position: boardsCount > 0 ? boardsCount : 0
                }
            });
            return board;
        }
        catch (e) {
            console.log(e.message);
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAll(userId) {
        const boards = await this.prisma.board.findMany({
            where: {
                userId,
            },
            orderBy: {
                position: 'desc'
            },
            include: {
                user: {
                    select: {
                        email: true,
                    }
                }
            }
        });
        return boards;
    }
    async updatePosition(boards) {
        try {
            for (const key in boards.reverse()) {
                const board = boards[key];
                await this.prisma.board.update({
                    where: { id: board.id },
                    data: { position: +key },
                });
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async getFavourites(userId) {
        try {
            const favourites = await this.prisma.board.findMany({
                where: {
                    userId,
                    favourite: true
                },
                orderBy: {
                    favouritePosition: 'desc'
                }
            });
            return favourites;
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async updateFavouritePosition(boards) {
        try {
            for (const key in boards.reverse()) {
                const board = boards[key];
                await this.prisma.board.update({
                    where: { id: board.id },
                    data: { favouritePosition: +key }
                });
            }
            return 'updated';
        }
        catch (e) {
            console.log(e.message);
        }
    }
    async getOne(userId, boardId) {
        try {
            console.log(boardId);
            const board = await this.prisma.board.findUnique({
                where: {
                    id: boardId,
                    userId: userId,
                },
                include: {
                    sections: {
                        include: {
                            tasks: true,
                        },
                    },
                },
            });
            if (!board) {
                return { status: 404, message: 'Board not found' };
            }
            return board;
        }
        catch (err) {
            return { status: 500, message: err.message };
        }
    }
    async update(updateBoardDto, boardId) {
        const { title, description, favourite } = updateBoardDto;
        try {
            const currentBoard = await this.prisma.board.findUnique({
                where: { id: boardId },
            });
            if (!currentBoard) {
                throw new common_1.NotFoundException('Board not found');
            }
            if (title === '') {
                updateBoardDto.title = 'Untitled';
            }
            if (description === '') {
                updateBoardDto.description = 'Add description here';
            }
            if (favourite !== undefined && currentBoard.favourite !== favourite) {
                const favourites = await this.prisma.board.findMany({
                    where: {
                        userId: currentBoard.userId,
                        favourite: true,
                        id: { not: boardId },
                    },
                    orderBy: { favouritePosition: 'asc' },
                });
                if (favourite) {
                    await this.prisma.board.update({
                        where: { id: boardId },
                        data: { favouritePosition: favourites.length },
                    });
                }
                else {
                    for (let i = 0; i < favourites.length; i++) {
                        const favouriteBoard = favourites[i];
                        await this.prisma.board.update({
                            where: { id: favouriteBoard.id },
                            data: { favouritePosition: i },
                        });
                    }
                }
            }
            const updatedBoard = await this.prisma.board.update({
                where: { id: boardId },
                data: updateBoardDto,
            });
            return updatedBoard;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async delete(boardId) {
        try {
            const board = await this.prisma.board.findUnique({
                where: { id: boardId }
            });
            if (!board) {
                throw new common_1.NotFoundException('Board not found');
            }
            if (board?.favourite) {
                const favourites = await this.prisma.board.findMany({
                    where: {
                        userId: board.userId,
                        favourite: true,
                        id: { not: boardId },
                    },
                    orderBy: { favouritePosition: 'asc' },
                });
                for (const key in favourites) {
                    const favourite = favourites[key];
                    await this.prisma.board.update({
                        where: {
                            id: favourite.id
                        },
                        data: {
                            position: +key
                        }
                    });
                }
            }
            await this.prisma.board.delete({
                where: { id: boardId },
            });
            const allBoards = await this.prisma.board.findMany({
                orderBy: { position: 'asc' },
            });
            for (const key in allBoards) {
                const board = allBoards[key];
                await this.prisma.board.update({
                    where: {
                        id: board.id
                    },
                    data: {
                        position: +key
                    }
                });
            }
            return { success: true };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoardService);
//# sourceMappingURL=board.service.js.map