import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return JSON.parse(JSON.parse(req.headers.user));
  },
);