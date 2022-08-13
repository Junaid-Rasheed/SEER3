import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { stripeId } = req.body;

    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeId,
        return_url: 'http://localhost:3000/dashboard'
      });

      res.json({ sessionUrl: session.url });
    } catch (err: any) {
      console.log(err);
      res.status(400).end({ message: err?.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
