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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_repository_1 = require("./task.repository");
const user_entity_1 = require("../auth/user.entity");
let TasksService = class TasksService {
    constructor(_taskRepo) {
        this._taskRepo = _taskRepo;
    }
    getTasksWithFilter(filterDto, user) {
        return this._taskRepo.getTasks(filterDto, user);
    }
    createTask(createdTaskDto, user) {
        return this._taskRepo.createTask(createdTaskDto, user);
    }
    async getTaskById(id, user) {
        const found = await this._taskRepo.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found.`);
        }
        return found;
    }
    async deleteTask(id, user) {
        const found = await this.getTaskById(id, user);
        const removed = await this._taskRepo.remove(found);
        if (!removed) {
            return false;
        }
        return true;
    }
    async updateTask(id, user, status) {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_repository_1.TaskRepository)),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map