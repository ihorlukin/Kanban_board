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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const decorators_1 = require("@nestjs/common/decorators");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(sectionId) {
        return this.taskService.create(sectionId);
    }
    delete(taskId) {
        try {
            return this.taskService.delete(taskId);
        }
        catch (e) {
            return e.message;
        }
    }
    position(sections) {
        return this.taskService.position(sections);
    }
    update(taskId, task) {
        return this.taskService.update(taskId, task);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('sectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "delete", null);
__decorate([
    (0, decorators_1.Put)('updatePosition'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "position", null);
__decorate([
    (0, decorators_1.Put)(':taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "update", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('/boards/:boardId/tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map