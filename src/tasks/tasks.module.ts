import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {TasksController} from './tasks.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from '../users/users.module';
import {Task, TaskSchema} from './tasks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})

export class TasksModule {
}
