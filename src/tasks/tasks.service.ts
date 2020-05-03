import { Injectable, NotFoundException } from '@nestjs/common';


import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository)
       private taskRepository: TaskRepository,
    ){}
    
    async getTask(
        filterDto: GetTaskFilterDto,
        user:User,
        ): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto,user);
    }



    async getTaskById(
        id: number,
        user: User,
        ): Promise<Task>{
        const found = await this.taskRepository.findOne(
            {where: {id, userId: user.id } }
            );


        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }


    async createTask(
        createTaskDto: CreateTaskDto,
        user: User,
        ): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user);
    }
   

    async updateTaskeStatus(
        id:number,
        status: TaskStatus,
        user:User
         ): Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }


    async deleteTaskById(
        id:number,
        user: User
        ): Promise<DeleteResult>{
        const found = await this.getTaskById(id,user);
        return this.taskRepository.delete(found);
    }

}
