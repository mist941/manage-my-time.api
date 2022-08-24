import {IsNotEmpty, IsString} from 'class-validator';
import {User} from '../../users/users.schema';

export class CreateCategoryDto {
  @IsString()
  color: string;

  @IsString()
  icon: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: User;
}