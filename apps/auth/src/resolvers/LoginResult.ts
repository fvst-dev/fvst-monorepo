import { Resolvers } from "../graphql/generated/schema";
import { prisma, User } from "../utils/prisma";
import { signJwt } from "../utils/jwt";
import { Context } from "../graphql/context";

export type LoginResultParent = {
  user: User | null;
};

const loginResultResolvers: Resolvers<Context>["LoginResult"] = {
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

export default loginResultResolvers;
