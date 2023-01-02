import {Injectable, InternalServerErrorException} from '@nestjs/common';
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

    try {
      const user = await this.userService.getUserByAnyParams(params);
      if (user) {
        await this.userService.updatePushToken(user, params.push_notification_token);
        return user;
      }
      return this.userService.create(params);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}