import setHours from 'date-fns/setHours';
import getHours from 'date-fns/getHours';

/**
 * Get the time with AM and PM reversed.
 *
 * @param date - The date to reverse the time meridian.
 * @returns The date with the time meridian reversed.
 */
export const getReversedTimeMeridian = (date: Date): Date => {
  const clonedDate = new Date(date.valueOf());
  const hours = getHours(clonedDate);
  const nextHours = hours >= 12 ? hours - 12 : hours + 12;

  return setHours(clonedDate, nextHours);
};

export default getReversedTimeMeridian;
