import { PrismaClient } from "../prisma/client";
import { NODE_ENV } from "./config";

export * from "../prisma/client";

export const prisma: PrismaClient = new PrismaClient({
  log: NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
