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
exports.CategoryEntity = void 0;
const default_entity_1 = require("../common/default.entity");
const class_transformer_1 = require("class-transformer");
const users_schema_1 = require("../users/users.schema");
class CategoryEntity extends default_entity_1.DefaultEntity {
    constructor(partial) {
        super(partial);
        Object.assign(this, partial);
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", users_schema_1.User)
], CategoryEntity.prototype, "user", void 0);
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=categories.entity.js.map