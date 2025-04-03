import { addDays } from 'date-fns/addDays';
import { startOfWeek } from 'date-fns/startOfWeek';
import type { Locale } from 'date-fns';
/**
 * Get the first days of weeks in a month。
 * @param firstDayOfMonth The first day of the month
 * @param options.weekStart the index of the first day of the week (0 - Sunday)
 * @param options.isoWeek Whether to use ISO week
 * @returns A list of first days of weeks in a month
 */
export function getWeekStartDates(
  firstDayOfMonth: Date,
  options: { weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6; isoWeek?: boolean; locale?: Locale }
): Date[] {
  const { weekStart = 0, isoWeek, locale } = options;
  const weekStartsOn = isoWeek ? 1 : weekStart;
  const firstDay = startOfWeek(firstDayOfMonth, { weekStartsOn, locale });
  const days = [firstDay];

  for (let i = 1; i < 6; i++) {
    days.push(addDays(firstDay, i * 7));
  }

  return days;
}

export default getWeekStartDates;
