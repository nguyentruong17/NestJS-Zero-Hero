import { EntityRepository, Repository } from "typeorm";

//repo + entities
import { Task } from './task.entity';

//models + dtos
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

/**
 * the repository will now be responsible for handling database logic, 
 * while the service will only be responsible for handling business logic
 */
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> { 
    async createTask(createdTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createdTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save();
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { search, status } = filterDto;
        const query = this.createQueryBuilder('currentTask');

        if(status) {
            query.andWhere('currentTask.status = :status', {status}) //value of the {status} will be provided to :status
        }

        if(search) {
            query.andWhere('currentTask.title ILIKE :search OR currentTask.description ILIKE :search', {search: `%${search}%`}) //%{search}% means partially matching
        }

        const tasks = await query.getMany()

        return tasks;
    }

}