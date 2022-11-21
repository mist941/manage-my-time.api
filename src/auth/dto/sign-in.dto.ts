import {IsEmail, IsString, ValidateIf} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @ValidateIf((object, value) => !!value)
  email: string;

  @IsString()
  @ValidateIf((object, value) => !!value)
  google_id: string;

  @IsString()
  @ValidateIf((object, value) => !!value)
  stand_alone_key: string;

  @IsString()
  push_notification_token: string;
}