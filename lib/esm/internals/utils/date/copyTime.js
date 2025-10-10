'use client';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import getSeconds from 'date-fns/getSeconds';
import set from 'date-fns/set';
import isValid from 'date-fns/isValid';

/**
 * Copy the time from one date to another.
 *
 * @param from - The source date.
 * @param to - The target date.
 * @returns The target date with the time copied from the source date.
 */
export function copyTime(_ref) {
  var from = _ref.from,
    to = _ref.to;
  if (!isValid(from) || !isValid(to)) {
    return to;
  }
  return set(to, {
    hours: getHours(from),
    minutes: getMinutes(from),
    seconds: getSeconds(from)
  });
}
export default copyTime;