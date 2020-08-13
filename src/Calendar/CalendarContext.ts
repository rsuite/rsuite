import React from 'react';
import { CalendarContextValue } from './types';

const CalendarContext = React.createContext<CalendarContextValue>(null);
export const CalendarProvider = CalendarContext.Provider;

export default CalendarContext;
