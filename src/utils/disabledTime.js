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
      return calendarProps[key](date.hours(), date);
    }
    if (/(Minutes)/.test(key)) {
      return calendarProps[key](date.minutes(), date);
    }
    if (/(Seconds)/.test(key)) {
      return calendarProps[key](date.seconds(), date);
    }
    return false;
  });
}
