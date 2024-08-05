import {IsEmail, IsString, ValidateIf} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @ValidateIf((_, value) => !!value)
  email: string;

  @IsString()
  @ValidateIf((_, value) => !!value)
  google_id: string;

  @IsString()
  @ValidateIf((_, value) => !!value)
  stand_alone_key: string;

  @IsString()
  push_notification_token: string;
}