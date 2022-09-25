import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {UsersService} from '../users/users.service';
import {Task, TaskDocument} from './tasks.schema';
import {CreateTaskDto} from './dto/create-task.dto';
import {UserParams} from '../users/types/user-params.type';
import {CategoriesService} from '../categories/categories.service';
import {Category} from '../categories/categories.schema';
import {TaskEntity} from './tasks.entity';
import {UpdateTaskDto} from './dto/update-task.dto';

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

  async changeTask(id: string, params: UpdateTaskDto): Promise<TaskEntity> {
    const preparedCategories: Category[] = await Promise.all(
      (params.category_ids ?? []).map(id => this.categoriesService.findCategoryById(id))
    );

    const preparedParams: Omit<Task, 'user' | 'type'> = {
      name: params.name,
      start_date: params.start_date,
      end_date: params.end_date ?? null,
      spent_time: params.spent_time ?? null,
      categories: preparedCategories,
    };

    try {
      const task = await this.taskModel.findByIdAndUpdate(id, preparedParams, {new: true});
      return new TaskEntity(task.toObject());
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(id: string): Promise<HttpException> {
    try {
      await this.taskModel.deleteOne({_id: id});
      return new HttpException('Task was deleted!', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getTasks(queryParams, currentUser: UserParams) {
    const user = await this.userService.getUserByAnyParams(currentUser);
    const filterParams = {type: queryParams.type, user};

    try {
      let tasks = await this.taskModel
        .find(filterParams, null, {
          sort: {start_date: -1},
          populate: 'categories',
          limit: Number(queryParams.per_page),
          skip: Number(queryParams.per_page) * Number(queryParams.page)
        })

      return tasks.map(task => new TaskEntity(task.toObject()));
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
