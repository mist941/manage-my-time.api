import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {InjectModel} from '@nestjs/mongoose';
import {Task, TaskDocument} from '../tasks/tasks.schema';
import {Model} from 'mongoose';

@Injectable()
export class PushNotificationService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {
  }

  @Cron('* * * * *')
  async handleCron() {
    const startDate = new Date();
    const endDate = new Date(new Date().setUTCMinutes(startDate.getUTCMinutes() + 5));

    let tasks = await this.taskModel
      .find({
          start_date: {
            $gte: startDate,
            $lt: endDate,
          }
        }, null,
        {
          sort: {start_date: 1},
          populate: 'user',
        }
      );

  }
}