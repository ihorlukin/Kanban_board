import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService){
  }

 async create(boardId: string) {
    try{
      const section = await this.prisma.section.create({data: {boardId: boardId}})
      return section
    } catch(e) {
      // return response.status(500).json({message: e.message})
      return console.log(e.message)
    }
  }

  async update(sectionId: string, title: string) {
    
    try{
      const section = await this.prisma.section.update({
        where: {id: sectionId},
        data:{title},
      })
     return {success: true}
    }catch(e) {
     return response.status(500).json({message: e.message})
    }
  }

  
  async remove(sectionId: string) {
    
    try{
      //find section
       await this.prisma.section.delete({
        where: {id: sectionId}
      })
      return {success: true}
    } catch(e) {
      return response.status(500).json({message: e.message})
    }
  }

  async getAll(boardId: string) {
    try{
      const sections = await this.prisma.section.findMany({
        where: {
          boardId: boardId
        },
        include: {
          tasks: true
        }
      })
      
      return {seccess: true, data: sections}
    } catch(e){
      return {error: e.message}
    }
  }
}
