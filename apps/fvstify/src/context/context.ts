import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  return { req, res, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;
