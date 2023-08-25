"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const tasks_controller_1 = require("./tasks.controller");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const tasks_schema_1 = require("./tasks.schema");
const categories_module_1 = require("../categories/categories.module");
let TasksModule = class TasksModule {
};
TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: tasks_schema_1.Task.name, schema: tasks_schema_1.TaskSchema }]),
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule
        ],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService],
        exports: [tasks_service_1.TasksService]
    })
], TasksModule);
exports.TasksModule = TasksModule;
//# sourceMappingURL=tasks.module.js.map