import Link from 'next/link';

import React, { Fragment, useEffect } from 'react';
import { trpc } from '../../utils/trpc';

const styles = {
  listContainer: 'flex max-w-5xl flex-row flex-wrap items-stretch gap-4',
  listItem: 'max-w-sm grow overflow-hidden rounded border border-gray-400 shadow-lg',
};

const ListPosts: React.FC = () => {
  const utils = trpc.useContext();
  const postsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam(page) {
        return page.nextCursor;
      },
    }
  );

  // prefetch all posts for instant navigation
  useEffect(() => {
    const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
    for (const { id } of allPosts) {
      void utils.post.byId.prefetch({ id });
    }
  }, [postsQuery.data, utils]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
        Posts
      </h2>
      <div className={styles.listContainer}>
        {postsQuery.data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.items.map((item) => (
              <div className={styles.listItem} key={item.id}>
                <div className="px-6 py-4">
                  <div className="mb-2 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
                    {item.title}
                  </div>
                  <p className="text-base text-white">{item.text}</p>
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                      href={`/post/${item.id}`}
                    >
                      View post details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <button
        className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
        onClick={() => postsQuery.fetchNextPage()}
        disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
      >
        {postsQuery.isFetchingNextPage
          ? 'Loading more...'
          : postsQuery.hasNextPage
          ? 'Load More posts'
          : 'Nothing more to load'}
      </button>
    </div>
  );
};

export default ListPosts;
