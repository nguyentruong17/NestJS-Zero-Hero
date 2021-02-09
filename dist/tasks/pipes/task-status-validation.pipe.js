"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("../task-status.enum");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatuses = [
            ...Object.values(task_status_enum_1.TaskStatus)
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`Invalid Status. Status must be one of ${this.allowedStatuses}`);
        }
        return value;
    }
    isStatusValid(status) {
        return this.allowedStatuses.includes(status);
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=task-status-validation.pipe.js.map