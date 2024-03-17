/// <reference types="express" />
import { TaskService } from './task.service';
import { Task } from 'src/board/types';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(sectionId: string): Promise<{
        id: string;
        sectionId: string;
        title: string;
        content: string;
        position: number;
    } | import("express").Response<any, Record<string, any>>>;
    delete(taskId: string): any;
    position(sections: any): Promise<Error | ({
        tasks: {
            id: string;
            sectionId: string;
            title: string;
            content: string;
            position: number;
        }[];
    } & {
        id: string;
        boardId: string;
        title: string;
    })[]>;
    update(taskId: string, task: Task): Promise<{
        id: string;
        sectionId: string;
        title: string;
        content: string;
        position: number;
    } | {
        message: any;
    }>;
}
