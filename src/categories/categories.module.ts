import {forwardRef, Module} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {CategoriesController} from './categories.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Category, CategorySchema} from './categories.schema';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}]),
    forwardRef(() => UsersModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {
}
