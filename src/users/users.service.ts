import {Injectable} from '@nestjs/common';
import {User, UserDocument} from './users.schema';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUserDto} from './dto/create-user.dto';
import {CategoriesService} from '../categories/categories.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private categoriesService: CategoriesService,
  ) {
  }

  async create(params: CreateUserDto): Promise<User> {
    const user = await new this.userModel(params);
    const createdUser = await user.save();
    await this.categoriesService.addDefaultCategories(createdUser);
    return user;
  }

  async getUserByAnyParams(params: User): Promise<User> {
    const {google_id, email, stand_alone_key} = params;

    if (google_id && email) return this.userModel.findOne({google_id, email});

    return this.userModel.findOne({stand_alone_key});
  }
}
