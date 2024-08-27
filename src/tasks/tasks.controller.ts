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
import {UserSignInParams} from '../users/users.types';
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
  tasks(@Query() queryParams: FindTasksDTO, @CurrentUser() user: UserSignInParams) {
    return this.tasksService.getTasks(queryParams, user);
  }

  @Post('')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  createTask(@Body() body: CreateTaskDto, @CurrentUser() user: UserSignInParams) {
    return this.tasksService.create(body, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  changeTask(@Param() params, @Body() body: UpdateTaskDto, @CurrentUser() user: UserSignInParams) {
    return this.tasksService.changeTask(params.id, body, user);
  }

  @Put('/:id/complete')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  completeTask(@Param() params) {
    return this.tasksService.completeTask(params.id);
  }

  @Put('/:id/close')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  closeTask(@Param() params) {
    return this.tasksService.closeTask(params.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteTask(@Param() params) {
    return this.tasksService.deleteTask(params.id);
  }
}
