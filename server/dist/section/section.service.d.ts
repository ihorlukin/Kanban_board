/// <reference types="express" />
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SectionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(boardId: string): Promise<void | {
        id: string;
        boardId: string;
        title: string;
    }>;
    update(sectionId: string, title: string): Promise<import("express").Response<any, Record<string, any>> | {
        success: boolean;
    }>;
    remove(sectionId: string): Promise<import("express").Response<any, Record<string, any>> | {
        success: boolean;
    }>;
    getAll(boardId: string): Promise<{
        seccess: boolean;
        data: ({
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
        })[];
        error?: undefined;
    } | {
        error: any;
        seccess?: undefined;
        data?: undefined;
    }>;
}
