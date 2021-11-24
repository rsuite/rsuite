import React, { useContext } from 'react';
import { CalendarContextValue } from './types';

const CalendarContext = React.createContext<CalendarContextValue>({} as any);

export default CalendarContext;

export const CalendarProvider = CalendarContext.Provider;

export const useCalendarContext = (): CalendarContextValue =>
  useContext(CalendarContext) || ({} as CalendarContextValue);
