import {AuthService} from './auth.service';
import {Body, Controller, Post} from '@nestjs/common';
import {SignInDto} from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/sign-in')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}

