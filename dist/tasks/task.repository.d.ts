import { Repository } from "typeorm";
import { Task } from './task.entity';
import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
export declare class TaskRepository extends Repository<Task> {
    createTask(createdTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
}
