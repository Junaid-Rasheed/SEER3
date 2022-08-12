import { Stripe } from 'stripe';

export type Interval = 'year' | 'month';
import type { User } from '@firebase/auth';

export interface IPlan {
  id: string;
  name: string;
  price: number;
  interval: Interval;
  currency?: string;
}

export interface IUser extends User {
  subscription?: Stripe.Subscription;
}
