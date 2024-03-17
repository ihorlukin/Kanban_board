import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateBoardDto } from './dto';
import { Board, Section } from './types';


@Injectable()
export class BoardService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(userId: string){
    try{
      const boardsCount =  await this.prisma.board.count()
      const board = await this.prisma.board.create({
        data: {
          userId,
          position: boardsCount > 0 ?  boardsCount : 0
        }
      })
      return board;
    }catch(e){
      console.log(e.message)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getAll(userId: string){
    const boards = await this.prisma.board.findMany({
      where: {
        userId,
      },
      orderBy: {
        position: 'desc'
      },
      include: {
        user: {
          select: {
            email: true,
          }
        }
      }
    })
    return boards;
  }

  async updatePosition(boards: Board[]){
    try{
      for (const key in boards.reverse()) {
        const board = boards[key]
        await this.prisma.board.update({
          where: {id: board.id},
          data: { position: +key},
        })
      }
    }catch(e){
      console.log(e.message)
    }
  }
  
  async getFavourites(userId: string){
    try{
      const favourites = await this.prisma.board.findMany({
        where: {
          userId,
          favourite: true
        },
        orderBy: {
          favouritePosition: 'desc'
        }
      });
      return favourites;
    } catch(e){
      console.log(e.message)
    }
  }

  async updateFavouritePosition(boards: Board[]){
    try{
      for(const key in boards.reverse()) {
        const board = boards[key]
        await this.prisma.board.update({
          where: {id: board.id},
          data: {favouritePosition: +key}
        })
      }
      return 'updated'
    }catch(e){
      console.log(e.message)
    }
  }

  async getOne(userId: string, boardId: string){
    try {
      console.log(boardId)
      const board = await this.prisma.board.findUnique({
        where: {
          id: boardId,
          userId: userId,
        },
        include: {
          sections: {
            include: {
              tasks: true,
            },
          },
        },
      });
  
      if (!board) {
        return { status: 404, message: 'Board not found' };
      }
  
      return board ;
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }


  async update(updateBoardDto: updateBoardDto, boardId: string){
     
    const {title, description, favourite} = updateBoardDto
     try {
       const currentBoard = await this.prisma.board.findUnique({
         where: { id: boardId },
       });

       if (!currentBoard) {
         throw new NotFoundException('Board not found');
       }
      
       if (title === '') {
         updateBoardDto.title = 'Untitled';
       }

       if (description === '') {
         updateBoardDto.description = 'Add description here';
       }
        // Обновление списка избранных досок, если это необходимо
        if (favourite !== undefined && currentBoard.favourite !== favourite) {
          const favourites = await this.prisma.board.findMany({
            where: {
              userId: currentBoard.userId,
              favourite: true,
              id: { not: boardId },
            },
            orderBy: { favouritePosition: 'asc' },
          });

          if (favourite) {
            // Если текущая доска становится избранной, установить позицию в конец списка
            await this.prisma.board.update({
              where: { id: boardId },
              data: { favouritePosition: favourites.length },
            });
          } else {
            // Если текущая доска перестает быть избранной, обновить позиции остальных избранных досок
            for (let i = 0; i < favourites.length; i++) {
              const favouriteBoard = favourites[i];
              await this.prisma.board.update({
                where: { id: favouriteBoard.id },
                data: { favouritePosition: i },
              });
            }
          }
        }

       const updatedBoard = await this.prisma.board.update({
         where: { id: boardId },
         data: updateBoardDto,
       });

      return updatedBoard;
      
     } catch (err) {
       // Обработка ошибок
       throw new Error(err.message);
     }
  }

  async delete(boardId: string){
    try {
      // Найти доску
      const board = await this.prisma.board.findUnique({
        where: { id: boardId }
      });

      if (!board) {
        throw new NotFoundException('Board not found');
      }

      if (board?.favourite) {
        const favourites = await this.prisma.board.findMany({
          where: {
            userId: board.userId,
            favourite: true,
            id: { not: boardId },
          },
          orderBy: { favouritePosition: 'asc' },
        });

        for(const key in favourites){
          const favourite = favourites[key]
          await this.prisma.board.update({
            where: {
              id: favourite.id
            },
            data: {
              position: +key
            }
          })
        }
      }

      await this.prisma.board.delete({
        where: { id: boardId },
      });
    
      const allBoards = await this.prisma.board.findMany({
        orderBy: { position: 'asc' },
      });

      // Обновление позиций всех досок после удаления
      for(const key in allBoards){
        const board = allBoards[key]
        await this.prisma.board.update({
          where: {
            id: board.id
          },
          data: {
            position: +key
          }
        })
      }
      return {success: true}
    } catch (err) {
      throw new Error(err.message);
    }
    }
  }

