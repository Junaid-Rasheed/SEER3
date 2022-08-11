import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebaseClient';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: any) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (email) {
      setLoading(true);
      try {
        const data = await sendPasswordResetEmail(auth, email);
        console.log('sendPasswordResetEmail', data);
        setEmail('');
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <Layout>
      <div className="bg-black h-full flex items-center justify-center">
        <div className="px-4 lg:px-0">
          <h2 className="text-white heading text-3xl uppercase text-center">
            Reset password
          </h2>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <label className="text-white">Email</label>
              <input
                className="input w-80"
                type="email"
                name={email}
                placeholder="Email"
                onChange={handleChange}
                value={email}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-10" isLoading={loading}>
              RESET PASSWORD
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
