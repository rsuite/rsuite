'use client';
export function getStringLength(str) {
  var length = 0;
  Array.from(str).forEach(function (char) {
    if (char.charCodeAt(0) > 255) {
      length += 2;
    } else {
      length++;
    }
  });
  return length;
}
export default getStringLength;