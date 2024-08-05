import {
  ClassSerializerInterceptor,
  Controller,
  Get, Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from '../auth/auth.guard';
import {CurrentUser} from '../users/user.decorator';
import {UserParams} from '../users/users.types';
import {StatisticsServices} from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsServices: StatisticsServices) {
  }

  @Get('by-types')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getStatisticsByTypes(@Query() queryParams, @CurrentUser() user: UserParams) {
    return this.statisticsServices.getStatisticsByTypes(queryParams, user);
  }

  @Get('by-categories')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getStatisticsByCategories(@CurrentUser() user: UserParams) {
    return this.statisticsServices.getStatisticsByCategories(user);
  }
}
