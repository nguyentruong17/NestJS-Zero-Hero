import { Repository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
export declare class TaskRepository extends Repository<Task> {
    createTask(createdTaskDto: CreateTaskDto): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
}
