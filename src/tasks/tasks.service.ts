import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

//models + dtos
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    
    private _tasks: Task[] = [];

    getTaskIndexById(id: string): number {
        const index = this._tasks.findIndex(task => task.id === id);
        if (index === -1) {
            throw new NotFoundException(`Task with ID "${id}" not found.`);
        }
        return index;
    }

    getAllTasks(): Task[] {
        return this._tasks.slice();
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks()
        
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => {
                return (
                    task.title.includes(search) || 
                    task.description.includes(search)
                )
            })
        }

        return tasks
    }

    createTask(createdTaskDto: CreateTaskDto): Task {
        const { title, description } = createdTaskDto;
        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        } as Task;

        this._tasks.push(task);
        return task
    }

    getTaskById(id: string): Task {
        const taskIndex = this.getTaskIndexById(id);
        return this._tasks[taskIndex];
    }

    deleteTask(id: string): boolean {
        const taskIndex = this.getTaskIndexById(id);
        this._tasks.splice(taskIndex, 1);
        return true;
    }

    updateTask(id: string, status: TaskStatus): Task {
        const taskIndex = this.getTaskIndexById(id);
        const task = {
            ...this._tasks[taskIndex],
            status
        } as Task;

        this._tasks.splice(taskIndex, 1, task);
        return task;
    }
}
