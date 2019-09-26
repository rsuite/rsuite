/**
 * from http://javascript.ruanyifeng.com/stdlib/regexp.html#toc12
 * @description escape Regular_Expressions special_characters '^$.|*+?{\\[()'
 */
export default function getSafeRegExpString(str) {
  return str.replace(/([\^\$\.\|\*\+\?\{\\\[\(\)])/g, '\\$1');
}
