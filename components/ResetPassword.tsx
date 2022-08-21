import React, { useState } from 'react';
import { auth } from '../lib/firebaseClient';
import { confirmPasswordReset } from 'firebase/auth';
import Button from './Button';
import toast from 'react-hot-toast';
import { waitFor } from '../utils/common';
import { useRouter } from 'next/router';

const ResetPassword = ({ oobCode }: { oobCode: string }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: any) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (password && oobCode) {
      setLoading(true);
      try {
        await confirmPasswordReset(auth, oobCode, password);
        toast.success('Password has been changed, you can login now');

        await waitFor(1500);
        await router.push('/signin');
      } catch (err: any) {
        toast.error(err?.message || 'Error');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <h2 className="heading text-white uppercase text-center">
        Reset password
      </h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <div>
          <label className="text-white uppercase">New password</label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={handleChange}
            value={password}
            required
            min={6}
            max={50}
          />
        </div>
        <Button type="submit" className="w-full mt-10" isLoading={loading}>
          Reset password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
