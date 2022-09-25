import {TransformMongoId} from '../decorators/transform-mongo-id.decorator';
import {ObjectId} from 'mongoose';
import {Exclude} from 'class-transformer';

export class DefaultEntity {
  @TransformMongoId()
  _id: ObjectId;
  @Exclude()
  __v: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}