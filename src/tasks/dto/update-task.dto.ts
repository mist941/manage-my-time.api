import {IsArray, IsDateString, IsNotEmpty, IsString, ValidateIf} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  readonly category_ids: [string];

  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @ValidateIf((object, value) => !!value)
  @IsDateString()
  readonly end_date: Date;

  @ValidateIf((object, value) => !!value)
  @IsDateString()
  readonly spent_time: Date;
}