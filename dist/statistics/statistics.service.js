"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsServices = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("../categories/categories.service");
const tasks_service_1 = require("../tasks/tasks.service");
const users_service_1 = require("../users/users.service");
let StatisticsServices = class StatisticsServices {
    constructor(userService, categoriesService, tasksServices) {
        this.userService = userService;
        this.categoriesService = categoriesService;
        this.tasksServices = tasksServices;
    }
    async getStatisticsByTypes(queryParams, currentUser) {
        const completedTasks = await this.tasksServices.getTasks(Object.assign(Object.assign({}, queryParams), { completed: true }), currentUser);
        const closedTasks = await this.tasksServices.getTasks(Object.assign(Object.assign({}, queryParams), { closed: true }), currentUser);
        try {
            return {
                completed_tasks_count: completedTasks.length,
                closed_tasks_count: closedTasks.length,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getStatisticsByCategories(queryParams, currentUser) {
        const categories = [];
        const categoriesByUser = await this.categoriesService.findCategoriesByUser(currentUser);
        for (let i = 0; i < categoriesByUser.length; i++) {
            const tasks = await this.tasksServices.getTasks({ category: categoriesByUser[i] }, currentUser);
            categories.push({
                name: categoriesByUser[i].name,
                color: categoriesByUser[i].color,
                tasks_count: tasks.length
            });
        }
        try {
            return categories;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
StatisticsServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        categories_service_1.CategoriesService,
        tasks_service_1.TasksService])
], StatisticsServices);
exports.StatisticsServices = StatisticsServices;
//# sourceMappingURL=statistics.service.js.map