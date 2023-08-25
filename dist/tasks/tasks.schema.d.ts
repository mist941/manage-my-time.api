import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '../users/users.schema';
import { TasksTypes } from './types/tasks.types';
import { Category } from '../categories/categories.schema';
export declare type TaskDocument = Task & Document;
export declare class Task {
    name: string;
    type: TasksTypes;
    user: User;
    categories: Category[];
    start_date: Date;
    spent_time: Date;
    end_date: Date;
    finished_date: Date;
    closed_date: Date;
    sent_notification: Boolean;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any>, {}, {}>;
