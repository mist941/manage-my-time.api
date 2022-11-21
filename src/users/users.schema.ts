import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
  })
  google_id: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
  })
  stand_alone_key: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: false,
  })
  email: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  push_notification_token: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);