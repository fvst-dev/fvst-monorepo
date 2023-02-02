import { type NextPage } from 'next';
import Head from 'next/head';
import Layout from './Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white py-2">
        <Head>
          <title>FVST web example</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
          <h1 className="mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-black sm:text-7xl lg:text-8xl xl:text-8xl">
            FVST <br className="hidden lg:block" />
            <span className="inline-block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent ">
              Turborepo Example
            </span>{' '}
          </h1>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
