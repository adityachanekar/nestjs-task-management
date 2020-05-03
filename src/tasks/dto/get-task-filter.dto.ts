import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.DONE,TaskStatus.IN_PROGRSS])
    status: TaskStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}