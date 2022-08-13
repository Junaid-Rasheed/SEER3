import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { fbAdmin } from '../../lib/firebaseAdmin';
import { IUser } from '../../model/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { uid } = req.body;
      if (!uid) {
        return res.status(500).send({ message: 'uid not found' });
      }

      const userDoc = await fbAdmin.db.collection('users').doc(uid).get();
      const user = userDoc.data() as IUser;

      if (!user?.stripeId) {
        return res.status(500).send({ message: 'User is not subscribed yet' });
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeId,
        return_url: `${req.headers.origin}/dashboard`
      });

      res.json({ sessionUrl: session.url });
    } catch (err: any) {
      return res.status(400).send({ message: err?.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
