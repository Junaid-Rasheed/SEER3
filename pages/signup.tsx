import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { db, auth } from '../lib/firebaseClient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import Layout from '../components/Layout';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import { waitFor } from '../utils/common';
import { useAuth } from '../components/context/Authentication';

const SignUp = () => {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const timeoutId = useRef<any>(null);
  const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  function handleChange(e: any) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // await sendEmailVerification(userCredential.user);

      const collectionRef = collection(db, 'users');
      await setDoc(doc(collectionRef, userCredential.user.uid), {
        ...user,
        uid: userCredential.user.uid
      });

      toast.success('Successfully created!');

      setUser({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      });
      await waitFor(1500);
      await router.push('/');
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [router, currentUser]);

  return (
    <section className="bg-black px-4 lg:px-10">
      <div className="mx-auto max-w-sm pb-10 grid grid-cols-1 gap-y-8">
        <h3 className="text-white heading text-center pt-10">
          WELCOME TO DECODE 3
        </h3>
        <div>
          <GoogleSignInButton />
        </div>
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-x-3">
          <hr />
          <span className="text-white">OR</span>
          <hr />
        </div>
        <fieldset disabled={loading}>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-y-5 uppercase"
          >
            <div className="grid grid-cols-2 gap-x-3">
              <div>
                <label className="text-sm text-white">First name</label>
                <input
                  className="input"
                  name="firstName"
                  type="First name"
                  value={user.firstName}
                  placeholder="First name"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-white text-sm">Last name</label>
                <input
                  className="input"
                  name="lastName"
                  placeholder="Last name"
                  value={user.lastName}
                  type="Last name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="">
              <label className="text-sm text-white">Email</label>
              <input
                className="input"
                name="email"
                placeholder="Email"
                value={user.email}
                type="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label className="text-sm text-white">Password</label>
              <input
                required
                value={user.password}
                className="input"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="mt-5 w-full py-3 px-3 font-bold"
              type="submit"
              isLoading={loading}
            >
              Sign up
            </Button>
          </form>
        </fieldset>
        <div className="text-white text-center text-sm">
          HAVE AN ACCOUNT?{' '}
          <Link href="/signin">
            <a className="underline hover:text-decode3">LOG IN</a>
          </Link>
        </div>
        <p className="uppercase text-sm text-white text-center">
          by singing up, you agree to the{' '}
          <Link href="/terms-of-service">
            <a className="underline hover:text-decode3">terms of service</a>
          </Link>
          and the{' '}
          <Link href="/privacy-policy">
            <a className="underline hover:text-decode3">privacy policy</a>
          </Link>
        </p>
      </div>
    </section>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page} <Toaster />
    </Layout>
  );
};

export default SignUp;
