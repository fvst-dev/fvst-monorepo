import '../styles/globals.css';

import React from 'react';
import { Lexend } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ApolloProviderWrapper } from './_lib/apolloClient';
import { Header } from '@package/nextjs-header';

const lexend = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-svg ${lexend.className}`}>
        <div className="mx-auto max-w-7xl p-6">
          <ClerkProvider
            publishableKey={process.env.CLERK_PUBLISHABLE_KEY}
            appearance={{
              variables: {
                borderRadius: '0px',
              },
            }}
          >
            <ApolloProviderWrapper gateway={process.env.GRAPHQL_GATEWAY as string}>
              <Header />
              <main>{children}</main>
            </ApolloProviderWrapper>
          </ClerkProvider>
        </div>
      </body>
    </html>
  );
}
