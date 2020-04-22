export const transformValueToCharacterValue = (value: number, max: number, allowHalf: boolean) => {
  const characterValue = [];
  for (let i = 0; i < max; i++) {
    if (i < value) {
      if (allowHalf && i + 1 > value) {
        value && characterValue.push(0.5);
      } else {
        characterValue.push(1);
      }
    } else {
      characterValue.push(0);
    }
  }
  return characterValue;
};

export const transformCharacterValueToValue = (value: number[]) =>
  value.reduce((total, currentValue) => total + currentValue);
