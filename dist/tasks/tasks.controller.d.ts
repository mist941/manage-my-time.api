import { TasksService } from './tasks.service';
import { UserParams } from '../users/types/user-params.type';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindTasksDTO } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    tasks(queryParams: FindTasksDTO, user: UserParams): Promise<import("./tasks.entity").TaskEntity[]>;
    createTask(body: CreateTaskDto, user: UserParams): Promise<import("./tasks.entity").TaskEntity>;
    changeTask(params: any, body: UpdateTaskDto, user: UserParams): Promise<import("./tasks.entity").TaskEntity>;
    completeTask(params: any): Promise<import("./tasks.entity").TaskEntity>;
    closeTask(params: any): Promise<import("./tasks.entity").TaskEntity>;
    deleteTask(params: any): Promise<import("@nestjs/common").HttpException>;
}
