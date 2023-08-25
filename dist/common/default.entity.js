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
exports.DefaultEntity = void 0;
const transform_mongo_id_decorator_1 = require("../decorators/transform-mongo-id.decorator");
const class_transformer_1 = require("class-transformer");
class DefaultEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
__decorate([
    (0, transform_mongo_id_decorator_1.TransformMongoId)(),
    __metadata("design:type", Object)
], DefaultEntity.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], DefaultEntity.prototype, "__v", void 0);
exports.DefaultEntity = DefaultEntity;
//# sourceMappingURL=default.entity.js.map