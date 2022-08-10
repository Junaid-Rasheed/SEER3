import React from 'react';
import Layout from '../components/Layout';
import { GetServerSidePropsContext } from 'next';
import Stripe from 'stripe';

const Result = ({ customer }: { customer: any }) => {
  console.log(customer);
  return (
    <Layout>
      <div className="py-10">
        <h2 className="text-center">Purchased succeeded!</h2>
        <div className="h-96 max-w-xl mx-auto mt-8">
          <p>
            Customer name: <span className="font-bold"> {customer?.name}</span>
          </p>
          <p>
            Email: <span className="font-bold"> {customer?.email}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({
  query
}: GetServerSidePropsContext) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-08-01'
  });

  try {
    const session = (await stripe.checkout.sessions.retrieve(
      query.session_id as string
    )) as {
      customer: string;
    };
    const customer = await stripe.customers.retrieve(session.customer);
    return {
      props: {
        customer
      }
    };
  } catch (err) {
    return {
      props: {
        customer: {}
      }
    };
  }
};

export default Result;
