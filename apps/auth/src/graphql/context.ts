import { IncomingMessage } from 'http';
import { prisma } from '../utils/prisma';
import { verifyJwt } from '../utils/jwt';
import DataLoader from 'dataloader';
import LRU from 'lru-cache';

const extractPayloadWithVerification = (token: string) => {
  try {
    return verifyJwt(token);
  } catch {
    throw new Error('Invalid token');
  }
};

const cache = new LRU({
  ttl: 60_000,
  max: 1000,
});

const fetchSessions = async (sessionIds: string[]) => {
  return await prisma.session.findMany({
    where: {
      id: {
        in: sessionIds,
      },
    },
  });
};

const sessionExistsLoader = new DataLoader<string, Awaited<ReturnType<typeof fetchSessions>>[number] | undefined>(
  async (sessionIds) => {
    const sessions = await fetchSessions(sessionIds as string[]);

    return sessionIds.map((sessionId) => sessions.find((session) => session.id === sessionId));
  },
  {
    cache: true,
    cacheMap: cache,
  }
);

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

  const session = await sessionExistsLoader.load(payload.session);
  if (!session) {
    throw new Error('Token expired');
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
