export function getStringLength(str: string) {
  let length = 0;
  Array.from(str).forEach(char => {
    if (char.charCodeAt(0) > 255) {
      length += 2;
    } else {
      length++;
    }
  });

  return length;
}

export default getStringLength;
