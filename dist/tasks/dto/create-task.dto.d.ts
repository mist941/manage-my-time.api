import { TasksTypes } from '../types/tasks.types';
export declare class CreateTaskDto {
    readonly name: string;
    readonly category_ids: [string];
    readonly start_date: Date;
    readonly end_date: Date;
    readonly spent_time: Date;
    readonly type: TasksTypes;
}
