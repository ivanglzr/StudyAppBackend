import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Id = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return data ? req.session[data] : req.session.id;
  },
);
