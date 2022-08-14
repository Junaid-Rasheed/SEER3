import PublicLayout from '../components/layouts/PublicLayout';
import Hero from '../components/Hero';
import ExplainProduct from '../components/ExplainProduct';
import Data from '../components/Data';
import WhoWeServe from '../components/WhoWeServe';
import Investment from '../components/Investment';
import Features from '../components/Features';
import Banner from '../components/Banner';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../model/layout-types';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
      <ExplainProduct />
      <Data />
      <WhoWeServe />
      <Investment />
      <Features />
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <PublicLayout banner={<Banner />}>{page}</PublicLayout>
);

export default Home;
