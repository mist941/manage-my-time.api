import {Injectable} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {InjectModel} from '@nestjs/mongoose';
import {Task, TaskDocument} from '../tasks/tasks.schema';
import {Model} from 'mongoose';
import Expo, {ExpoPushMessage} from 'expo-server-sdk';

@Injectable()
export class PushNotificationService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {
  }

  @Cron('* * * * *')
  async handleCron() {
    let tasks = await this.getTasks();
    let messages = this.prepareMessages(tasks);
    await this.sendPushNotifications(messages);
    await this.updateTasks(tasks);
  }

  async getTasks() {
    const startDate = new Date();
    const endDate = new Date(new Date().setUTCMinutes(startDate.getUTCMinutes() + 5));
    return await this.taskModel
      .find(
        {start_date: {$gte: startDate, $lt: endDate}, sent_notification: false},
        null,
        {sort: {start_date: 1}, populate: 'user'}
      )
      .exec();
  }

  prepareMessages(tasks: Array<Task>): Array<ExpoPushMessage> {
    return tasks.map(task => ({
      to: task.user.push_notification_token,
      sound: 'default',
      body: `"${task.name}" task scheduled for the near future`,
      data: {withSome: 'data'},
    }));
  }

  async sendPushNotifications(messages: Array<ExpoPushMessage>) {
    let expo = new Expo();
    let chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        throw error;
      }
    }
  }

  async updateTasks(tasks: Array<TaskDocument>) {
    tasks.forEach(task => {
      this.taskModel.findByIdAndUpdate(task._id, {sent_notification: true}, {new: true}).exec();
    });
  }
}
