import React, { useEffect, useRef, useState } from 'react';
import { db, auth } from '../utils/firebaseClient';
import {
  sendEmailVerification,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import Layout from '../components/Layout';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import { waitFor } from '../utils/common';

const SignUp = () => {
  const router = useRouter();
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
      await sendEmailVerification(userCredential.user);

      const collectionRef = collection(db, 'users');
      await setDoc(doc(collectionRef, userCredential.user.uid), {
        ...user,
        uid: userCredential.user.uid,
        emailVerified: false
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
    } catch (err) {
      console.log('err', err);
      toast.error('Can not create new account');
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

  return (
    <Layout>
      <section className="bg-black px-10">
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
              <div className="grid grid-cols-2 grid-rows-2 gap-x-3">
                <label className="text-white">First name</label>
                <label className="text-white">Last name</label>
                <input
                  className="input"
                  name="firstName"
                  type="First name"
                  value={user.firstName}
                  required
                  onChange={handleChange}
                />
                <input
                  className="input"
                  name="lastName"
                  value={user.lastName}
                  type="Last name"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label className="text-white">Email</label>
                <input
                  className="input"
                  name="email"
                  value={user.email}
                  type="email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label className="text-white">Password</label>
                <input
                  required
                  value={user.password}
                  className="input"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                className="mt-5 w-full py-2 px-3"
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
        </div>
      </section>
      <Toaster />
    </Layout>
  );
};

export default SignUp;
