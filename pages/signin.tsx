import Layout from '../components/Layout';
import Link from 'next/link';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Divider from '../components/Divider';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/context/Authentication';
import { useRouter } from 'next/router';
import { ICredentials } from '../model/auth';

export default function SignIn() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: ''
  });

  function handleChange(e: any) {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  function handleLogin(e: any) {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      login?.(credentials);
    }
  }

  return (
    <Layout>
      <div className="bg-black px-10">
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
            <form onSubmit={handleLogin}>
              <div className="">
                <label className="text-white">Email</label>
                <input
                  className="mt-2 py-3 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={credentials.email}
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
                  value={credentials.password}
                  onChange={handleChange}
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
              <Button type="submit" className="mt-8 w-full uppercase">
                Log in
              </Button>
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
