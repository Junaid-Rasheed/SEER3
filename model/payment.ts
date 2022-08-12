import { Stripe } from 'stripe';

export type IntervalType = 'year' | 'month';
import type { User } from '@firebase/auth';

export interface IPlan {
  id: string;
  name: string;
  price: number;
  interval: IntervalType;
  currency?: string;
}

export interface IUser extends User {
  subscription?: Stripe.Subscription;
}

export interface StripeItem {
  plan: IPlan;
}

export interface ISubscription {
  items?: Array<StripeItem>;
}
