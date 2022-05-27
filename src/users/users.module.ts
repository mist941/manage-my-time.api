import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UsersSchema} from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UsersSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
