import React, { useState } from 'react';
import {
  db,
  auth,
  createUserWithEmailAndPassword
} from '../firebase/firebaseClient';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
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
    } catch (err) {
      console.log('err', err);
    }
  }

  return (
    <div className="mx-auto max-w-sm mt-10">
      <h3 className="text-white heading text-center py-10">
        WELCOME TO DECODE 3
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-5">
        <div className="grid grid-cols-2 grid-rows-2 gap-x-3">
          <label className="text-white">First name</label>
          <label className="text-white">Last name</label>
          <input
            className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
            name="firstName"
            type="First name"
            required
            onChange={handleChange}
          />
          <input
            className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
            name="lastName"
            type="Last name"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className="text-white">Email</label>
          <input
            className="mt-2 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300"
            name="email"
            type="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label className="text-white">Password</label>
          <input
            required
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
    </div>
  );
};

export default SignUp;
