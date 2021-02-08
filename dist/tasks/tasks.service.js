"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const task_model_1 = require("./task.model");
let TasksService = class TasksService {
    constructor() {
        this._tasks = [];
    }
    getTaskIndexById(id) {
        return this._tasks.findIndex(task => task.id === id);
    }
    getAllTasks() {
        return this._tasks.slice();
    }
    getTasksWithFilter(filterDto) {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => {
                return (task.title.includes(search) ||
                    task.description.includes(search));
            });
        }
        return tasks;
    }
    createTask(createdTaskDto) {
        const { title, description } = createdTaskDto;
        const task = {
            id: uuid_1.v4(),
            title,
            description,
            status: task_model_1.TaskStatus.OPEN
        };
        this._tasks.push(task);
        return task;
    }
    getTaskById(id) {
        const taskIndex = this.getTaskIndexById(id);
        return this._tasks[taskIndex];
    }
    deleteTask(id) {
        const taskIndex = this.getTaskIndexById(id);
        this._tasks.splice(taskIndex, 1);
        return true;
    }
    updateTask(id, status) {
        const taskIndex = this.getTaskIndexById(id);
        const task = Object.assign(Object.assign({}, this._tasks[taskIndex]), { status });
        this._tasks.splice(taskIndex, 1, task);
        return task;
    }
};
TasksService = __decorate([
    common_1.Injectable()
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map