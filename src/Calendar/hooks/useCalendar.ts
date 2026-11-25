import { useContext, useMemo } from 'react';
import { CalendarContext, CalendarContextValue } from '../CalendarProvider';

export const useCalendar = () => {
  const {
    locale,
    showWeekNumbers,
    isoWeek,
    weekStart: weekStartProp,
    ...rest
  } = useContext<CalendarContextValue>(CalendarContext);

  // Determine the start of the week based on various conditions
  const weekStart = useMemo(() => {
    // If weekStartProp is explicitly provided, use it
    if (typeof weekStartProp !== 'undefined') {
      return weekStartProp;
    }
    // If using ISO week, start on Monday (1)
    else if (isoWeek) {
      return 1;
    }
    // If locale specifies a weekStartsOn option, use it
    else if (locale?.dateLocale?.options?.weekStartsOn !== undefined) {
      return locale.dateLocale.options.weekStartsOn;
    }
    // Default to Sunday (0) if no other condition is met
    return 0;
  }, [weekStartProp, isoWeek, locale?.dateLocale?.options?.weekStartsOn]);

  return { locale, showWeekNumbers, isoWeek, weekStart, ...rest };
};
