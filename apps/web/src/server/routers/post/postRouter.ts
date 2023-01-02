/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router } from '../../trpc';

import { list } from './queries/list';
import { byId } from './queries/byId';
import { add } from './mutations/add';

export const postRouter = router({
  list,
  byId,
  add,
});
