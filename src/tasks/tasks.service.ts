import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    
    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[]{
        const {status, search}  = filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(task => task.status === status)
        }
        if(search){
            tasks = tasks.filter(task=>
                task.title.includes(search)||
                task.description.includes(search),
                );
        }

        return tasks; 
    }

    getTaskById(id: string): Task{

        const found = this.tasks.find(task => task.id === id);
        if (!found){
            throw new NotFoundException('Task with ID not found');
        }
        else {
            return found;
        }
    }

    createTask(createTaskDto: CreateTaskDto): Task{
        const {title, description} = createTaskDto;
        const task: Task={
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuid(),
        };

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id:string,status: TaskStatus): Task{
        const task: Task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTaskById(id: string): void{
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != id);
        console.log('Task Deleted');
    }
}
