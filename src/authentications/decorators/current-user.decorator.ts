import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../strategies/jwt.strategy';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
