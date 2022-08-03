import { ReactNode } from 'react';
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';

export default function Layout({children}: {children: ReactNode}) {
  return (
      <main>
        <Banner />
        <div className="sticky top-0 z-20">
          <Header />
        </div>
        {children}
        <Footer />
      </main>
  )
}
