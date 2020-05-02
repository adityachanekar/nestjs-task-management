import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { NestApplication } from '@nestjs/core';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){

    }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    //     console.log(filterDto);
        
    // }

    
    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task{
    //     return this.tasksService.getTaskById(id);
    // }

    
    // @Post()
    // @UsePipes(ValidationPipe)
    // creatTask(@Body() createTaskDto: CreateTaskDto): Task{
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): void{
    //     return this.tasksService.deleteTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id:string, 
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    //     ): Task{
    //     return this.tasksService.updateTaskStatus(id,status);
    // }
}
