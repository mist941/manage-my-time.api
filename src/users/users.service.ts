import {Injectable} from '@nestjs/common';
import {User, UserDocument} from './users.schema';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  async create(params: CreateUserDto) {
    const user = await new this.userModel(params);
    return user.save();
  }

  async getUserByAnyParams(params: User): Promise<UserDocument> {
    const {google_id, email, stand_alone_key} = params;

    if (google_id && email) return this.userModel.findOne({google_id, email});

    return this.userModel.findOne({stand_alone_key});
  }
}
