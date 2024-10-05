import { getHours, getMinutes, getSeconds } from '@/internals/utils/date';

export interface ClockTime {
  hours?: number | null;
  minutes?: number | null;
  seconds?: number | null;
  meridiem?: 'AM' | 'PM' | null;
}

/**
 * Convert the 24-hour clock to the 12-hour clock
 * @param hours
 */
function getMeridiemHours(hours: number): number {
  return hours >= 12 ? hours - 12 : hours;
}

export function getClockTime(props: { date?: Date; format?: string; showMeridiem: boolean }) {
  const { format, date, showMeridiem } = props;
  const clockTime: ClockTime = {
    hours: null,
    minutes: null,
    seconds: null,
    meridiem: null
  };

  if (!format) {
    return clockTime;
  }

  // If date is provided, extract hours and meridiem
  if (/(H|h)/.test(format) && date) {
    const hours = getHours(date);

    clockTime.hours = showMeridiem ? getMeridiemHours(hours) : hours;
    clockTime.meridiem = hours >= 12 ? 'PM' : 'AM';
  }
  // Extract minutes if 'm' is present in format and date is provided
  if (/m/.test(format) && date) {
    clockTime.minutes = getMinutes(date);
  }
  // // Extract seconds if 's' is present in format and date is provided
  if (/s/.test(format) && date) {
    clockTime.seconds = getSeconds(date);
  }
  return clockTime;
}
