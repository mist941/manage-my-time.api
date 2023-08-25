import { UserParams } from '../users/types/user-params.type';
import { StatisticsServices } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsServices;
    constructor(statisticsServices: StatisticsServices);
    getStatisticsByTypes(queryParams: any, user: UserParams): Promise<any>;
    getStatisticsByCategories(queryParams: any, user: UserParams): Promise<any>;
}
