import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//repo + entities
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

//models + dtos
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private _taskRepo: TaskRepository,
    ) {}


    getTasksWithFilter(
        filterDto: GetTasksFilterDto,
        user: User): Promise<Task[]> {
        return this._taskRepo.getTasks(filterDto, user);
    }

    createTask(
        createdTaskDto: CreateTaskDto,
        user: User): Promise<Task> {
        return this._taskRepo.createTask(createdTaskDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this._taskRepo.findOne({ where: { id, userId: user.id } });

        //this way, unauthorized will be also counted as not found,
        // but looks like it's a good practice
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found.`);
        }

        return found;
    }

    async deleteTask(id: number, user: User): Promise<boolean> {
        const found = await this.getTaskById(id, user);
        const removed = await this._taskRepo.remove(found);
        if (!removed) {
            return false;
        }

        return true;
        /**
         * Second solution would be calling the delete method
         * 
         * const result = await this._taskRepo.delete(id)
         * const { raw, affected } = result
         * 
         * affected is the count of how many rows were affected by the operation
         * if affected === 0 --> retun false or throw exception
         */
    }

    async updateTask(id: number, user: User, status: TaskStatus): Promise<Task> { 
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();

        return task;
    }
}
