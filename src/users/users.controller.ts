import {Body, ClassSerializerInterceptor, Controller, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from '../auth/auth.guard';
import {UpdateTokenDto} from './dto/update-token.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Put('update_push_token')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  changeTask(@Body() body: UpdateTokenDto) {
    return this.usersService.updatePushToken(body.user_id, body.token);
  }
}
