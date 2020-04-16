import addDays from 'date-fns/addDays';
import getDay from 'date-fns/getDay';

import { legacyParse } from '@date-fns/upgrade/v2';

/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
export default function getMonthView(monthDate: Date, isoWeek: boolean) {
  const firstDayOfMonth = getDay(legacyParse(monthDate));
  let distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  const firstWeekendDate = addDays(legacyParse(monthDate), distance);
  const weeks = [firstWeekendDate];
  let nextWeekendDate = addDays(legacyParse(firstWeekendDate), 7);

  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = addDays(legacyParse(nextWeekendDate), 7);
    weeks.push(nextWeekendDate);
  }

  return weeks;
}
