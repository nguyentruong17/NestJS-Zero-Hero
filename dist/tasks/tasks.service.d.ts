import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private _taskRepo;
    constructor(_taskRepo: TaskRepository);
    getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTask(createdTaskDto: CreateTaskDto): Promise<Task>;
    getTaskById(id: number): Promise<Task>;
    deleteTask(id: number): Promise<boolean>;
    updateTask(id: number, status: TaskStatus): Promise<Task>;
}
