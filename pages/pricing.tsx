// import { GetServerSidePropsContext } from 'next';
import Stripe from 'stripe';
import { getSession, useSession } from 'next-auth/react';
// import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import PricingComponent from '../components/Pricing';
import { fetchPostJSON } from '../utils/api-helpers';
import getStripejs from '../utils/get-stripejs';
import { GetServerSidePropsContext } from 'next';

const Pricing = ({ prices }: { prices: Array<Stripe.Price> }) => {
  const { data: session } = useSession();
  async function handleBuying(productId: string) {
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      '/api/checkout_sessions',
      { productId, uid: session?.user?.uid }
    );

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    const stripe = await getStripejs();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id
    });
    console.warn(error.message);
  }
  return (
    <Layout>
      <PricingComponent prices={prices} onClickBuyBtn={handleBuying} />
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01'
  });
  const session = await getSession(context);

  const prices = await stripe.prices.list({
    active: true,
    limit: 10
  });
  return {
    props: {
      prices: prices.data,
      session
    }
  };
}

export default Pricing;
