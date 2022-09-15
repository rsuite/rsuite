import { useCallback, useState } from 'react';

export enum CalendarState {
  'TIME' = 'TIME',
  'MONTH' = 'MONTH'
}

const useCalendarState = (defaultState?: CalendarState) => {
  const [calendarState, setCalendarState] = useState<CalendarState | undefined>(defaultState);

  const reset = useCallback(() => {
    setCalendarState(undefined);
  }, []);

  const openMonth = useCallback(() => {
    setCalendarState(CalendarState.MONTH);
  }, []);

  const openTime = useCallback(() => {
    setCalendarState(CalendarState.TIME);
  }, []);

  return {
    calendarState,
    reset,
    openMonth,
    openTime
  };
};

export default useCalendarState;
