import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardController } from 'src/board/board.controller';

@Controller('boards/:boardId/sections')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private prisma: PrismaService,
    ) {}

  @Post()
  create(@Param('boardId') boardId: string) {
    return this.sectionService.create(boardId);
  }

  @Get()
  getAll(@Param('boardId') boardId: string) {
    return this.sectionService.getAll(boardId)
  }

  @Put(':sectionId')
  update(@Param('sectionId') sectionId: string, @Body('title') title: string ) {
    return this.sectionService.update(sectionId, title);
  }

  @Delete(':sectionId')
  remove(@Param('sectionId') sectionId: string) {
    return this.sectionService.remove(sectionId)
  }
}
