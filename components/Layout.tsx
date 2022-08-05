import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({
  children,
  banner
}: {
  children: ReactNode;
  banner?: ReactNode;
}) {
  return (
    <main className="min-h-full grid grid-cols-[100%] grid-rows-[auto,1fr,auto]">
      <div className="sticky top-0 z-20">
        {banner}
        <Header />
      </div>
      {children}
      <Footer />
    </main>
  );
}
