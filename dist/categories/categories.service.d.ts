import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { User } from '../users/users.schema';
import { UsersService } from '../users/users.service';
import { UserParams } from '../users/types/user-params.type';
export declare class CategoriesService {
    private categoryModel;
    private userService;
    constructor(categoryModel: Model<CategoryDocument>, userService: UsersService);
    private defaultCategories;
    create(params: CreateCategoryDto): Promise<Category>;
    createEmptyCategory(currentUser: UserParams): Promise<Category>;
    changeCategory(id: any, params: Category): Promise<Category>;
    addDefaultCategories(user: User): Promise<void>;
    findCategoriesByUser(currentUser: UserParams): Promise<Array<Category>>;
    findCategoryById(id: Category | string): Promise<Category>;
    deleteCategory(id: string): Promise<HttpException>;
}
