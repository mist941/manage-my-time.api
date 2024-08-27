import {forwardRef, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Category, CategoryDocument} from './categories.schema';
import {CreateCategoryDto} from './dto/create-category.dto';
import {User} from '../users/users.schema';
import {UsersService} from '../users/users.service';
import {UserParams} from '../users/users.types';

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
    try {
      const category = new this.categoryModel(params);
      return category.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createEmptyCategory(currentUser: UserParams): Promise<Category> {
    try {
      const user = await this.userService.getUserByGoogleIdAndEmail(currentUser);
      return this.create({color: null, icon: null, name: 'Category', user});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async changeCategory(id, params: Category): Promise<Category> {
    try {
      return this.categoryModel
        .findByIdAndUpdate(id, params, {new: true})
        .select('-__v');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addDefaultCategories(user: User): Promise<void> {
    try {
      await this.defaultCategories.forEach(c => this.create({...c, user}));
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findCategoriesByUser(currentUser: UserParams): Promise<Array<Category>> {
    try {
      const user = await this.userService.getUserByGoogleIdAndEmail(currentUser);
      return this.categoryModel.find({user}).select('-__v');
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findCategoryById(id: Category | string): Promise<Category> {
    try {
      return this.categoryModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }


  async deleteCategory(id: string): Promise<HttpException> {
    try {
      await this.categoryModel.deleteOne({_id: id});
      return new HttpException('Category was deleted!', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
