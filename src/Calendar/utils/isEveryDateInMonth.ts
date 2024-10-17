import { getDaysInMonth } from '@/internals/utils/date';

export function isEveryDateInMonth(
  year: number,
  month: number,
  predicate: (date: Date) => boolean
): boolean {
  const days = getDaysInMonth(new Date(year, month));

  for (let i = 1; i <= days; i++) {
    if (!predicate(new Date(year, month, i))) {
      return false;
    }
  }
  return true;
}
