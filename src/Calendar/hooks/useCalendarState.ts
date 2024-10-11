import { useCallback, useMemo, useState } from 'react';
import { addMonths } from '@/internals/utils/date';
import { useEventCallback } from '@/internals/hooks';

export enum CalendarState {
  'TIME' = 'TIME',
  'MONTH' = 'MONTH'
}

export interface CalendarStateProps {
  defaultState?: CalendarState;
  calendarDate: Date;
  onMoveForward?: (date: Date) => void;
  onMoveBackward?: (date: Date) => void;
  onToggleTimeDropdown?: (toggle: boolean) => void;
  onToggleMonthDropdown?: (toggle: boolean) => void;
}

export const useCalendarState = (props: CalendarStateProps) => {
  const [calendarState, setCalendarState] = useState<CalendarState | undefined>(props.defaultState);

  const reset = useCallback(() => {
    setCalendarState(undefined);
  }, []);

  const onMoveForward = useEventCallback(() => {
    props.onMoveForward?.(addMonths(props.calendarDate, 1));
  });

  const onMoveBackward = useEventCallback(() => {
    props.onMoveBackward?.(addMonths(props.calendarDate, -1));
  });

  const onToggleTimeDropdown = useEventCallback(() => {
    if (calendarState === CalendarState.TIME) {
      reset();
    } else {
      setCalendarState(CalendarState.TIME);
    }

    props.onToggleTimeDropdown?.(calendarState !== CalendarState.TIME);
  });

  const onToggleMonthDropdown = useEventCallback(() => {
    if (calendarState === CalendarState.MONTH) {
      reset();
    } else {
      setCalendarState(CalendarState.MONTH);
    }

    props.onToggleMonthDropdown?.(calendarState !== CalendarState.MONTH);
  });

  const handlers = useMemo(() => {
    return {
      onMoveForward,
      onMoveBackward,
      onToggleTimeDropdown,
      onToggleMonthDropdown
    };
  }, [onMoveBackward, onMoveForward, onToggleMonthDropdown, onToggleTimeDropdown]);

  return {
    calendarState,
    handlers,
    reset
  };
};
