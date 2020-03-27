import { TaskStatus } from "../task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
export class GetTasksFilteredDTO {
    @IsOptional()
    @IsIn([TaskStatus.Done, TaskStatus.InProgress, TaskStatus.Open])
    public status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    public searchTerm: string;
}
