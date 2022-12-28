import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  getNotes: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.note.findMany();
  }),
  createNote: publicProcedure
    .input(
      z.object({
        text: z.string().min(3).max(245),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.create({
        data: {
          text: input.text,
        },
      });
    }),
  deleteNote: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
