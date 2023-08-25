import { User } from '../../users/users.schema';
export declare class CreateCategoryDto {
    readonly color: string;
    readonly icon: string;
    readonly name: string;
    readonly user: User;
}
