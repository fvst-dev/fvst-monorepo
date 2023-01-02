import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button } from '@packages/ui-component';

import AddPost from '../client/features/home/AddPost';
import ListPosts from '../client/features/home/ListPosts';

const IndexPage: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Head>
          <title>Docs - Turborepo Example</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
          <h1 className="mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl">
            App <br className="hidden lg:block" />
            <span className="inline-block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Turborepo Example
            </span>{' '}
          </h1>
          <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
            <Button />
          </div>
        </main>
      </div>
      <div className="flex flex-col gap-4">
        <ListPosts />
        <AddPost />
      </div>
    </>
  );
};

export default IndexPage;
