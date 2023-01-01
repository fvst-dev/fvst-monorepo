import { z } from 'zod';

import { publicProcedure } from '../../../trpc';
import { create } from '../../../models/post/mutations/create';

export const add = publicProcedure
  .input(
    z.object({
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    })
  )
  .mutation(async ({ input }) => {
    return create(input);
  });
