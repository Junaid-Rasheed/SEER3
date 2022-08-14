import { Stripe } from 'stripe';

export interface ICredentials {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface IUser {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  displayName?: string | null;
  photoURL?: string | null;
  emailVerified?: boolean;
  stripeId?: string;
}

export enum ActionMode {
  PASSWORD_RESET = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail'
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}
