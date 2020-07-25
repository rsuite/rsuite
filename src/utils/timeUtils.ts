import _ from 'lodash';
import { getHours, getMinutes, getSeconds } from 'date-fns';

const disabledTimeProps = ['disabledHours', 'disabledMinutes', 'disabledSeconds'];
const hideTimeProps = ['hideHours', 'hideMinutes', 'hideSeconds'];

export const calendarOnlyProps = disabledTimeProps.concat(hideTimeProps);

function validTime(calendarProps: object, date: Date) {
  if (!date) {
    return false;
  }

  return Object.keys(calendarProps).some(key => {
    if (/(Hours)/.test(key)) {
      return calendarProps[key](getHours(date), date);
    }
    if (/(Minutes)/.test(key)) {
      return calendarProps[key](getMinutes(date), date);
    }
    if (/(Seconds)/.test(key)) {
      return calendarProps[key](getSeconds(date), date);
    }
    return false;
  });
}

/**
 * Verify that the time is valid.
 * @param props
 * @param date
 */
export function disabledTime(props: object, date: Date) {
  const calendarProps = _.pick(props, disabledTimeProps);
  return validTime(calendarProps, date);
}
