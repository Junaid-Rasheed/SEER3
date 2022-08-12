export type Interval = 'year' | 'month';

export interface IPlan {
  id: string;
  name: string;
  price: number;
  interval: Interval;
  currency?: string;
}
