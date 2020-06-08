export const transformValueToCharacterMap = (
  value: number,
  max: number,
  allowHalf: boolean
): number[] => {
  const characterMap = [];
  for (let i = 0; i < max; i++) {
    if (i < value) {
      if (allowHalf && i + 1 > value) {
        value && characterMap.push(0.5);
      } else {
        characterMap.push(1);
      }
    } else {
      characterMap.push(0);
    }
  }
  return characterMap;
};

export const transformCharacterMapToValue = (value: number[]): number =>
  value.reduce((total, currentValue) => total + currentValue);
