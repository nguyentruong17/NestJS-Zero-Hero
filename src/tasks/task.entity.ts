import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';


@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn() //primary key, should be auto generated and incremented by postgres
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    status: TaskStatus;
}