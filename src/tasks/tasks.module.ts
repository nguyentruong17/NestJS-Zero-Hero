import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]) //making typeormmodule from nestjs to include this taskrepository instance injectable thru-out this module
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
