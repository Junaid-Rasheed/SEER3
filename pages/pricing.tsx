import Stripe from 'stripe';
import PublicLayout from '../components/layouts/PublicLayout';
import PricingComponent from '../components/Pricing';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseClient';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '../components/context/Authentication';
import { IPlan } from '../model/payment';
import { NextPageWithLayout } from '../model/layout-types';
import DashboardLayout from '../components/layouts/DashboardLayout';

function wrapperLayout(isNotSubscribedUser: boolean) {
  if (isNotSubscribedUser) {
    return DashboardLayout;
  }
  return PublicLayout;
}

const Pricing: NextPageWithLayout<{ plans: Array<IPlan> }> = ({ plans }) => {
  const { user, subscription } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBuying(productId: string) {
    console.log(productId, 'productId');

    if (!user) {
      await router.push('/signup');
      return;
    }

    setLoading(true);

    const docRef = await addDoc(
      collection(db, `users/${user.uid}/checkout_sessions`),
      {
        price: productId,
        success_url: `${window.location.origin}/dashboard`,
        cancel_url: `${window.location.origin}/dashboard`
      }
    );

    onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error: { message: string };
        url: string;
      };

      if (error) {
        toast.error(error.message);
        console.log(error.message, 'error');

        setLoading(false);
        return;
      }
      if (url) {
        window.location.assign(url);
      }
    });
  }
  const WrapperLayout = useMemo(
    () => wrapperLayout(!!user && !subscription),
    [subscription, user]
  );

  return (
    <WrapperLayout>
      <PricingComponent
        plans={plans}
        subscription={subscription}
        onClickBuyBtn={handleBuying}
        isLoading={loading}
      />
    </WrapperLayout>
  );
};

export async function getStaticProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01'
  });

  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 10,
    type: 'recurring'
  });

  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product as string);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring?.interval,
        currency: price.currency
      };
    })
  );

  return {
    props: {
      plans
    }
  };
}

// Pricing.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>;

export default Pricing;
