import Stripe from 'stripe';
import PublicLayout from '../components/layouts/PublicLayout';
import PricingComponent from '../components/Pricing';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebaseClient';
import React, { ReactElement, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '../components/context/Authentication';
import { IPlan } from '../model/payment';
import { NextPageWithLayout } from '../model/layout-types';

const Pricing: NextPageWithLayout<{ plans: Array<IPlan> }> = ({ plans }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleBuying(productId: string) {
    if (!user) {
      await router.push('/signin');
      return;
    }

    setLoading(true);

    const docRef = await addDoc(
      collection(db, `users/${user.uid}/checkout_sessions`),
      {
        price: productId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      }
    );

    onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error: { message: string };
        url: string;
      };
      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      if (url) {
        window.location.assign(url);
      }
    });
  }
  return (
    <PricingComponent
      plans={plans}
      onClickBuyBtn={handleBuying}
      isLoading={loading}
    />
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

Pricing.getLayout = (page: ReactElement) => <PublicLayout>{page}</PublicLayout>;

export default Pricing;
