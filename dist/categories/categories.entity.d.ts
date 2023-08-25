import { DefaultEntity } from '../common/default.entity';
import { Category } from './categories.schema';
import { User } from '../users/users.schema';
export declare class CategoryEntity extends DefaultEntity {
    user: User;
    constructor(partial: Partial<Category>);
}
