import { z } from 'zod';
import { publicProcedure } from '../../../trpc';
import { listPosts } from '../../../models/post/queries/listPosts';

export const list = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().nullish(),
    })
  )
  .query(async ({ input }) => {
    /**
     * For pagination docs you can have a look here
     * @see https://trpc.io/docs/useInfiniteQuery
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
     */
    const { cursor, limit } = input;
    return await listPosts(limit, cursor);
  });
