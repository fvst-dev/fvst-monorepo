import '../client/styles/globals.css';

import type { AppType, AppProps } from 'next/app';

import { DefaultLayout } from '../client/features/layout/DefaultLayout';
import { trpc } from '../client/utils/trpc';

const Fvst = (({ Component, pageProps }: AppProps) => {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}) as AppType;

export default trpc.withTRPC(Fvst);
