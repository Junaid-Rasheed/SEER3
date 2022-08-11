import Stripe from 'stripe';
import Layout from '../components/Layout';
import PricingComponent from '../components/Pricing';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebaseClient';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '../components/context/Authentication';

const Pricing = ({ prices }: { prices: Array<Stripe.Price> }) => {
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
    <Layout>
      <PricingComponent
        prices={prices}
        onClickBuyBtn={handleBuying}
        isLoading={loading}
      />
    </Layout>
  );
};

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01'
  });

  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    type: 'recurring'
  });

  const year = prices.data.find((p) => p.recurring?.interval === 'year');
  const month = prices.data.find((p) => p.recurring?.interval === 'month');
  return {
    props: {
      prices: [year, month]
    }
  };
}

export default Pricing;
