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
exports.PushNotificationService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const tasks_schema_1 = require("../tasks/tasks.schema");
const mongoose_2 = require("mongoose");
const expo_server_sdk_1 = require("expo-server-sdk");
let PushNotificationService = class PushNotificationService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async handleCron() {
        let tasks = await this.getTasks();
        let messages = this.prepareMessages(tasks);
        await this.sendPushNotifications(messages);
        await this.updateTasks(tasks);
    }
    async getTasks() {
        const startDate = new Date();
        const endDate = new Date(new Date().setUTCMinutes(startDate.getUTCMinutes() + 5));
        return await this.taskModel
            .find({ start_date: { $gte: startDate, $lt: endDate }, sent_notification: false }, null, { sort: { start_date: 1 }, populate: 'user' })
            .exec();
    }
    prepareMessages(tasks) {
        return tasks.map(task => ({
            to: task.user.push_notification_token,
            sound: 'default',
            body: `"${task.name}" task scheduled for the near future`,
            data: { withSome: 'data' },
        }));
    }
    async sendPushNotifications(messages) {
        let expo = new expo_server_sdk_1.default();
        let chunks = expo.chunkPushNotifications(messages);
        for (const chunk of chunks) {
            try {
                await expo.sendPushNotificationsAsync(chunk);
            }
            catch (error) {
                throw error;
            }
        }
    }
    async updateTasks(tasks) {
        tasks.forEach(task => {
            this.taskModel.findByIdAndUpdate(task._id, { sent_notification: true }, { new: true }).exec();
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PushNotificationService.prototype, "handleCron", null);
PushNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tasks_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PushNotificationService);
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=push-notification.service.js.map