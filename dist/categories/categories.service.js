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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const categories_schema_1 = require("./categories.schema");
const users_service_1 = require("../users/users.service");
let CategoriesService = class CategoriesService {
    constructor(categoryModel, userService) {
        this.categoryModel = categoryModel;
        this.userService = userService;
        this.defaultCategories = [
            {
                color: 'color-1',
                icon: 'barbell-outline',
                name: 'Sport'
            },
            {
                color: 'color-2',
                icon: 'briefcase-outline',
                name: 'Work'
            }
        ];
    }
    async create(params) {
        try {
            const category = await new this.categoryModel(params);
            return category.save();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async createEmptyCategory(currentUser) {
        try {
            const user = await this.userService.getUserByAnyParams(currentUser);
            return this.create({ color: null, icon: null, name: 'Category', user });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async changeCategory(id, params) {
        try {
            return this.categoryModel
                .findByIdAndUpdate(id, params, { new: true })
                .select('-__v');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async addDefaultCategories(user) {
        try {
            await this.defaultCategories.forEach(c => this.create(Object.assign(Object.assign({}, c), { user })));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async findCategoriesByUser(currentUser) {
        try {
            const user = await this.userService.getUserByAnyParams(currentUser);
            return this.categoryModel.find({ user }).select('-__v');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async findCategoryById(id) {
        try {
            return this.categoryModel.findById(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteCategory(id) {
        try {
            await this.categoryModel.deleteOne({ _id: id });
            return new common_1.HttpException('Category was deleted!', common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(categories_schema_1.Category.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_1.Model,
        users_service_1.UsersService])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map