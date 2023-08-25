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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
const tasks_schema_1 = require("./tasks.schema");
const categories_service_1 = require("../categories/categories.service");
const tasks_entity_1 = require("./tasks.entity");
let TasksService = class TasksService {
    constructor(taskModel, userService, categoriesService) {
        this.taskModel = taskModel;
        this.userService = userService;
        this.categoriesService = categoriesService;
    }
    async create(params, currentUser) {
        var _a, _b, _c;
        const user = await this.userService.getUserByAnyParams(currentUser);
        const preparedCategories = await Promise.all(((_a = params.category_ids) !== null && _a !== void 0 ? _a : []).map(id => this.categoriesService.findCategoryById(id)));
        const preparedParams = {
            name: params.name,
            start_date: params.start_date,
            end_date: (_b = params.end_date) !== null && _b !== void 0 ? _b : null,
            spent_time: (_c = params.spent_time) !== null && _c !== void 0 ? _c : null,
            type: params.type,
            categories: preparedCategories,
            finished_date: null,
            closed_date: null,
            sent_notification: false,
            user,
        };
        const extendedTasks = await this.getTasksByDate(new Date(params.start_date), new Date(params.end_date), user);
        if (extendedTasks.length) {
            throw new common_1.HttpException("There is already a scheduled task at this time", common_1.HttpStatus.CONFLICT);
        }
        try {
            const task = await new this.taskModel(preparedParams);
            return new tasks_entity_1.TaskEntity((await task.save()).toObject());
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async changeTask(id, params, currentUser) {
        var _a, _b, _c;
        const user = await this.userService.getUserByAnyParams(currentUser);
        const preparedCategories = await Promise.all(((_a = params.category_ids) !== null && _a !== void 0 ? _a : []).map(id => this.categoriesService.findCategoryById(id)));
        let extendedTasks = await this.getTasksByDate(new Date(params.start_date), new Date(params.end_date), user);
        extendedTasks = extendedTasks.filter(task => task._id.toString() !== id);
        if (extendedTasks.length) {
            throw new common_1.HttpException("There is already a scheduled task at this time", common_1.HttpStatus.CONFLICT);
        }
        const preparedParams = {
            name: params.name,
            start_date: params.start_date,
            end_date: (_b = params.end_date) !== null && _b !== void 0 ? _b : null,
            spent_time: (_c = params.spent_time) !== null && _c !== void 0 ? _c : null,
            categories: preparedCategories,
        };
        try {
            const task = await this.taskModel
                .findByIdAndUpdate(id, preparedParams, { new: true })
                .populate('categories');
            return new tasks_entity_1.TaskEntity(task.toObject());
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async completeTask(id) {
        try {
            const task = await this.taskModel
                .findByIdAndUpdate(id, { finished_date: Date.now() }, { new: true })
                .populate('categories');
            return new tasks_entity_1.TaskEntity(task.toObject());
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async closeTask(id) {
        try {
            const task = await this.taskModel
                .findByIdAndUpdate(id, { closed_date: Date.now() }, { new: true })
                .populate('categories');
            return new tasks_entity_1.TaskEntity(task.toObject());
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteTask(id) {
        try {
            await this.taskModel.deleteOne({ _id: id });
            return new common_1.HttpException('Task was deleted!', common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getTasks(queryParams, currentUser) {
        const user = await this.userService.getUserByAnyParams(currentUser);
        let filterParams = { user };
        if (queryParams.type) {
            filterParams = Object.assign(filterParams, {
                type: queryParams.type
            });
        }
        if (queryParams.start_date) {
            const date = new Date(queryParams.start_date);
            filterParams = Object.assign(filterParams, {
                start_date: {
                    $gte: new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
                    $lt: new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1),
                }
            });
        }
        if (queryParams.end_date && queryParams.start_date) {
            const startDate = new Date(queryParams.start_date);
            const endDate = new Date(queryParams.end_date);
            filterParams = Object.assign(filterParams, {
                start_date: {
                    $gte: new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()),
                    $lt: new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate() + 1),
                }
            });
        }
        if (queryParams.category) {
            const category = await this.categoriesService.findCategoryById(queryParams.category);
            filterParams = Object.assign(filterParams, { categories: category });
        }
        if (queryParams.category) {
            const category = await this.categoriesService.findCategoryById(queryParams.category);
            filterParams = Object.assign(filterParams, { categories: category });
        }
        if (queryParams.completed) {
            filterParams = Object.assign(filterParams, { finished_date: { $ne: null } });
        }
        if (queryParams.closed) {
            filterParams = Object.assign(filterParams, { closed_date: { $ne: null } });
        }
        try {
            let tasks = await this.taskModel
                .find(filterParams, null, {
                sort: { start_date: 1 },
                populate: 'categories',
            });
            return tasks.map(task => new tasks_entity_1.TaskEntity(task.toObject()));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getTasksByDate(startDate, endDate, user) {
        try {
            return await this.taskModel
                .find({ user, start_date: { $lt: endDate }, end_date: { $gte: startDate } }, null)
                .exec();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(tasks_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        users_service_1.UsersService,
        categories_service_1.CategoriesService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map