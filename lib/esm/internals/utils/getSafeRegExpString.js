'use client';
/**
 * @description escape Regular_Expressions special_characters '^$.|*+?{\\[()'
 */
export function getSafeRegExpString(str) {
  return str.replace(/([\^\$\.\|\*\+\?\{\\\[\(\)])/g, '\\$1');
}