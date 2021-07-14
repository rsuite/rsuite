import { useState } from 'react';
import { toTimeZone } from '../utils/timeZone';
import { useUpdateEffect } from '../utils';
import { TimeZoneName } from '../@types/common';

const useCalendarDate = (value: Date, defaultDate: Date, timeZone?: TimeZoneName) => {
  const [calendarDate, setCalendarDate] = useState<Date>(
    toTimeZone(value ?? defaultDate ?? new Date(), timeZone)
  );

  useUpdateEffect(() => {
    if (value) {
      setCalendarDate(toTimeZone(value, timeZone));
    }
  }, [value, timeZone]);

  return { calendarDate, setCalendarDate };
};

export default useCalendarDate;
