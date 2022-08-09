import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        line_items: [
          {
            price: req.body.productId,
            quantity: 1
          }
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`
      };
      const checkoutSessionRef = await addDoc(
        collection(db, 'users', req.body.uid, 'checkout_sessions'),
        {
          price: req.body.productId,
          success_url: req.headers.origin,
          cancel_url: req.headers.origin
        }
      );

      onSnapshot(checkoutSessionRef, async (snap: any) => {
        const { error, url } = snap.data();
        if (error) {
          res
            .status(500)
            .json({ statusCode: 500, message: 'onSnapshot error' });
        }
        const checkoutSession: Stripe.Checkout.Session =
          await stripe.checkout.sessions.create(params);
        res.status(200).json(checkoutSession);
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
