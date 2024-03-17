import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Put, Request } from '@nestjs/common/decorators';
import { RequestUpdateTaskPosition } from './entities/task.entity';
import { Task } from 'src/board/types';

@Controller('/boards/:boardId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body('sectionId') sectionId: string) {
    return this.taskService.create(sectionId);
  }



  @Delete(':taskId')
  delete(@Param('taskId') taskId: string) {
    try{
      return this.taskService.delete(taskId);
    }catch(e){
      return e.message
    }
  }

  @Put('updatePosition')
  position(@Body() sections: any) {
    return this.taskService.position(sections)
  }

  @Put(':taskId')
  update(@Param('taskId') taskId: string, @Body() task: Task){
      return this.taskService.update(taskId, task);
  }
  
}