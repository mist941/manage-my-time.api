import { HttpException } from '@nestjs/common';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { CategoriesService } from '../categories/categories.service';
import { UserParams } from './types/user-params.type';
export declare class UsersService {
    private userModel;
    private categoriesService;
    constructor(userModel: Model<UserDocument>, categoriesService: CategoriesService);
    create(params: CreateUserDto): Promise<User>;
    getUserByAnyParams(params: UserParams): Promise<User>;
    updatePushToken(user: User | string, token: string): Promise<HttpException>;
}
