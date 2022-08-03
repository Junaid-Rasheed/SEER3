import type { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ExplainProduct from '../components/ExplainProduct';
import Data from '../components/Data';
import WhoWeServe from '../components/WhoWeServe';
import Investment from '../components/Investment';
import Features from '../components/Features';
import { signOut, useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button
          className="bg-gray-200 rounded px-3 py-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <Layout>
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
