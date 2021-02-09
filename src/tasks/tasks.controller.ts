import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

//repo + entities
import { Task } from './task.entity';

//models + dtos
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

//pipes
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

//services
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private _taskService: TasksService) {

    }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this._taskService.getTasksWithFilter(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this._taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createdTaskDto: CreateTaskDto) {
        return this._taskService.createTask(createdTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this._taskService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    updateTaskById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this._taskService.updateTask(id, status);
    }
}
