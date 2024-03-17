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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const board_service_1 = require("./board.service");
const dto_1 = require("./dto");
let BoardController = class BoardController {
    constructor(BoardService) {
        this.BoardService = BoardService;
    }
    create(userId) {
        return this.BoardService.create(userId);
    }
    getAll(userId) {
        return this.BoardService.getAll(userId);
    }
    updatePosition(boards) {
        return this.BoardService.updatePosition(boards);
    }
    getFafourites(userId) {
        return this.BoardService.getFavourites(userId);
    }
    updateFavouritePosition(boards) {
        return this.BoardService.updateFavouritePosition(boards);
    }
    getOne(userId, boardId) {
        return this.BoardService.getOne(userId, boardId);
    }
    update(updateBoardDto, boardId) {
        return this.BoardService.update(updateBoardDto, boardId);
    }
    delete(boardId) {
        return this.BoardService.delete(boardId);
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)('boards')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "updatePosition", null);
__decorate([
    (0, common_1.Get)('favourites'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getFafourites", null);
__decorate([
    (0, common_1.Put)('favourites'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "updateFavouritePosition", null);
__decorate([
    (0, common_1.Get)(':boardId'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':boardId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.updateBoardDto, String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':boardId'),
    __param(0, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoardController.prototype, "delete", null);
exports.BoardController = BoardController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [board_service_1.BoardService])
], BoardController);
//# sourceMappingURL=board.controller.js.map