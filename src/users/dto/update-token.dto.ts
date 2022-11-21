import {IsNotEmpty, IsString} from 'class-validator';

export class UpdateTokenDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;
}