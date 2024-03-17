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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const section_service_1 = require("./section.service");
const prisma_service_1 = require("../prisma/prisma.service");
let SectionController = class SectionController {
    constructor(sectionService, prisma) {
        this.sectionService = sectionService;
        this.prisma = prisma;
    }
    create(boardId) {
        return this.sectionService.create(boardId);
    }
    getAll(boardId) {
        return this.sectionService.getAll(boardId);
    }
    update(sectionId, title) {
        return this.sectionService.update(sectionId, title);
    }
    remove(sectionId) {
        return this.sectionService.remove(sectionId);
    }
};
exports.SectionController = SectionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)(':sectionId'),
    __param(0, (0, common_1.Param)('sectionId')),
    __param(1, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':sectionId'),
    __param(0, (0, common_1.Param)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "remove", null);
exports.SectionController = SectionController = __decorate([
    (0, common_1.Controller)('boards/:boardId/sections'),
    __metadata("design:paramtypes", [section_service_1.SectionService,
        prisma_service_1.PrismaService])
], SectionController);
//# sourceMappingURL=section.controller.js.map