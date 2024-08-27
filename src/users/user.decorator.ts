import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Extracted function to parse user from headers
async function parseUserFromHeaders(headers: Record<string, any>): Promise<any> {
  return JSON.parse(JSON.parse(headers.user));
}

export const CurrentUser = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return parseUserFromHeaders(request.headers);
  },
);