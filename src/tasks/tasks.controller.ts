import {Controller, Get, UseGuards} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {User} from '../users/users.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get('')
  @UseGuards(AuthGuard)
  tasks(@CurrentUser() user: User) {

  }
}
