import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {UsersService} from '../users/users.service';
import {Task, TaskDocument} from './tasks.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private categoryModel: Model<TaskDocument>,
    private userService: UsersService,
  ) {
  }


}
