"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const common_1 = require("@nestjs/common");
const process = require("process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, dotenv_1.config)();
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map