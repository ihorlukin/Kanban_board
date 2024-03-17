import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { BoardService } from './board.service';
import { updateBoardDto } from './dto';
import { Board } from './types';


@Controller('boards')
export class BoardController {
  constructor(private BoardService: BoardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @GetCurrentUserId() userId: string,
  ){
    return this.BoardService.create(userId)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(
    @GetCurrentUserId() userId: string
  ){
    return this.BoardService.getAll(userId)
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updatePosition(@Body('boards') boards: Board[]){
    return this.BoardService.updatePosition(boards)
  }

  @Get('favourites')
  getFafourites(
    @GetCurrentUserId() userId: string
  ){
    return this.BoardService.getFavourites(userId)
  }

  @Put('favourites')
  updateFavouritePosition(@Body() boards: Board[]){
    return this.BoardService.updateFavouritePosition(boards)
  }

  @Get(':boardId')
  getOne(
    @GetCurrentUserId() userId: string,
    @Param('boardId') boardId: string
  ){
    return this.BoardService.getOne(userId, boardId)
    
  }

  @Put(':boardId')
  update(
    @Body() updateBoardDto: updateBoardDto,
    @Param('boardId') boardId: string
  ) {
    return this.BoardService.update(updateBoardDto, boardId)
  }

  @Delete(':boardId')
  delete(
    @Param('boardId') boardId: string
  ){
    return this.BoardService.delete(boardId)
  }


}