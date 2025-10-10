'use client';
import addDays from 'date-fns/addDays';
import startOfWeek from 'date-fns/startOfWeek';
/**
 * Get the first days of weeks in a month。
 * @param firstDayOfMonth The first day of the month
 * @param options.weekStart the index of the first day of the week (0 - Sunday)
 * @param options.isoWeek Whether to use ISO week
 * @returns A list of first days of weeks in a month
 */
export function getWeekStartDates(firstDayOfMonth, options) {
  var weekStart = options.weekStart,
    locale = options.locale;
  var firstDay = startOfWeek(firstDayOfMonth, {
    weekStartsOn: weekStart,
    locale: locale
  });
  var days = [firstDay];
  for (var i = 1; i < 6; i++) {
    days.push(addDays(firstDay, i * 7));
  }
  return days;
}
export default getWeekStartDates;