import { TasksTypes } from '../types/tasks.types';
export declare class FindTasksDTO {
    readonly type: TasksTypes;
    readonly page: number;
    readonly per_page: number;
}
