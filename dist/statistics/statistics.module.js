"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const categories_module_1 = require("../categories/categories.module");
const tasks_module_1 = require("../tasks/tasks.module");
const users_module_1 = require("../users/users.module");
const statistics_controller_1 = require("./statistics.controller");
const statistics_service_1 = require("./statistics.service");
let StatisticsModule = class StatisticsModule {
};
StatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            tasks_module_1.TasksModule
        ],
        controllers: [statistics_controller_1.StatisticsController],
        providers: [statistics_service_1.StatisticsServices],
        exports: []
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map