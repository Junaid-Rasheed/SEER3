import React, { useState } from 'react';
import { goToBillingPortal } from '../utils/stripe';
import { CheckIcon } from '@heroicons/react/outline';
import Button from './Button';
import toast, { Toaster } from 'react-hot-toast';

const StripePortalButton = () => {
  const [loading, setLoading] = useState(false);

  const loadPortal = async () => {
    setLoading(true);
    try {
      await goToBillingPortal();
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-1 justify-center">
        <CheckIcon className="w-5 h-5" />
        <span className="uppercase">Subscribed</span>
      </div>
      <Button isLoading={loading} onClick={loadPortal} className="px-5">
        Change plan
      </Button>
      <Toaster />
    </div>
  );
};

export default StripePortalButton;
