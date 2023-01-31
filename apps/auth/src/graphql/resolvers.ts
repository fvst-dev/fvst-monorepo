import isValidToken from '../resolvers/Query/isValidToken';
import { Resolvers } from './generated/schema';
import loginWithUsernameAndPassword from '../resolvers/Mutation/loginWithUsernameAndPassword';
import loginResultResolvers from '../resolvers/LoginResult';
import createUser from '../resolvers/Mutation/createUser';
import createUserResult from '../resolvers/CreateUserResult';
import me from '../resolvers/Query/me';

const resolvers: Resolvers = {
  Query: {
    isValidToken: (parent, args, context) => isValidToken(args),
    me: (_, __, context) => me(context),
  },
  Mutation: {
    loginWithUsernameAndPassword: (parent, args, context) => loginWithUsernameAndPassword(args, context),
    createUser: (parent, args, context) => createUser(args, context),
  },
  LoginResult: loginResultResolvers,
  CreateUserResult: createUserResult,
  User: {
    __resolveReference: async (ref, { prisma }) => {
      return prisma.user?.findUnique({
        where: {
          id: ref.id,
        },
      });
    },
  },
};

export default resolvers;
