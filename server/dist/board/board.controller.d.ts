import { BoardService } from './board.service';
import { updateBoardDto } from './dto';
import { Board } from './types';
export declare class BoardController {
    private BoardService;
    constructor(BoardService: BoardService);
    create(userId: string): Promise<{
        id: string;
        userId: string;
        icon: string;
        title: string;
        description: string;
        position: number;
        favourite: boolean;
        favouritePosition: number;
    }>;
    getAll(userId: string): Promise<({
        user: {
            email: string;
        };
    } & {
        id: string;
        userId: string;
        icon: string;
        title: string;
        description: string;
        position: number;
        favourite: boolean;
        favouritePosition: number;
    })[]>;
    updatePosition(boards: Board[]): Promise<void>;
    getFafourites(userId: string): Promise<{
        id: string;
        userId: string;
        icon: string;
        title: string;
        description: string;
        position: number;
        favourite: boolean;
        favouritePosition: number;
    }[]>;
    updateFavouritePosition(boards: Board[]): Promise<string>;
    getOne(userId: string, boardId: string): Promise<({
        sections: ({
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
    } & {
        id: string;
        userId: string;
        icon: string;
        title: string;
        description: string;
        position: number;
        favourite: boolean;
        favouritePosition: number;
    }) | {
        status: number;
        message: any;
    }>;
    update(updateBoardDto: updateBoardDto, boardId: string): Promise<{
        id: string;
        userId: string;
        icon: string;
        title: string;
        description: string;
        position: number;
        favourite: boolean;
        favouritePosition: number;
    }>;
    delete(boardId: string): Promise<{
        success: boolean;
    }>;
}
