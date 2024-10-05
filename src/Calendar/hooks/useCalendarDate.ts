import { useState, useCallback, useRef } from 'react';
import { useUpdateEffect } from '@/internals/hooks';
import { startOfToday } from '@/internals/utils/date';

export const useCalendarDate = (value: Date | null | undefined, defaultDate: Date | undefined) => {
  const valueRef = useRef(value);

  const [calendarDate, setValue] = useState<Date>(value ?? defaultDate ?? startOfToday());

  const setCalendarDate = useCallback(
    (date: React.SetStateAction<Date> | undefined) => {
      if (date && date?.valueOf() !== calendarDate?.valueOf()) {
        setValue(date);
      }
    },
    [calendarDate]
  );

  const resetCalendarDate = useCallback(
    (nextValue = value) => {
      setValue(nextValue ?? defaultDate ?? startOfToday());
    },
    [defaultDate, value]
  );

  useUpdateEffect(() => {
    if (value?.valueOf() !== valueRef.current?.valueOf()) {
      setCalendarDate(value ?? defaultDate ?? startOfToday());
      valueRef.current = value;
    }
  }, [value, defaultDate]);

  return { calendarDate, setCalendarDate, resetCalendarDate };
};
