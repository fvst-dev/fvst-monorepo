import { MutationCreateUserArgs } from "../../graphql/generated/schema";
import { getPasswordHash } from "../../utils/password";
import { Context } from "../../graphql/context";

export default async (input: MutationCreateUserArgs, context: Context) => {
  // TODO: validate input

  try {
    const user = await context.prisma.user.create({
      data: {
        username: input.username,
        password: await getPasswordHash(input.password),
      },
    });

    return { user };
  } catch {
    return { user: null };
  }
};
