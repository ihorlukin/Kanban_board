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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const express_1 = require("express");
let TaskService = class TaskService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(sectionId) {
        console.log(sectionId);
        try {
            const section = await this.prisma.section.findUnique({ where: { id: sectionId } });
            const tasksCount = await this.prisma.task.count({ where: { sectionId: sectionId } });
            const task = await this.prisma.task.create({
                data: {
                    sectionId: sectionId,
                    position: tasksCount > 0 ? tasksCount : 0
                }
            });
            console.log(task);
            return task;
        }
        catch (e) {
            return express_1.response.status(500).json({ message: e.message });
        }
    }
    async update(taskId, task) {
        if (task.title === "")
            task.title = "Untitled";
        console.log('work update route');
        try {
            const updatedTask = await this.prisma.task.update({
                where: { id: taskId },
                data: {
                    title: task.title,
                    content: task.content,
                },
            });
            return updatedTask;
        }
        catch (e) {
            return { message: e.message };
        }
    }
    async delete(taskId) {
        console.log(taskId, "TASK ID__________________");
        const currentTask = await this.prisma.task.findUnique({
            where: { id: taskId }
        });
        console.log(currentTask);
        if (!currentTask)
            throw new common_1.NotFoundException('Board not found');
        try {
            await this.prisma.task.delete({ where: { id: taskId } });
        }
        catch (e) {
            throw new Error(e.message);
        }
        const tasks = await this.prisma.task.findMany({
            where: {
                sectionId: currentTask.sectionId
            },
            orderBy: {
                position: "asc"
            }
        });
        try {
            for (let i = currentTask.position; i < tasks.length; i++) {
                await this.prisma.task.update({
                    where: { id: tasks[i].id },
                    data: {
                        position: i
                    }
                });
            }
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    async position(sections) {
        const { resourceList, destinationList, resourceSectionId, destinationSectionId, boardId } = sections;
        const resourceListReverse = resourceList.sort((a, b) => b.position - a.position);
        const destinationListReverse = destinationList.sort((a, b) => b.position - a.position);
        try {
            if (resourceSectionId !== destinationSectionId) {
                for (const key in resourceListReverse) {
                    await this.prisma.task.updateMany({
                        where: { id: resourceListReverse[key].id },
                        data: {
                            sectionId: resourceSectionId,
                            position: +key
                        }
                    });
                }
            }
            for (const key in destinationListReverse) {
                await this.prisma.task.updateMany({
                    where: { id: destinationListReverse[key].id },
                    data: {
                        sectionId: destinationSectionId,
                        position: +key,
                    }
                });
            }
            const sections = await this.prisma.section.findMany({
                where: { boardId: boardId },
                include: { tasks: true }
            });
            console.log(sections);
            return sections;
        }
        catch (e) {
            return new Error(e.message);
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map