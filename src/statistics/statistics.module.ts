import {Module} from '@nestjs/common';
import {CategoriesModule} from '../categories/categories.module';
import {TasksModule} from '../tasks/tasks.module';
import {UsersModule} from '../users/users.module';
import {StatisticsController} from './statistics.controller';
import {StatisticsServices} from './statistics.service';


@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    TasksModule
  ],
  controllers: [StatisticsController],
  providers: [StatisticsServices],
  exports: []
})

export class StatisticsModule {
}
