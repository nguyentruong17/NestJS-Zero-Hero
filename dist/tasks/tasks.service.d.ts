import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private _tasks;
    getTaskIndexById(id: string): number;
    getAllTasks(): Task[];
    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[];
    createTask(createdTaskDto: CreateTaskDto): Task;
    getTaskById(id: string): Task;
    deleteTask(id: string): boolean;
    updateTask(id: string, status: TaskStatus): Task;
}
