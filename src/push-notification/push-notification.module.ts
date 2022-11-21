import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import {PushNotificationService} from './push-notification.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Task, TaskSchema} from '../tasks/tasks.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
  ],
  controllers: [],
  providers: [PushNotificationService],
  exports: []
})

export class PushNotificationModule {}