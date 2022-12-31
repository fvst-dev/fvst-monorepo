import type { AppType, AppProps } from 'next/app';

import { DefaultLayout } from '../components/DefaultLayout';
import { trpc } from '../utils/trpc';
import '../styles/globals.css';
import 'ui-component/styles.css';

const MyApp = (({ Component, pageProps }: AppProps) => {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
