'use client';
/**
 * Retrieves an array of week keys starting from the specified weekday.
 */
export function getWeekKeys(weekStart) {
  var weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  if (typeof weekStart === 'undefined') {
    return weekKeys;
  }
  return weekKeys.slice(weekStart).concat(weekKeys.slice(0, weekStart));
}
export default getWeekKeys;