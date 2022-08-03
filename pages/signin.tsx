import {
  getProviders,
  signIn,
  getCsrfToken,
  getSession
} from 'next-auth/react';
import { CommonProviderOptions } from 'next-auth/providers';
import { GetServerSidePropsContext } from 'next';
import GoogleIcon from '../components/icons/GoogleIcon';

export default function SignIn({
  providers,
  csrfToken
}: {
  providers: Record<'google' | 'credentials', CommonProviderOptions>;
  csrfToken: string;
}) {
  return (
    <div className="max-w-5xl mx-auto flex items-center justify-center">
      <div className="py-10 grid grid-cols-1 gap-y-10">
        <h2 className="heading text-white text-center">LOG IN</h2>
        <button
          className="border border-white px-3 py-2 text-white flex items-center space-x-2"
          onClick={() => signIn(providers?.google.id)}
        >
          <GoogleIcon className="w-6 h-6" />
          <span>Sign in with Google</span>
        </button>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="flex flex-col">
            <label className="text-white">Email</label>
            <input
              className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="text-white">Password</label>
            <input
              required
              className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
              name="password"
              type="password"
            />
          </div>
          <button className="mt-5 bg-decode3 w-full py-2 px-3" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const providers = await getProviders();
  if (session && context.res) {
    context.res.statusCode = 302;
    context.res.setHeader('Location', '/');

    return {
      props: { session, providers }
    };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers,
      csrfToken
    }
  };
}
