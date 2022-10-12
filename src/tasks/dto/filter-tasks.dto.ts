import {IsString, ValidateIf} from 'class-validator';
import {TasksTypes} from '../types/tasks.types';

export class FindTasksDTO {
  @IsString()
  @ValidateIf((object, value) => !!value)
  readonly type: TasksTypes;

  @IsString()
  @ValidateIf((object, value) => !!value)
  readonly page: number;

  @IsString()
  @ValidateIf((object, value) => !!value)
  readonly per_page: number;
}