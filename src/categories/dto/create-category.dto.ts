import {IsNotEmpty, IsString} from 'class-validator';
import {User} from '../../users/users.schema';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: User;
}