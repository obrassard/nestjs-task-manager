import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task, TaskStatus } from './task.model';
import { CreatTaskDTO } from './dto/createTask.dto';
import { GetTasksFilteredDTO } from "./dto/getTaskFiltered.dto";
import { TaskStatusValidationPipe } from './pipes/taskstatus-validation.pipe';

@Controller("tasks")
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    public getTasks(@Query(ValidationPipe) filterDto: GetTasksFilteredDTO): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasks(filterDto);
        }
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    public getTaskById(@Param('id') id:string){
            return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTask(@Body() createTaskDto: CreatTaskDTO): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    public updateTaskStatus(@Param('id') id: string, 
                            @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.taskService.updateTask(id, status);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id:string): void {
        this.taskService.deleteTask(id);
    }
}
