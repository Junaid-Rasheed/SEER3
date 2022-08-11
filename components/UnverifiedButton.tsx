import React, { useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../utils/firebaseClient';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';

const UnverifiedButton = () => {
  const [loading, setLoading] = useState(false);

  async function handleVerification() {
    setLoading(true);
    try {
      await sendEmailVerification(auth.currentUser as any);
      toast.success('Send an email success');
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        className="border border-decode3 bg-black px-2 py-1 text-decode3 text-sm normal-case"
        onClick={handleVerification}
        isLoading={loading}
      >
        Verify now
      </Button>
      <Toaster />
    </>
  );
};

export default UnverifiedButton;
