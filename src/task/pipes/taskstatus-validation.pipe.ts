import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!value) {
            throw new BadRequestException("A status is required");
        }

        value = value.toUpperCase();
        if (!this.isValidStatus(value)) {
            throw new BadRequestException(
                `'${value}' is an invalid task status.`,
            );
        }
        return value;
    }

    private isValidStatus(status: any) {
        return Object.values(TaskStatus).includes(status);
    }
}
