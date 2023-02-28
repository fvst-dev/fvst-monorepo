import { prisma } from '../utils/prisma';

export type Context = {
  prisma: typeof prisma;
};

const context = async (): Promise<Context> => {
  return {
    prisma,
  };
};

export default context;
