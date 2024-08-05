import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({
    type: mongoose.Schema.Types.String,
  })
  color: string;

  @Prop({
    type: mongoose.Schema.Types.String,
  })
  icon: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  })
  user: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);