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
exports.UpdateTaskDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateTaskDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTaskDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateTaskDto.prototype, "category_ids", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateTaskDto.prototype, "start_date", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => !!value),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateTaskDto.prototype, "end_date", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => !!value),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateTaskDto.prototype, "finished_date", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => !!value),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateTaskDto.prototype, "closed_date", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => !!value),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateTaskDto.prototype, "spent_time", void 0);
exports.UpdateTaskDto = UpdateTaskDto;
//# sourceMappingURL=update-task.dto.js.map