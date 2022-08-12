import { IPlan } from '../model/payment';

export function getPrice(price: number | null) {
  if (price === null) return 0;
  return price / 100;
}

export function getSavedPercent(prices: IPlan[]) {
  const yearPlan = prices[0].price || 0;
  const monthPlan = prices[1].price || 0;

  const gap = monthPlan * 12 - yearPlan;

  if (gap <= 0) {
    return 0;
  }
  return Math.floor((100 * (monthPlan * 12 - yearPlan)) / (monthPlan * 12));
}
