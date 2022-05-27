import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module'
import configuration from './common/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration.database),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
