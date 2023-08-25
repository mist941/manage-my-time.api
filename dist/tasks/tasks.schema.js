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
exports.TaskSchema = exports.Task = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../users/users.schema");
const tasks_types_1 = require("./types/tasks.types");
let Task = class Task {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.String,
        required: true,
    }),
    __metadata("design:type", String)
], Task.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.String,
        required: true,
    }),
    __metadata("design:type", String)
], Task.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }),
    __metadata("design:type", users_schema_1.User)
], Task.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            type: mongoose_2.default.Schema.Types.ObjectId,
            required: false,
            ref: 'Category'
        }]),
    __metadata("design:type", Array)
], Task.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Task.prototype, "start_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Date,
        required: false,
    }),
    __metadata("design:type", Date)
], Task.prototype, "spent_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Date,
        required: false,
    }),
    __metadata("design:type", Date)
], Task.prototype, "end_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Date,
        required: false,
    }),
    __metadata("design:type", Date)
], Task.prototype, "finished_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Date,
        required: false,
    }),
    __metadata("design:type", Date)
], Task.prototype, "closed_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.Boolean,
        required: true,
    }),
    __metadata("design:type", Boolean)
], Task.prototype, "sent_notification", void 0);
Task = __decorate([
    (0, mongoose_1.Schema)()
], Task);
exports.Task = Task;
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(Task);
//# sourceMappingURL=tasks.schema.js.map