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

  useUpdateEffect(() => {
    if (value?.valueOf() !== valueRef.current?.valueOf()) {
      setCalendarDate(value ?? new Date());
      valueRef.current = value;
    }
  }, [value]);

  return { calendarDate, setCalendarDate };
};

export default useCalendarDate;
