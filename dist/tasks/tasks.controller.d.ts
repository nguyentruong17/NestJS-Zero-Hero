import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private _taskService;
    constructor(_taskService: TasksService);
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    getTaskById(id: number, user: User): Promise<Task>;
    createTask(createdTaskDto: CreateTaskDto, user: User): Promise<Task>;
    deleteTaskById(id: number, user: User): Promise<boolean>;
    updateTaskById(id: number, user: User, status: TaskStatus): Promise<Task>;
}
