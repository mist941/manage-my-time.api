import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';
export declare class AuthGuard implements CanActivate {
    private userService;
    constructor(userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
