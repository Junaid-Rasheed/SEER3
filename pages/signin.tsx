import { getCsrfToken, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Divider from '../components/Divider';

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  return (
    <Layout>
      <div className="bg-black">
        <div className="max-w-sm mx-auto">
          <div className="py-10 grid grid-cols-1 gap-y-5">
            <h2 className="heading text-white text-center">LOG IN</h2>
            <GoogleSignInButton />
            <Divider />
            {/*<form method="post" action="/api/auth/signin/email">*/}
            {/*  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />*/}
            {/*  <div>*/}
            {/*    <label className="text-white">Email</label>*/}
            {/*    <input*/}
            {/*      type="email"*/}
            {/*      id="email"*/}
            {/*      name="email"*/}
            {/*      className="mt-2 py-3 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <button*/}
            {/*    type="submit"*/}
            {/*    className="mt-3 bg-decode3 w-full py-3 px-3"*/}
            {/*  >*/}
            {/*    Magic link*/}
            {/*  </button>*/}
            {/*</form>*/}
            <form method="post" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="">
                <label className="text-white">Email</label>
                <input
                  className="mt-2 py-3 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="mt-5">
                <label className="text-white">Password</label>
                <input
                  required
                  className="mt-2 py-3 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
                  name="password"
                  type="password"
                />
              </div>
              <div className="text-white mt-5">
                <p className="text-sm">
                  FORGOT PASSWORD?{' '}
                  <Link href="/reset-password">
                    <a className="underline hover:text-decode3">RESET IT</a>
                  </Link>
                </p>
              </div>
              <button
                className="mt-8 bg-decode3 w-full py-3 px-3"
                type="submit"
              >
                Log in
              </button>
            </form>
            <p className="text-white text-center text-sm">
              DON&apos;T HAVE AN ACCOUNT?{' '}
              <Link href="/signup">
                <a className="underline hover:text-decode3">REGISTER</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session && context.res) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: { session }
    };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken
    }
  };
}
