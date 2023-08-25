import { UsersService } from './users.service';
import { UpdateTokenDto } from './dto/update-token.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    changeTask(body: UpdateTokenDto): Promise<import("@nestjs/common").HttpException>;
}
