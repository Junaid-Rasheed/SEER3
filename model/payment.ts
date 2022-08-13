export type IntervalType = 'year' | 'month';

export interface IPlan {
  id: string;
  name: string;
  price: number;
  interval: IntervalType;
  currency?: string;
}

export interface StripeItem {
  plan: IPlan;
}

export interface ISubscription {
  items?: Array<StripeItem>;
}
