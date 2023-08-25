"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformMongoId = void 0;
const class_transformer_1 = require("class-transformer");
function TransformMongoId(options) {
    return (target, propertyKey) => {
        (0, class_transformer_1.Transform)((params) => { var _a; return (_a = params.obj[propertyKey]) === null || _a === void 0 ? void 0 : _a.toString(); }, options)(target, propertyKey);
    };
}
exports.TransformMongoId = TransformMongoId;
//# sourceMappingURL=transform-mongo-id.decorator.js.map