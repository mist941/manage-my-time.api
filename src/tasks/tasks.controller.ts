import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {UserParams} from '../users/types/user-params.type';
import {CreateTaskDto} from './dto/create-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get('')
  @UseGuards(AuthGuard)
  tasks(@CurrentUser() user: UserParams) {

  }

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  createTask(@Body() params: CreateTaskDto, @CurrentUser() user: UserParams) {
    return this.tasksService.create(params, user);
  }
}
