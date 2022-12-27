import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from 'mongoose';
import {User} from '../users/users.schema';
import {TasksTypes} from './types/tasks.types';
import {Category} from '../categories/categories.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  type: TasksTypes;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  })
  user: User;

  @Prop([{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Category'
  }])
  categories: Category[];

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
  })
  start_date: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: false,
  })
  spent_time: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: false,
  })
  end_date: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: false,
  })
  finished_date: Date;

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: false,
  })
  closed_date: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);