import {Exclude, Transform} from 'class-transformer';
import {User} from '../users/users.schema';
import {Task} from './tasks.schema';
import {Category} from '../categories/categories.schema';
import {DefaultEntity} from '../common/default.entity';
import {CategoryEntity} from '../categories/categories.entity';

export class TaskEntity extends DefaultEntity {
  @Exclude()
  user: User;
  @Transform(({value}) => value.map(category => new CategoryEntity(category)))
  categories: Array<Category>;

  constructor(partial: Partial<Task>) {
    super(partial);
    Object.assign(this, partial);
  }
}