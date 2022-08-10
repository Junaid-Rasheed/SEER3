import { Stripe } from 'stripe';

export function getPrice(price: number | null) {
  if (price === null) return 0;
  return price / 100;
}

export function getSavedPercent(prices: Stripe.Price[]) {
  const yearPlan = prices[0].unit_amount || 0;
  const monthPlan = prices[1].unit_amount || 0;

  const gap = monthPlan * 12 - yearPlan;

  if (gap <= 0) {
    return 0;
  }
  return Math.floor((100 * (monthPlan * 12 - yearPlan)) / (monthPlan * 12));
}
