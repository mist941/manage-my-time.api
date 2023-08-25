import { CategoriesService } from './categories.service';
import { Category } from './categories.schema';
import { UserParams } from '../users/types/user-params.type';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    categories(user: UserParams): Promise<Category[]>;
    deleteCategory(params: any): Promise<import("@nestjs/common").HttpException>;
    addCategory(params: any, user: UserParams): Promise<Category>;
    changeCategory(params: any, body: Category): Promise<Category>;
}
