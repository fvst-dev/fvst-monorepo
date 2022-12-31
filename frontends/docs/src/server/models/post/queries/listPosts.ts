import { prisma } from '../../../prisma';

type Cursor = string | undefined | null;

export const listPosts = async (limit: number, cursor: Cursor) => {
  const items = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      createdAt: true,
      updatedAt: true,
    },
    // get an extra item at the end which we'll use as next cursor
    take: limit + 1,
    where: {},
    cursor: cursor
      ? {
          id: cursor,
        }
      : undefined,
    orderBy: {
      createdAt: 'desc',
    },
  });
  let nextCursor: Cursor = undefined;
  if (items.length > limit) {
    // Remove the last item and use it as next cursor

    const nextItem = items.pop()!;
    nextCursor = nextItem.id;
  }

  return {
    items: items.reverse(),
    nextCursor,
  };
};
