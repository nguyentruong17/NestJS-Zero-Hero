import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private _taskRepo;
    constructor(_taskRepo: TaskRepository);
    getTasksWithFilter(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createTask(createdTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTaskById(id: number, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<boolean>;
    updateTask(id: number, user: User, status: TaskStatus): Promise<Task>;
}
