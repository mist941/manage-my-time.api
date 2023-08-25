import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { TaskDocument } from './tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserParams } from '../users/types/user-params.type';
import { CategoriesService } from '../categories/categories.service';
import { TaskEntity } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/users.schema';
export declare class TasksService {
    private taskModel;
    private userService;
    private categoriesService;
    constructor(taskModel: Model<TaskDocument>, userService: UsersService, categoriesService: CategoriesService);
    create(params: CreateTaskDto, currentUser: UserParams): Promise<TaskEntity>;
    changeTask(id: string, params: UpdateTaskDto, currentUser: UserParams): Promise<TaskEntity>;
    completeTask(id: string): Promise<TaskEntity>;
    closeTask(id: string): Promise<TaskEntity>;
    deleteTask(id: string): Promise<HttpException>;
    getTasks(queryParams: any, currentUser: UserParams): Promise<Array<TaskEntity>>;
    getTasksByDate(startDate: Date, endDate: Date, user: User): Promise<Array<TaskDocument>>;
}
