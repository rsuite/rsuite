import { useContext } from 'react';
import { CalendarContext, CalendarContextValue } from '../CalendarProvider';

export const useCalendar = () => {
  return useContext<CalendarContextValue>(CalendarContext);
};
