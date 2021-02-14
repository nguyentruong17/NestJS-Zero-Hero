"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../auth/user.entity");
const create_task_dto_1 = require("./dto/create-task.dto");
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const task_status_enum_1 = require("./task-status.enum");
const task_status_validation_pipe_1 = require("./pipes/task-status-validation.pipe");
const tasks_service_1 = require("./tasks.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let TasksController = class TasksController {
    constructor(_taskService) {
        this._taskService = _taskService;
    }
    getTasks(filterDto, user) {
        return this._taskService.getTasksWithFilter(filterDto, user);
    }
    getTaskById(id, user) {
        return this._taskService.getTaskById(id, user);
    }
    createTask(createdTaskDto, user) {
        return this._taskService.createTask(createdTaskDto, user);
    }
    deleteTaskById(id, user) {
        return this._taskService.deleteTask(id, user);
    }
    updateTaskById(id, user, status) {
        return this._taskService.updateTask(id, user, status);
    }
};
__decorate([
    common_1.Get(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Query()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_tasks_filter_dto_1.GetTasksFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskById", null);
__decorate([
    common_1.Patch('/:id/status'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, get_user_decorator_1.GetUser()),
    __param(2, common_1.Body('status', task_status_validation_pipe_1.TaskStatusValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskById", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map