import { initTRPC } from "@trpc/server";
import { Context } from "../context/context";

const t = initTRPC.context<Context>().create();
export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
