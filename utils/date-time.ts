import dayjs from 'dayjs';

export function formatDate(d: string | number | Date, pattern?: string) {
  return dayjs(d).format('YYYY-MM-DD hh:mm:ss' || pattern);
}
