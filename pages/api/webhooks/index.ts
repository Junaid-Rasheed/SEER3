import { buffer } from 'micro';
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../utils/firebaseClient';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01'
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false
  }
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD']
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Successfully constructed event.
    console.log('✅ Success:', event.id);

    switch (event.type) {
      case 'customer.subscription.created':
        // @ts-ignore
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`💰 subscription status: ${subscription.status}`);
        // Then define and call a function to handle the event customer.subscription.created
        break;
      case 'customer.subscription.deleted':
        // @ts-ignore
        const subscription = event.data.object;
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case 'customer.subscription.updated':
        // @ts-ignore
        const subscription = event.data.object;
        // Then define and call a function to handle the event customer.subscription.updated
        break;

      case 'payment_intent.succeeded':
        // @ts-ignore
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const docRef = await addDoc(collection(db, 'products'), paymentIntent);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;

      case 'payment_intent.canceled':
        // @ts-ignore
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.canceled
        break;
      case 'payment_intent.created':
        // @ts-ignore
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.created
        break;
      case 'payment_intent.payment_failed':
        // @ts-ignore
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case 'payment_intent.processing':
        // @ts-ignore
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.processing
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler as any);
