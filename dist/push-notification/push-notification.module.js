"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const push_notification_service_1 = require("./push-notification.service");
const mongoose_1 = require("@nestjs/mongoose");
const tasks_schema_1 = require("../tasks/tasks.schema");
let PushNotificationModule = class PushNotificationModule {
};
PushNotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([{ name: tasks_schema_1.Task.name, schema: tasks_schema_1.TaskSchema }]),
        ],
        controllers: [],
        providers: [push_notification_service_1.PushNotificationService],
        exports: []
    })
], PushNotificationModule);
exports.PushNotificationModule = PushNotificationModule;
//# sourceMappingURL=push-notification.module.js.map