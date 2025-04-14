export type CharacterType = 0 | 0.5 | 1 | number;

/**
 * Transforms a numeric value into a character map array.
 */
export const transformValueToCharacterMap = (
  value: number,
  max: number,
  allowHalf: boolean
): CharacterType[] => {
  const characterMap: CharacterType[] = [];
  for (let i = 0; i < max; i++) {
    if (i < value && value >= i + 1) {
      // Fully filled star
      characterMap.push(1);
    } else if (i < value && value < i + 1) {
      // Partially filled star
      if (allowHalf) {
        // Use 0.5 to represent partial fill when half ratings are allowed
        characterMap.push(0.5);
      } else {
        // 取出小数部分
        characterMap.push(value - i);
      }
    } else {
      // Empty star
      characterMap.push(0);
    }
  }
  return characterMap;
};

/**
 * Transforms a character map array into a numeric value.
 */
export const transformCharacterMapToValue = (characterMap: CharacterType[]) =>
  (characterMap as number[]).reduce((total, currentValue) => {
    return total + currentValue;
  });

/**
 * Calculates the fractional part of a value as a percentage string.
 */
export const getFractionalValue = (value: number) => {
  if (!value) {
    return undefined;
  }

  const integer = Math.floor(value);
  const decimal = value - integer;

  // Round to avoid floating-point precision issues
  return decimal ? `${Math.round(decimal * 100)}%` : undefined;
};
