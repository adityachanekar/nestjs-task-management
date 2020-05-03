import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Repository, ManyToOne } from "typeorm"
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
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

    @ManyToOne(type => User, user => user.tasks, {eager:false})
    user: User;

    @Column()
    userId:Number;
}


