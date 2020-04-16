import _ from 'lodash';
import getMinutes from 'date-fns/getMinutes';
import getHours from 'date-fns/getHours';
import getSeconds from 'date-fns/getSeconds';

import { legacyParse } from '@date-fns/upgrade/v2';

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
      return calendarProps[key](getHours(legacyParse(date)), date);
    }
    if (/(Minutes)/.test(key)) {
      return calendarProps[key](getMinutes(legacyParse(date)), date);
    }
    if (/(Seconds)/.test(key)) {
      return calendarProps[key](getSeconds(legacyParse(date)), date);
    }
    return false;
  });
}
