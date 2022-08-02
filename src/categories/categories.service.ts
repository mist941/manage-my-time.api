import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Category, CategoryDocument} from './categories.schema';
import {CreateCategoryDto} from './dto/create-category.dto';
import {User} from '../users/users.schema';
import {UsersService} from '../users/users.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {
  }

  private defaultCategories = [
    {
      color: 'color-1',
      icon: 'barbell-outline',
      name: 'Sport'
    },
    {
      color: 'color-2',
      icon: 'briefcase-outline',
      name: 'Work'
    }
  ]

  async create(params: CreateCategoryDto): Promise<Category> {
    const category = await new this.categoryModel(params);
    return category.save();
  }

  async addDefaultCategories(user: User): Promise<void> {
    await this.defaultCategories.forEach(c => this.create({...c, user}));
  }

  async findCategoriesByUser(currentUser: User): Promise<Array<Category>> {
    const user = await this.userService.getUserByAnyParams(currentUser);
    return this.categoryModel.find({user});
  }
}
