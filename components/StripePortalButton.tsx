import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import Button from './Button';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPostJSON } from '../utils/api-helpers';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';

const StripePortalButton = () => {
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
    <div className="flex items-center justify-between gap-x-5 mt-10">
      <div className="flex items-center gap-x-1 justify-center">
        <CheckIcon className="w-5 h-5" />
        <span className="uppercase">Subscribed</span>
      </div>
      <Button isLoading={loading} onClick={loadPortal} className="px-4 py-2">
        Change plan
      </Button>
      <Toaster />
    </div>
  );
};

export default StripePortalButton;
