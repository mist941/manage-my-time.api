import {Injectable} from '@nestjs/common';
import {SignInDto} from './dto/sign-in.dto';
import {UsersService} from '../users/users.service';
import {User} from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
  ) {
  }

  async signIn(params: SignInDto): Promise<User> {
    const user = await this.userService.getUserByAnyParams(params);
    if (user) return user;
    return this.userService.create(params);
  }
}