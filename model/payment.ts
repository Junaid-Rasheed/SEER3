import { Stripe } from 'stripe';
import type { Timestamp } from 'firebase/firestore';

export type IntervalType = 'year' | 'month';

export interface StripeItem {
  plan: Stripe.Plan;
}

export interface ISubscription {
  items?: Array<StripeItem>;
  current_period_end?: Timestamp;
  current_period_start?: Timestamp;
}
