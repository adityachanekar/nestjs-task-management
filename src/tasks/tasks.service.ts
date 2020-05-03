import { Injectable, NotFoundException } from '@nestjs/common';


import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository)
       private taskRepository: TaskRepository,
    ){}
    
    async getTask(filterDto: GetTaskFilterDto): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }



    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }
   

    async updateTaskeStatus(id:number, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }


    async deleteTaskById(id:number): Promise<DeleteResult>{
        const found = await this.getTaskById(id);
        return this.taskRepository.delete(found);
        
    }

}
