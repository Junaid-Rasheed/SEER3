import { Stripe, loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from '@firebase/functions';
import { app } from './firebaseClient';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe;

export function goToBillingPortal<T>() {
  const instance = getFunctions(app, 'us-central1');
  const functionRef = httpsCallable<{ returnUrl: string }, T>(
    instance,
    'ext-firestore-stripe-payments-createPortalLink'
  );

  return functionRef({
    returnUrl: `${window.location.origin}/dashboard`
  });
}
