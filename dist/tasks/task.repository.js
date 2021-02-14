"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../auth/user.entity");
const task_status_enum_1 = require("./task-status.enum");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    async createTask(createdTaskDto, user) {
        const { title, description } = createdTaskDto;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
    async getTasks(filterDto, user) {
        const { search, status } = filterDto;
        const query = this.createQueryBuilder('currentTask');
        query.where('currentTask.userId = :userId', { userId: user.id });
        if (status) {
            query.andWhere('currentTask.status = :status', { status });
        }
        if (search) {
            query.andWhere('currentTask.title ILIKE :search OR currentTask.description ILIKE :search', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map