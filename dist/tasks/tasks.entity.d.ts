import { User } from '../users/users.schema';
import { Task } from './tasks.schema';
import { Category } from '../categories/categories.schema';
import { DefaultEntity } from '../common/default.entity';
export declare class TaskEntity extends DefaultEntity {
    user: User;
    categories: Array<Category>;
    constructor(partial: Partial<Task>);
}
