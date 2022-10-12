import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {UserParams} from '../users/types/user-params.type';
import {CreateTaskDto} from './dto/create-task.dto';
import {FindTasksDTO} from './dto/filter-tasks.dto';
import {UpdateTaskDto} from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get('')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  tasks(@Query() queryParams: FindTasksDTO, @CurrentUser() user: UserParams) {
    console.log(queryParams);
    return this.tasksService.getTasks(queryParams, user);
  }

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  createTask(@Body() body: CreateTaskDto, @CurrentUser() user: UserParams) {
    return this.tasksService.create(body, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  changeTask(@Param() params, @Body() body: UpdateTaskDto) {
    return this.tasksService.changeTask(params.id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteTask(@Param() params) {
    return this.tasksService.deleteTask(params.id);
  }
}
