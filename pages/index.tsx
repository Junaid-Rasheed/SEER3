import Layout from '../components/Layout';
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout banner={<Banner />}>{page}</Layout>;
};

export default Home;
