import { addDays, getDay } from 'date-fns';

/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
export default function getMonthView(monthDate: Date, isoWeek: boolean) {
  const firstDayOfMonth = getDay(monthDate);
  let distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  const firstWeekendDate = addDays(monthDate, distance);
  const weeks = [firstWeekendDate];
  let nextWeekendDate = addDays(firstWeekendDate, 7);

  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = addDays(nextWeekendDate, 7);
    weeks.push(nextWeekendDate);
  }

  return weeks;
}
