import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import Header from '../Header';
import Footer from '../Footer';

export default function PublicLayout({
  children,
  banner
}: {
  children: ReactNode;
  banner?: ReactNode;
}) {
  return (
    <>
      <NextSeo
        title="The web3 Fundraising Database"
        description="Valuable data and insights for web3 founders and investors. Save hundreds of hours in research and significant resources."
        canonical="https://www.decode3.xyz/"
        openGraph={{
          url: 'https://decode3.xyz',
          title: 'Decode3',
          images: [
            {
              width: 300,
              height: 400,
              url: '/favicon.svg',
              alt: 'Decode3'
            },
            {
              width: 640,
              height: 768,
              url: '/favicon.svg',
              alt: 'Decode3'
            }
          ]
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />
      <main className="min-h-full grid grid-cols-[100%] grid-rows-[auto,1fr,auto] relative">
        <div className="sticky top-0 z-20">
          {banner}
          <Header />
        </div>
        {children}
        <Footer />
      </main>
    </>
  );
}
