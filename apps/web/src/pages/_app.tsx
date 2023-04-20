import { type AppType } from 'next/app';
import '../styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;
