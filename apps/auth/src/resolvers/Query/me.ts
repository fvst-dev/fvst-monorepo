import { Maybe, ResolversTypes } from '../../graphql/generated/schema';
import { Context } from '../../graphql/context';

export default async (context: Context): Promise<Maybe<ResolversTypes['User']>> => {
  if (!context.userId) {
    return null;
  }

  const user = await context.prisma.user.findUnique({
    where: {
      id: context.userId,
    },
  });

  return user || null;
};
