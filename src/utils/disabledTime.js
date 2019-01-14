import _ from 'lodash';

export const calendarOnlyProps = [
  'disabledHours',
  'disabledMinutes',
  'disabledSeconds',
  'hideHours',
  'hideHours',
  'hideMinutes',
  'hideSeconds'
];

export default function disabledTime(props, date) {
  if (!date) {
    return false;
  }

  const calendarProps = _.pick(props, calendarOnlyProps);

  return Object.keys(calendarProps).some(key => {
    if (/(Hours)/.test(key)) {
      return calendarProps[key](date.hour(), date);
    }
    if (/(Minutes)/.test(key)) {
      return calendarProps[key](date.minute(), date);
    }
    if (/(Seconds)/.test(key)) {
      return calendarProps[key](date.second(), date);
    }
    return false;
  });
}
