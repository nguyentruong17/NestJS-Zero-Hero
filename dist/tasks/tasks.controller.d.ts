import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private _taskService;
    constructor(_taskService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(createdTaskDto: CreateTaskDto): Promise<Task>;
    deleteTaskById(id: number): Promise<boolean>;
    updateTaskById(id: number, status: TaskStatus): Promise<Task>;
}
