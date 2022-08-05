import type { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ExplainProduct from '../components/ExplainProduct';
import Data from '../components/Data';
import WhoWeServe from '../components/WhoWeServe';
import Investment from '../components/Investment';
import Features from '../components/Features';
import { getSession } from 'next-auth/react';
import Banner from '../components/Banner';

const Home: NextPage = () => {
  return (
    <>
      <Layout banner={<Banner />}>
        <Hero />
        <ExplainProduct />
        <Data />
        <WhoWeServe />
        <Investment />
        <Features />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  };
}

export default Home;
