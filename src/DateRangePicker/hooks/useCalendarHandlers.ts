import { useMemo } from 'react';
import { useEventCallback } from '@/internals/hooks';
import { addMonths } from '@/internals/utils/date';

interface CalendarHandlerProps {
  index: number;
  calendarDateRange: Date[];
  onChangeCalendarMonth?: (index: number, nextPageDate: Date) => void;
  onChangeCalendarTime?: (index: number, nextPageDate: Date) => void;
  onSelect?: (index: number, date: Date, event: React.SyntheticEvent) => void;
}

export function useCalendarHandlers({
  index,
  calendarDateRange,
  onChangeCalendarMonth,
  onChangeCalendarTime,
  onSelect
}: CalendarHandlerProps) {
  const calendarDate = useMemo(() => calendarDateRange[index], [calendarDateRange, index]);

  const handleSelect = useEventCallback((date: Date, event: React.SyntheticEvent) => {
    onSelect?.(index, date, event);
  });

  const handleChangeMonth = useEventCallback((nextPageDate: Date) => {
    onChangeCalendarMonth?.(index, nextPageDate);
  });

  const handleChangeTime = useEventCallback((nextPageDate: Date) => {
    onChangeCalendarTime?.(index, nextPageDate);
  });

  const handleMoveForward = useEventCallback(() => {
    onChangeCalendarMonth?.(index, addMonths(calendarDate, 1));
  });

  const handleMoveBackward = useEventCallback(() => {
    onChangeCalendarMonth?.(index, addMonths(calendarDate, -1));
  });

  return {
    calendarDate,
    onSelect: handleSelect,
    onChangeMonth: handleChangeMonth,
    onChangeTime: handleChangeTime,
    onMoveForward: handleMoveForward,
    onMoveBackward: handleMoveBackward
  };
}

export default useCalendarHandlers;
