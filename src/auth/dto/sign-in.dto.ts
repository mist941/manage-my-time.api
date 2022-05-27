import {IsEmail, IsString} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  google_id: string;

  @IsString()
  stand_alone_key: string;
}