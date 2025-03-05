import pick from 'lodash/pick';
import { getHours } from 'date-fns/getHours';
import { getMinutes } from 'date-fns/getMinutes';
import { getSeconds } from 'date-fns/getSeconds';
import { TimeProp } from './types';

interface CalendarProps {
  [TimeProp.DisabledHours]?: (hours: number, date: Date) => boolean;
  [TimeProp.DisabledMinutes]?: (minutes: number, date: Date) => boolean;
  [TimeProp.DisabledSeconds]?: (seconds: number, date: Date) => boolean;
  [TimeProp.HideHours]?: (hours: number, date: Date) => boolean;
  [TimeProp.HideMinutes]?: (minutes: number, date: Date) => boolean;
  [TimeProp.HideSeconds]?: (seconds: number, date: Date) => boolean;
}

const HOURS_PATTERN = /(Hours?)/;
const MINUTES_PATTERN = /(Minutes?)/;
const SECONDS_PATTERN = /(Seconds?)/;

/**
 * Verify that the time is valid.
 *
 * @param props - The calendar props.
 * @param date - The date to check.
 * @returns Whether the time is disabled.
 */
export function disableTime(props: CalendarProps, date: Date): boolean {
  if (!date) {
    return false;
  }
  const disabledTimeProps = [
    TimeProp.DisabledHours,
    TimeProp.DisabledMinutes,
    TimeProp.DisabledSeconds,
    TimeProp.ShouldDisableHour,
    TimeProp.ShouldDisableMinute,
    TimeProp.ShouldDisableSecond
  ] as const;

  const calendarProps = pick(props, disabledTimeProps);
  const mapProps = new Map(Object.entries(calendarProps));

  return Array.from(mapProps.keys()).some(key => {
    if (HOURS_PATTERN.test(key)) {
      return mapProps.get(key)?.(getHours(date), date);
    }
    if (MINUTES_PATTERN.test(key)) {
      return mapProps.get(key)?.(getMinutes(date), date);
    }
    if (SECONDS_PATTERN.test(key)) {
      return mapProps.get(key)?.(getSeconds(date), date);
    }
    return false;
  });
}

export default disableTime;
