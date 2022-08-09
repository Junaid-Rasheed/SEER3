import { Stripe } from 'stripe';

export function getPrice(price: number | null) {
  if (price === null) return 0;
  return price / 100;
}

export function getSavedPercent(prices: Stripe.Price[]) {
  const yearPlan =
    prices.find((pr) => pr.recurring?.interval === 'year')?.unit_amount || 0;
  const monthPlan =
    prices.find((pr) => pr.recurring?.interval === 'month')?.unit_amount || 0;

  return Math.round((100 * (monthPlan * 12 - yearPlan)) / (monthPlan * 12));
}
