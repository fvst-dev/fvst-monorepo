import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, host) => {
  const [root, args, ctx, info] = host.args;
  return ctx.req.user;
});
