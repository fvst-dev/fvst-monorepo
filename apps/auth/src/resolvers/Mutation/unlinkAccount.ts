import { Context } from '../../graphql/context';
import { ProviderAccountInfo } from '../../graphql/generated/schema';

export default (data: ProviderAccountInfo, context: Context) => {
  return context.prisma.account.delete({
    where: {
      provider_providerAccountId: {
        ...data,
      },
    },
  });
};
