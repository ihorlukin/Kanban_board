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
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const prisma_service_1 = require("../prisma/prisma.service");
let SectionService = class SectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(boardId) {
        try {
            const section = await this.prisma.section.create({ data: { boardId: boardId } });
            return section;
        }
        catch (e) {
            return console.log(e.message);
        }
    }
    async update(sectionId, title) {
        try {
            const section = await this.prisma.section.update({
                where: { id: sectionId },
                data: { title },
            });
            return { success: true };
        }
        catch (e) {
            return express_1.response.status(500).json({ message: e.message });
        }
    }
    async remove(sectionId) {
        try {
            await this.prisma.section.delete({
                where: { id: sectionId }
            });
            return { success: true };
        }
        catch (e) {
            return express_1.response.status(500).json({ message: e.message });
        }
    }
    async getAll(boardId) {
        try {
            const sections = await this.prisma.section.findMany({
                where: {
                    boardId: boardId
                },
                include: {
                    tasks: true
                }
            });
            return { seccess: true, data: sections };
        }
        catch (e) {
            return { error: e.message };
        }
    }
};
exports.SectionService = SectionService;
exports.SectionService = SectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SectionService);
//# sourceMappingURL=section.service.js.map