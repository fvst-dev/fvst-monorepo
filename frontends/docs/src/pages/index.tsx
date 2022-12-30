import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import React, { Fragment } from 'react';
import type { AppRouter } from '../server/routers/_app';
import Head from 'next/head';
import { Button } from 'ui-component';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  // @ts-ignore
  const postsQuery = trpc.post.list?.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.post.list.invalidate();
    },
  });

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Head>
          <title>Docs - Turborepo Example</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
          <h1 className="mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
            Docs <br className="hidden lg:block" />
            <span className="inline-block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Turborepo Example
            </span>{' '}
          </h1>
          <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
            <Button />
          </div>
        </main>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
            Latest Posts
            {postsQuery.status === 'loading' && '(loading)'}
          </h2>
          <button
            className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
            onClick={() => postsQuery.fetchPreviousPage()}
            disabled={
              !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage
            }
          >
            {postsQuery.isFetchingPreviousPage
              ? 'Loading more...'
              : postsQuery.hasPreviousPage
              ? 'Load More posts'
              : 'Nothing more to load'}
          </button>
          <div className="flex max-w-5xl flex-row flex-wrap items-stretch space-y-4 space-x-4">
            {postsQuery.data?.pages.map((page, index) => (
              <Fragment key={page.items[0]?.id || index}>
                {page.items.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-sm grow overflow-hidden rounded border-r border-b border-l border-gray-400 shadow-lg lg:border-l-0 lg:border-t lg:border-gray-400"
                  >
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
        </div>
        <div className="flex flex-col items-center space-y-6 md:px-20">
          <h2 className="max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
            Add a post
          </h2>

          <form
            onSubmit={async (e) => {
              /**
               * In a real app you probably don't want to use this manually
               * Checkout React Hook Form - it works great with tRPC
               * @see https://react-hook-form.com/
               * @see https://kitchen-sink.trpc.io/react-hook-form
               */
              e.preventDefault();
              const $form = e.currentTarget;
              const values = Object.fromEntries(new FormData($form));
              type Input = inferProcedureInput<AppRouter['post']['add']>;
              //    ^?
              const input: Input = {
                title: values.title as string,
                text: values.text as string,
              };
              try {
                await addPost.mutateAsync(input);

                $form.reset();
              } catch (cause) {
                console.error({ cause }, 'Failed to add post');
              }
            }}
          >
            <label className="text-white" htmlFor="title">
              Title:
            </label>
            <br />
            <input
              id="title"
              name="title"
              type="text"
              disabled={addPost.isLoading}
            />

            <br />
            <label className="text-white" htmlFor="text">
              Text:
            </label>
            <br />
            <textarea id="text" name="text" disabled={addPost.isLoading} />
            <br />
            <input
              type="submit"
              disabled={addPost.isLoading}
              className="rounded border border-white from-red-500 to-blue-500 py-2 px-4 font-semibold text-white shadow hover:bg-gradient-to-r"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
