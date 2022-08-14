import React, { useState } from 'react';
import Button from './Button';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPostJSON } from '../utils/api-helpers';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/router';
import useSubscription from '../hooks/useSubscription';
import { useAuth } from './context/Authentication';

const StripePortalButton = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.uid);
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
    <div className="py-10">
      <h3 className="text-white mb-3">
        You already subscribed plan:{' '}
        <span className="text-decode3 border border-decode3 px-3 uppercase font-bold">
          {subscription?.items?.[0]?.plan.interval}
        </span>
      </h3>
      <Button isLoading={loading} onClick={loadPortal} className="px-4 py-2">
        Change plan
      </Button>
      <Toaster />
    </div>
  );
};

export default StripePortalButton;
