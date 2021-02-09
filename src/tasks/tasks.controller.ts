import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

//models + dtos
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';

//services
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private _taskService: TasksService) {

    }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length > 0) {
            return this._taskService.getTasksWithFilter(filterDto);
        }
        return this._taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this._taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createdTaskDto: CreateTaskDto) {
        return this._taskService.createTask(createdTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): boolean {
        return this._taskService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    updateTaskById(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this._taskService.updateTask(id, status);
    }
}
