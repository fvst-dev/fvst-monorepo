import { ReactNode } from 'react';
import ReactHeader from '@package/next-auth/src/ReactHeader';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactHeader />
      <main>{children}</main>
    </>
  );
}
