import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, host) => {
  const [_root, _args, ctx, _info] = host.args;
  return ctx.req.user;
});
