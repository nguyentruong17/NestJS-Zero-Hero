import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//repo + entities
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

//models + dtos
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

//pipes
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

//services
import { TasksService } from './tasks.service';

//custom decorators
import { GetUser } from 'src/auth/get-user.decorator';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private _taskService: TasksService) { }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User): Promise<Task[]> {
        return this._taskService.getTasksWithFilter(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User): Promise<Task> {
        return this._taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createdTaskDto: CreateTaskDto,
        @GetUser() user: User) {
        return this._taskService.createTask(createdTaskDto, user);
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User): Promise<boolean> {
        return this._taskService.deleteTask(id, user);
    }
    
    @Patch('/:id/status')
    updateTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this._taskService.updateTask(id, user, status);
    }
}
