import { useMemo, useState } from 'react';
import { addMonths } from '@/internals/utils/date';
import { addJalaliMonths } from '@/internals/utils/date/jalali';
import { useEventCallback } from '@/internals/hooks';

export enum CalendarState {
  'TIME' = 'TIME',
  'MONTH' = 'MONTH'
}

export interface CalendarStateProps {
  defaultState?: CalendarState;
  calendarDate: Date;
  calendarSystem?: 'gregorian' | 'jalali';
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
    const nextDate =
      props.calendarSystem === 'jalali'
        ? addJalaliMonths(props.calendarDate, 1)
        : addMonths(props.calendarDate, 1);
    props.onMoveForward?.(nextDate);
  });

  const onMoveBackward = useEventCallback(() => {
    const nextDate =
      props.calendarSystem === 'jalali'
        ? addJalaliMonths(props.calendarDate, -1)
        : addMonths(props.calendarDate, -1);
    props.onMoveBackward?.(nextDate);
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
