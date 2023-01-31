import { useState, useCallback, useRef } from 'react';
import { useUpdateEffect } from '../utils';

const useCalendarDate = (value: Date | null | undefined, defaultDate: Date | undefined) => {
  const valueRef = useRef(value);

  const [calendarDate, setValue] = useState<Date>(value ?? defaultDate ?? new Date());

  const setCalendarDate = useCallback(
    (date: Date | undefined) => {
      if (date && date?.valueOf() !== calendarDate?.valueOf()) {
        setValue(date);
      }
    },
    [calendarDate]
  );

  const resetCalendarDate = useCallback(
    (nextValue = value) => {
      setValue(nextValue ?? defaultDate ?? new Date());
    },
    [defaultDate, value]
  );

  useUpdateEffect(() => {
    if (value?.valueOf() !== valueRef.current?.valueOf()) {
      setCalendarDate(value ?? defaultDate ?? new Date());
      valueRef.current = value;
    }
  }, [value, defaultDate]);

  return { calendarDate, setCalendarDate, resetCalendarDate };
};

export default useCalendarDate;
