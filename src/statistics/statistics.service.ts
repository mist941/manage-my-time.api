import {Injectable} from '@nestjs/common';
import {CategoriesService} from '../categories/categories.service';
import {UserSignInParams} from '../users/users.types';
import {TasksService} from '../tasks/tasks.service';
import {UsersService} from '../users/users.service';

@Injectable()
export class StatisticsServices {
  constructor(
    private userService: UsersService,
    private categoriesService: CategoriesService,
    private tasksServices: TasksService,
  ) {
  }

  async getStatisticsByTypes(queryParams, currentUser: UserSignInParams): Promise<any> {
    const completedTasks = await this.tasksServices.getTasks({...queryParams, completed: true}, currentUser);
    const closedTasks = await this.tasksServices.getTasks({...queryParams, closed: true}, currentUser);

    return {
      completed_tasks_count: completedTasks.length,
      closed_tasks_count: closedTasks.length,
    }
  }

  async getStatisticsByCategories(currentUser: UserSignInParams): Promise<any> {
    const categories = [];
    const categoriesByUser = await this.categoriesService.findCategoriesByUser(currentUser);

    for (let i = 0; i < categoriesByUser.length; i++) {
      const tasks = await this.tasksServices.getTasks({category: categoriesByUser[i]}, currentUser);

      categories.push({
        name: categoriesByUser[i].name,
        color: categoriesByUser[i].color,
        tasks_count: tasks.length
      });
    }

    return categories;
  }
}