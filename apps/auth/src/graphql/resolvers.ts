import { Account, AdapterSession, AdapterUser, Resolvers, SessionWithUser, User } from './generated/schema';
import me from '../resolvers/Query/me';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import unlinkAccount from '../resolvers/Mutation/unlinkAccount';
import { AdapterAccount } from 'next-auth/adapters';
import { prisma } from '../utils/prisma';
import { DateTimeResolver } from 'graphql-scalars';

const adapter = PrismaAdapter(prisma);

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Mutation: {
    createUser: async (_, args) => {
      return (await adapter.createUser({
        ...args.user,
        emailVerified: args.user.emailVerified || null,
      })) as AdapterUser;
    },
    updateUser: (parent, args) =>
      adapter.updateUser({
        ...args.user,
        id: args.user.id?.toString(),
        email: args.user.email?.toString(),
      }) as User,
    // PrismaAdapter has Delete User implemented
    // @ts-ignore
    deleteUser: (parent, args) => adapter.deleteUser(args.id) as User,
    linkAccount: (parent, args) => adapter.linkAccount(args.data as AdapterAccount) as Account,
    unlinkAccount: (parent, args, context) => unlinkAccount(args.providerInfo, context) as unknown as Account,
    createSession: (parent, args) => adapter.createSession(args.data) as AdapterSession,
    updateSession: (parent, args) =>
      adapter.updateSession({
        sessionToken: args.data.sessionToken,
        userId: args.data.userId?.toString(),
        expires: args.data.expires || undefined,
      }) as AdapterSession,
    deleteSession: (parent, args) => adapter.deleteSession(args.sessionToken) as AdapterSession,
    /*    createVerificationToken: async (parent, args) => await adapter.createVerificationToken({
          token: args.verificationToken.token,
          identifier: args.verificationToken.identifier,
          expires: args.verificationToken.expires
        })*/
  },
  Query: {
    getUser: (_, args) => adapter.getUser(args.id) as User,
    getUserByAccount: (_, args) => adapter.getUserByAccount(args.providerInfo) as User,
    getUserByEmail: (_, args) => adapter.getUserByEmail(args.email) as User,
    getSessionAndUser: (parent, args) => adapter.getSessionAndUser(args.sessionToken) as SessionWithUser,
    me: (_, __, context) => me(context),
  },
  User: {},
};

export default resolvers;
