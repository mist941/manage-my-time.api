import {IsString, ValidateIf} from 'class-validator';
import {TasksTypes} from '../tasks.types';

export class FindTasksDTO {
  @IsString()
  @ValidateIf((_, value) => !!value)
  readonly type: TasksTypes;

  @IsString()
  @ValidateIf((_, value) => !!value)
  readonly page: number;

  @IsString()
  @ValidateIf((_, value) => !!value)
  readonly per_page: number;
}