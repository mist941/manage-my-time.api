import {IsNotEmpty, IsString} from 'class-validator';
import {TasksTypes} from '../types/tasks.types';

export class FindTasksDTO {
  @IsNotEmpty()
  @IsString()
  readonly type: TasksTypes;
}