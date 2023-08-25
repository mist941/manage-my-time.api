import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    google_id: string;
    stand_alone_key: string;
    email: string;
    push_notification_token: string;
}
export declare const UsersSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any>, {}, {}>;
