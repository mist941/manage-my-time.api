/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Task, TaskDocument } from '../tasks/tasks.schema';
import { Model } from 'mongoose';
import { ExpoPushMessage } from 'expo-server-sdk';
export declare class PushNotificationService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    handleCron(): Promise<void>;
    getTasks(): Promise<(Task & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    prepareMessages(tasks: Array<Task>): Array<ExpoPushMessage>;
    sendPushNotifications(messages: Array<ExpoPushMessage>): Promise<void>;
    updateTasks(tasks: Array<TaskDocument>): Promise<void>;
}
