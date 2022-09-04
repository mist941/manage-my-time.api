import {IsNotEmpty, IsString} from 'class-validator';
import {User} from '../../users/users.schema';

export class CreateCategoryDto {
  @IsString()
  readonly color: string;

  @IsString()
  readonly icon: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly user: User;
}