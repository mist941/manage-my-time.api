import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const userFromHeaders = req.headers.user;

    if (!userFromHeaders) throw new UnauthorizedException('User is not logged in');

    const user = await this.userService.getUserByAnyParams(JSON.parse(userFromHeaders));

    if (!user) throw new NotFoundException('User not found');

    return true;
  }
}