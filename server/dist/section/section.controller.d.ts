/// <reference types="express" />
import { SectionService } from './section.service';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SectionController {
    private readonly sectionService;
    private prisma;
    constructor(sectionService: SectionService, prisma: PrismaService);
    create(boardId: string): Promise<void | {
        id: string;
        boardId: string;
        title: string;
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
    update(sectionId: string, title: string): Promise<import("express").Response<any, Record<string, any>> | {
        success: boolean;
    }>;
    remove(sectionId: string): Promise<import("express").Response<any, Record<string, any>> | {
        success: boolean;
    }>;
}
