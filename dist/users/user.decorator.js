"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return JSON.parse(JSON.parse(req.headers.user));
});
//# sourceMappingURL=user.decorator.js.map