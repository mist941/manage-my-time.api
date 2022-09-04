import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {UsersService} from '../users/users.service';
import {Task, TaskDocument} from './tasks.schema';
import {CreateTaskDto} from './dto/create-task.dto';
import {UserParams} from '../users/types/user-params.type';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.schema';
import {TaskEntity} from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private userService: UsersService,
    private categoriesService: CategoriesService,
  ) {
  }

  async create(params: CreateTaskDto, currentUser: UserParams): Promise<TaskEntity> {
    const user = await this.userService.getUserByAnyParams(currentUser);

    const preparedCategories: Category[] = await Promise.all(
      (params.category_ids ?? []).map(id => this.categoriesService.findCategoryById(id))
    );

    const preparedParams: Task = {
      name: params.name,
      start_date: params.start_date,
      end_date: params.end_date ?? null,
      spent_time: params.spent_time ?? null,
      type: params.type,
      categories: preparedCategories,
      user,
    };

    try {
      const task = await new this.taskModel(preparedParams);
      return new TaskEntity((await task.save()).toObject());
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
