import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {User, UserDocument} from './users.schema';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUserDto} from './dto/create-user.dto';
import {CategoriesService} from '../categories/categories.service';
import {UserSignInParams} from './users.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private categoriesService: CategoriesService,
  ) {
  }

  async create(params: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.saveUser(params);
      await this.categoriesService.addDefaultCategories(createdUser);
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async saveUser(params: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(params);
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserByGoogleIdAndEmail(params: UserSignInParams): Promise<User | null> {
    const {google_id, email, stand_alone_key} = params;
    try {
      if (google_id && email) return this.userModel.findOne({google_id, email});
      return this.userModel.findOne({stand_alone_key});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updatePushToken(user: User | string, token: string): Promise<HttpException> {
    try {
      await this.userModel.findByIdAndUpdate(user, {push_notification_token: token}, {new: true});
      return new HttpException('Push token was updated', HttpStatus.OK);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}