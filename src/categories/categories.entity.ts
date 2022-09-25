import {DefaultEntity} from '../common/default.entity';
import {Category} from './categories.schema';
import {Exclude} from 'class-transformer';
import {User} from '../users/users.schema';

export class CategoryEntity extends DefaultEntity{
  @Exclude()
  user: User;

  constructor(partial: Partial<Category>) {
    super(partial);
    Object.assign(this, partial);
  }
}