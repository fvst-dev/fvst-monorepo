import { ReactNode } from 'react';
import Header from '@package/auth-header/src/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
