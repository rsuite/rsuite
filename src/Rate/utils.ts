export type CharacterType = 0 | 0.5 | 1;

export const transformValueToCharacterMap = (
  value: number,
  max: number,
  allowHalf: boolean
): CharacterType[] => {
  const characterMap: CharacterType[] = [];
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

export const transformCharacterMapToValue = (characterMap: CharacterType[]) =>
  (characterMap as number[]).reduce((total, currentValue) => {
    return total + currentValue;
  });
