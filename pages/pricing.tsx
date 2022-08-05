// import { GetServerSidePropsContext } from 'next';
import Stripe from 'stripe';
// import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import PricingComponent from '../components/Pricing';
// import { fetchPostJSON } from '../utils/api-helpers';
// import getStripejs from '../utils/get-stripejs';

const Pricing = ({ prices }: { prices: Array<any> }) => {
  console.log(prices);
  // async function handleBuy(productId: string) {
  //   const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
  //     '/api/checkout_sessions',
  //     { amount: 1, productId }
  //   );
  //
  //   if ((checkoutSession as any).statusCode === 500) {
  //     console.error((checkoutSession as any).message);
  //     return;
  //   }
  //
  //   const stripe = await getStripejs();
  //   const { error } = await stripe!.redirectToCheckout({
  //     sessionId: checkoutSession.id
  //   });
  //   console.warn(error.message);
  // }
  return (
    <Layout>
      <PricingComponent />
    </Layout>
  );
};

export async function getServerSideProps() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01'
  });
  const prices = await stripe.prices.list({
    active: true,
    limit: 10
  });
  return {
    props: {
      prices: prices.data
    }
  };
}

export default Pricing;
