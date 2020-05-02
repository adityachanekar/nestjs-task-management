import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRSS,
        TaskStatus.DONE,
    ];

    transform(value: any){
        console.log('value', value);
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any){
        const indx = this.allowedStatuses.indexOf(status);
        return indx !== -1;
    }
}