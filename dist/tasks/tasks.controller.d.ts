import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private _taskService;
    constructor(_taskService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Task[];
    getTaskById(id: string): Task;
    createTask(createdTaskDto: CreateTaskDto): Task;
    deleteTaskById(id: string): boolean;
    updateTaskById(id: string, status: TaskStatus): Task;
}
