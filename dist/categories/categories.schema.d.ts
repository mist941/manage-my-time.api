import { Document } from 'mongoose';
import mongoose from 'mongoose';
export declare type CategoryDocument = Category & Document;
export declare class Category {
    color: string;
    icon: string;
    name: string;
    user: string;
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any>, {}, {}>;
