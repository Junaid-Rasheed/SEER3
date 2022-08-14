import React, { useState } from 'react';
import Button from './Button';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPostJSON } from '../utils/api-helpers';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';

const StripePortalButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loadPortal = async () => {
    setLoading(true);
    try {
      const data = await fetchPostJSON<{
        sessionUrl: string;
        message?: string;
      }>('/api/create-customer-portal-session', {
        uid: auth.currentUser?.uid
      });
      if (!!data?.sessionUrl) {
        await router.push(data.sessionUrl);
      } else {
        toast.error(data.message!);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button isLoading={loading} onClick={loadPortal} className={className}>
        Open customer portal
      </Button>
      <Toaster />
    </>
  );
};

export default StripePortalButton;
