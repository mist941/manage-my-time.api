import {Injectable} from '@nestjs/common';
import {SignInDto} from './dto/sign-in.dto';
import {UsersService} from '../users/users.service';
import {UserDocument} from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
  ) {
  }

  async signIn(params: SignInDto): Promise<UserDocument> {
    const user = await this.userService.getUserByAnyParams(params);
    if (user) return user;
    return this.userService.create(params);
  }
}