import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Repository } from "typeorm"
import { TaskStatus } from './task-status.enum';
@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:String;

    @Column()
    description:string;

    @Column()
    status: TaskStatus;
}


