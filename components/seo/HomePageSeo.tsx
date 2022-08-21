import { NextSeo } from 'next-seo';

const HomePageSeo = () => {
  return (
    <NextSeo
      title={'The web3 Fundraising Database'}
      description={
        'Valuable data and insights for web3 founders and investors. Save hundreds of hours in research and significant resources.'
      }
      canonical="https://www.decode3.xyz"
      openGraph={{
        url: 'https://www.decode3.xyz',
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
  );
};

export default HomePageSeo;
