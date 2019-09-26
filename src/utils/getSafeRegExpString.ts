/**
 * @description escape Regular_Expressions special_characters '^$.|*+?{\\[()'
 */
export default function getSafeRegExpString(str: string) {
  return str.replace(/([\^\$\.\|\*\+\?\{\\\[\(\)])/g, '\\$1');
}
