import _ from 'lodash';
import { getHours, getMinutes, getSeconds } from 'date-fns';

export const calendarOnlyProps = [
  'disabledHours',
  'disabledMinutes',
  'disabledSeconds',
  'hideHours',
  'hideHours',
  'hideMinutes',
  'hideSeconds'
];

export default function disabledTime(props: object, date: Date) {
  if (!date) {
    return false;
  }

  const calendarProps: any = _.pick(props, calendarOnlyProps);

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
