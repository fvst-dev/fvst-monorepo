import { Resolvers } from '../graphql/generated/schema';
import { prisma, User } from '../utils/prisma';
import { signJwt } from '../utils/jwt';

export type CreateUserResultParent = {
  user: User | null;
};

const createUserResultResolvers: Resolvers['CreateUserResult'] = {
  success: (parent) => !!parent.user,
  token: async (parent) => {
    if (!parent.user) {
      return null;
    }

    const session = await prisma.session.create({
      data: {
        userId: parent.user.id,
      },
    });

    return signJwt(parent.user.id, {
      session: session.id,
    });
  },
};

export default createUserResultResolvers;
