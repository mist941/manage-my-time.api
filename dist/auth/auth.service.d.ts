import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.schema';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    signIn(params: SignInDto): Promise<User>;
}
