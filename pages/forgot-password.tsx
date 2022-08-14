import React, { ReactElement, useState } from 'react';
import PublicLayout from '../components/layouts/PublicLayout';
import Button from '../components/Button';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebaseClient';
import { NextPageWithLayout } from '../model/layout-types';

const ForgotPassword: NextPageWithLayout = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<'none' | 'success' | 'error'>('none');

  function handleChange(e: any) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setMessage('none');
    if (email) {
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, email, {
          url: `${window.location.origin}/signin`
        });
        setEmail('');
        setMessage('success');
      } catch (err) {
        setMessage('error');
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div className="bg-black h-full flex items-center justify-center">
      <div className="px-4 lg:px-0 w-96">
        <h2 className="text-white heading text-3xl uppercase text-center">
          Forgot password
        </h2>
        {message === 'success' && (
          <div className="text-sm mt-8">
            <div className="p-4 border">
              <span className="text-decode3 uppercase">
                Send email success!
              </span>
              <p className="text-white mt-1">
                Check your email (or in spam) including the link to create new
                password
              </p>
            </div>
          </div>
        )}
        {message !== 'success' && (
          <form className="mt-10" onSubmit={handleSubmit}>
            <div>
              <label className="text-white">Email</label>
              <input
                className={`input ${
                  message === 'error'
                    ? 'ring-2 ring-red-500 ring-2 ring-red-500'
                    : ''
                }`}
                type="email"
                name={email}
                placeholder="Email"
                onChange={handleChange}
                value={email}
                required
              />
            </div>
            {message === 'error' && (
              <p className="text-red-500 mt-1">
                Your email entered might not registered or invalid, try it
                again.
              </p>
            )}
            <Button type="submit" className="w-full mt-10" isLoading={loading}>
              SEND
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

ForgotPassword.getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
);

export default ForgotPassword;
