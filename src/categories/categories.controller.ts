import {Controller, Get, UseGuards} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {User} from '../users/users.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Get('')
  @UseGuards(AuthGuard)
  categories(@CurrentUser() user: User) {
    return this.categoriesService.findCategoriesByUser(user);
  }
}
