import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '../../../trpc';
import { findById } from '../../../models/post/queries/findById';

export const byId = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ input }) => {
    const { id } = input;
    const post = await findById(id);
    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${id}'`,
      });
    }
    return post;
  });
