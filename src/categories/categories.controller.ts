import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {Category} from './categories.schema';
import {UserParams} from '../users/types/user-params.type';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Get('')
  @UseGuards(AuthGuard)
  categories(@CurrentUser() user: UserParams) {
    return this.categoriesService.findCategoriesByUser(user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteCategory(@Param() params) {
    return this.categoriesService.deleteCategory(params.id);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  addCategory(@Param() params, @CurrentUser() user: UserParams) {
    return this.categoriesService.createEmptyCategory(user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  changeCategory(@Param() params, @Body() body: Category) {
    return this.categoriesService.changeCategory(params.id, body);
  }
}
