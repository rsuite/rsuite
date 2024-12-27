/**
 * @description escape Regular_Expressions special_characters '^$.|*+?{\\[()'
 */
export function getSafeRegExpString(str: string) {
  const specialChars = '\\^$.|?*+()[]{}';
  return str.replace(new RegExp(`([${specialChars}])`, 'g'), '\\$1');
}
