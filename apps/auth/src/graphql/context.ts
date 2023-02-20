import { IncomingMessage } from 'http';
import { prisma } from '../utils/prisma';
import { verifyJwt } from '../utils/jwt';

const extractPayloadWithVerification = (token: string) => {
  try {
    return verifyJwt(token);
  } catch {
    throw new Error('Invalid token');
  }
};

const fetchSessions = async (sessionIds: string[]) => {
  return prisma.session.findMany({
    where: {
      id: {
        in: sessionIds,
      },
    },
  });
};

type AuthContext = {
  token?: ReturnType<typeof verifyJwt>;
  userId?: string;
};

const authorization = async (req: IncomingMessage): Promise<AuthContext> => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return {};
  }

  const [, token] = authorization.split(' ');

  const payload = extractPayloadWithVerification(token);
  if (!payload.session) {
    throw new Error('Invalid token payload');
  }

  return {
    token: payload,
    userId: payload.sub,
  };
};

export type Context = {
  prisma: typeof prisma;
} & AuthContext;

const context = async ({ req }: { req: IncomingMessage }): Promise<Context> => {
  return {
    prisma,
    ...(await authorization(req)),
  };
};

export default context;
