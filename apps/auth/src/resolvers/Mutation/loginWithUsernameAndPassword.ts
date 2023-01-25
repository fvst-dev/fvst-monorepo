import {
  MutationLoginWithUsernameAndPasswordArgs,
  ResolversTypes,
} from "../../graphql/generated/schema";
import { checkPasswordHash } from "../../utils/password";
import { Context } from "../../graphql/context";

export default async (
  input: MutationLoginWithUsernameAndPasswordArgs,
  context: Context
): Promise<ResolversTypes["LoginResult"]> => {
  const user = await context.prisma.user.findFirst({
    where: {
      username: input.username,
    },
  });

  if (!user || (await checkPasswordHash(input.password, user.password))) {
    return { user: null };
  }

  return { user };
};
