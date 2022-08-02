import type { GetServerSidePropsContext, NextPage } from 'next';
import { signIn, signOut, useSession, getSession } from 'next-auth/react';
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
      Not signed in <br />
      <button
        className="bg-decode3 px-3 py-2 rounded text-white"
        onClick={() => router.push('/signin')}
      >
        Sign in
      </button>
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
