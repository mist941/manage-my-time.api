import {IsDate, IsNotEmpty, IsString} from 'class-validator';
import {User} from '../../users/users.schema';
import {Category} from '../../categories/categories.schema';
import {TasksTypes} from '../types/tasks.types';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsNotEmpty()
  @IsString()
  type: TasksTypes;
}