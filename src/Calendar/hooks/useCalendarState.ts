import { useMemo, useState } from 'react';
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

  const reset = useEventCallback(() => {
    setCalendarState(undefined);

    if (calendarState === CalendarState.TIME) {
      props.onToggleTimeDropdown?.(false);
    } else if (calendarState === CalendarState.MONTH) {
      props.onToggleMonthDropdown?.(false);
    }
  });

  const onMoveForward = useEventCallback(() => {
    props.onMoveForward?.(addMonths(props.calendarDate, 1));
  });

  const onMoveBackward = useEventCallback(() => {
    props.onMoveBackward?.(addMonths(props.calendarDate, -1));
  });

  const onToggleTimeDropdown = useEventCallback(() => {
    if (calendarState === CalendarState.TIME) {
      setCalendarState(undefined);
    } else {
      setCalendarState(CalendarState.TIME);
    }

    props.onToggleTimeDropdown?.(calendarState !== CalendarState.TIME);
  });

  const onToggleMonthDropdown = useEventCallback(() => {
    if (calendarState === CalendarState.MONTH) {
      setCalendarState(undefined);
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
