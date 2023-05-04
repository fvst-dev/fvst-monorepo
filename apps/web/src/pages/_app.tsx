import { type AppType } from 'next/app';
import '../styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ApolloProviderWrapper } from '../lib/apolloClient';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ApolloProviderWrapper>
        <Component {...pageProps} />
      </ApolloProviderWrapper>
    </ClerkProvider>
  );
};

export default MyApp;
