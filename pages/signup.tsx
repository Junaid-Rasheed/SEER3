import React, { useEffect, useRef, useState } from 'react';
import {
  db,
  auth,
  createUserWithEmailAndPassword
} from '../utils/firebaseClient';
import { collection, doc, setDoc } from 'firebase/firestore';
import Layout from '../components/Layout';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
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

      timeoutId.current = setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (err) {
      console.log('err', err);
      toast.error('Can not create new account');
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
      <section className="bg-black">
        <div className="mx-auto max-w-sm pb-10 grid grid-cols-1 gap-y-8">
          <h3 className="text-white heading text-center pt-14">
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
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5">
            <div className="grid grid-cols-2 grid-rows-2 gap-x-3">
              <label className="text-white">First name</label>
              <label className="text-white">Last name</label>
              <input
                className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
                name="firstName"
                type="First name"
                value={user.firstName}
                required
                onChange={handleChange}
              />
              <input
                className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
                name="lastName"
                value={user.lastName}
                type="Last name"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label className="text-white">Email</label>
              <input
                className="mt-2 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
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
                className="mt-2 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <button className="mt-5 bg-decode3 w-full py-2 px-3" type="submit">
              Sign up
            </button>
          </form>
          <div className="text-white text-center">
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
