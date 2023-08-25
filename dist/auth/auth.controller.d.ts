import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registration(body: SignInDto): Promise<import("../users/users.schema").User>;
}
