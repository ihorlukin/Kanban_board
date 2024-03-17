import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { response } from "express"
import { RequestUpdateTaskPosition } from './entities/task.entity';
import { title } from 'process';
import { Task } from 'src/board/types';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService){}

async create(sectionId: string) {
  console.log(sectionId)
    try{
      const section = await this.prisma.section.findUnique({where: {id: sectionId}})
      const tasksCount = await this.prisma.task.count({where: {sectionId: sectionId}})
      const task = await this.prisma.task.create({
        data: {
          sectionId: sectionId,
          position: tasksCount > 0 ? tasksCount : 0
        }
      })
      console.log(task)
      return task
    } catch(e) {
      return response.status(500).json({message: e.message})
    }
  }

async update(taskId: string, task: Task) {
 if(task.title === "") task.title = "Untitled"
 console.log('work update route')
      try{
        const updatedTask = await this.prisma.task.update({
          where: {id: taskId},
          data: {
            title: task.title,
            content: task.content,
          },
        })

        return updatedTask
      } catch(e) {
        return {message: e.message}
      }
  }
  
async delete(taskId: string) {
  console.log(taskId, "TASK ID__________________")
     const currentTask =  await this.prisma.task.findUnique({
      where: {id: taskId}
    }) 
    console.log(currentTask)
    if(!currentTask) throw new NotFoundException('Board not found');
    try{
    await this.prisma.task.delete({where: {id: taskId}})
    }catch(e){
      throw new Error(e.message)
    }
    const tasks = await this.prisma.task.findMany({
      where: {
        sectionId: currentTask.sectionId
      },
      orderBy: {
        position: "asc"
      }
    })
    try{
      for(let i = currentTask.position; i < tasks.length; i++){
        await this.prisma.task.update({
          where: {id: tasks[i].id},
          data: {
            position: i
          }
        })
      }
    } catch(e){
      throw new Error(e.message)
    } 

  }

async position( sections: any) {
  
  
     const {
       resourceList,
       destinationList,
       resourceSectionId,
       destinationSectionId,
       boardId
     } = sections
     
      const resourceListReverse = resourceList.sort((a, b) => b.position - a.position)
      const destinationListReverse = destinationList.sort((a, b) => b.position - a.position)
      try{
       if(resourceSectionId !== destinationSectionId){
         for (const key in resourceListReverse){
           await this.prisma.task.updateMany({
             where: {id: resourceListReverse[key].id},
             data: {
               sectionId: resourceSectionId,
               position: +key
             }
           })
         }
       }
       for( const key in destinationListReverse) {
         await this.prisma.task.updateMany({
           where: {id: destinationListReverse[key].id},
           data: {
             sectionId: destinationSectionId,
             position: +key,
           }
         })
       }

       const sections = await this.prisma.section.findMany({
        where: {boardId: boardId},
        include: {tasks: true}
      })
       console.log(sections)
       return sections
      } catch(e) {
       return new Error(e.message)
      }
  }
  

}
