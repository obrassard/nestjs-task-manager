import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreatTaskDTO } from "./dto/createTask.dto";
import { GetTasksFilteredDTO } from "./dto/getTaskFiltered.dto";

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTaskById(id: string): Task {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            throw new NotFoundException(`Task with id '${id}' not found`);
        }
        return task;
    }

    public getTasks(filterDto: GetTasksFilteredDTO): Task[] {
        const { status, searchTerm } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(t => t.status === status);
        }

        if (searchTerm) {
            tasks = tasks.filter(
                t =>
                    t.title.includes(searchTerm) ||
                    t.description.includes(searchTerm),
            );
        }

        return tasks;
    }

    public createTask(createTaskDTO: CreatTaskDTO): Task {
        const { title, description } = createTaskDTO;
        let task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.Open,
        };

        this.tasks.push(task);
        return task;
    }

    public updateTask(id: string, status: TaskStatus) {
        let task = this.getTaskById(id);
        if (task == undefined) {
            throw new Error("Invalid TaskID");
        } else {
            task.status = status;
        }
        return task;
    }

    public deleteTask(id: string): void {
        const task = this.getTaskById(id);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
    }
}
