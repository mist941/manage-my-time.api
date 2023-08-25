import { CategoriesService } from '../categories/categories.service';
import { UserParams } from '../users/types/user-params.type';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from '../users/users.service';
export declare class StatisticsServices {
    private userService;
    private categoriesService;
    private tasksServices;
    constructor(userService: UsersService, categoriesService: CategoriesService, tasksServices: TasksService);
    getStatisticsByTypes(queryParams: any, currentUser: UserParams): Promise<any>;
    getStatisticsByCategories(queryParams: any, currentUser: UserParams): Promise<any>;
}
