import PublicLayout from '../components/layouts/PublicLayout';
import Link from 'next/link';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Divider from '../components/Divider';
import Button from '../components/Button';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../components/context/Authentication';
import { useRouter } from 'next/router';
import { ICredentials } from '../model/auth';
import toast, { Toaster } from 'react-hot-toast';

function SignIn() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
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
  }, []);

  async function handleLogin(e: any) {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      setLoading(true);
      try {
        await login?.(credentials);
        await router.push('/dashboard');
      } catch (err: any) {
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="bg-black px-10">
      <div className="max-w-sm mx-auto">
        <div className="py-10 grid grid-cols-1 gap-y-5">
          <h2 className="heading text-white text-center">LOG IN</h2>
          <GoogleSignInButton />
          <Divider />
          <fieldset disabled={loading}>
            <form onSubmit={handleLogin}>
              <div className="">
                <label className="text-white uppercase">Email</label>
                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  value={credentials.email}
                  required
                />
              </div>
              <div className="mt-5">
                <label className="text-white uppercase">Password</label>
                <input
                  required
                  className="input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="text-white mt-5">
                <p className="text-sm">
                  FORGOT PASSWORD?{' '}
                  <Link href="/forgot-password">
                    <a className="underline hover:text-decode3">RESET IT</a>
                  </Link>
                </p>
              </div>
              <Button
                type="submit"
                className="mt-8 w-full uppercase font-bold"
                isLoading={loading}
              >
                Log in
              </Button>
            </form>
          </fieldset>
          <p className="text-white text-center text-sm">
            DON&apos;T HAVE AN ACCOUNT?{' '}
            <Link href="/signup">
              <a className="underline hover:text-decode3">REGISTER</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

SignIn.getLayout = (page: ReactElement) => (
  <PublicLayout>
    {page} <Toaster />
  </PublicLayout>
);

export default SignIn;
