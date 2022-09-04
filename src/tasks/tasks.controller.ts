import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {UserParams} from '../users/types/user-params.type';
import {CreateTaskDTO} from './dto/create-task.dto';
import {FindTasksDTO} from './dto/filter-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get('')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  tasks(@Query() queryParams: FindTasksDTO, @CurrentUser() user: UserParams) {
    return this.tasksService.getTasks(queryParams, user);
  }

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  createTask(@Body() params: CreateTaskDTO, @CurrentUser() user: UserParams) {
    return this.tasksService.create(params, user);
  }
}
