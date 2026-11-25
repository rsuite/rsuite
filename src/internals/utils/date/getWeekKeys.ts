/**
 * Retrieves an array of week keys starting from the specified weekday.
 */
export function getWeekKeys(weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
  const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  if (typeof weekStart === 'undefined') {
    return weekKeys;
  }

  return weekKeys.slice(weekStart).concat(weekKeys.slice(0, weekStart));
}

export default getWeekKeys;
