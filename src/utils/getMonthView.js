/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
export default function getMonthView(monthDate, isoWeek) {
  let firstDayOfMonth = monthDate.day();
  let distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  let firstWeekendDate = monthDate.clone().add(distance, 'days');
  let weeks = [firstWeekendDate];
  let nextWeekendDate = firstWeekendDate.clone().add(7, 'days');

  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = nextWeekendDate.clone().add(7, 'days');
    weeks.push(nextWeekendDate);
  }

  return weeks;
}
