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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_schema_1 = require("./users.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const categories_service_1 = require("../categories/categories.service");
let UsersService = class UsersService {
    constructor(userModel, categoriesService) {
        this.userModel = userModel;
        this.categoriesService = categoriesService;
    }
    async create(params) {
        const user = await new this.userModel(params);
        const createdUser = await user.save();
        await this.categoriesService.addDefaultCategories(createdUser);
        return user;
    }
    async getUserByAnyParams(params) {
        const { google_id, email, stand_alone_key } = params;
        if (google_id && email)
            return this.userModel.findOne({ google_id, email });
        return this.userModel.findOne({ stand_alone_key });
    }
    async updatePushToken(user, token) {
        try {
            await this.userModel
                .findByIdAndUpdate(user, { push_notification_token: token }, { new: true });
            return new common_1.HttpException('Push token was updated', common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        categories_service_1.CategoriesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map