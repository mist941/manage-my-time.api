import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module'
import {UsersModule} from './users/users.module';
import {TasksModule} from './tasks/tasks.module';
import {PushNotificationModule} from './push-notification/push-notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONFIG),
    UsersModule,
    AuthModule,
    TasksModule,
    PushNotificationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
