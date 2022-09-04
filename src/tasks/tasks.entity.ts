import {Exclude} from 'class-transformer';
import {User} from '../users/users.schema';
import {Task} from './tasks.schema';
import {ObjectId} from 'mongoose';
import {TransformMongoId} from '../decorators/transform-mongo-id.decorator';

export class TaskEntity {
  @TransformMongoId()
  _id: ObjectId;
  @Exclude()
  __v: number;
  @Exclude()
  user: User;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}