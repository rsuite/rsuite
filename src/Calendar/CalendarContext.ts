import React, { useContext } from 'react';
import { CalendarContextValue } from './types';

const CalendarContext = React.createContext<CalendarContextValue>(null);
export const CalendarProvider = CalendarContext.Provider;
export const useCalendarContext = (): CalendarContextValue =>
  useContext(CalendarContext) || ({} as CalendarContextValue);
export default CalendarContext;
