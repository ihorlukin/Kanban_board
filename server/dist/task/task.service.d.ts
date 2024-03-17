/// <reference types="express" />
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from 'src/board/types';
export declare class TaskService {
    private prisma;
    constructor(prisma: PrismaService);
    create(sectionId: string): Promise<{
        id: string;
        sectionId: string;
        title: string;
        content: string;
        position: number;
    } | import("express").Response<any, Record<string, any>>>;
    update(taskId: string, task: Task): Promise<{
        id: string;
        sectionId: string;
        title: string;
        content: string;
        position: number;
    } | {
        message: any;
    }>;
    delete(taskId: string): Promise<void>;
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
}
