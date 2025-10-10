'use client';
export var transformValueToCharacterMap = function transformValueToCharacterMap(value, max, allowHalf) {
  var characterMap = [];
  for (var i = 0; i < max; i++) {
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
export var transformCharacterMapToValue = function transformCharacterMapToValue(characterMap) {
  return characterMap.reduce(function (total, currentValue) {
    return total + currentValue;
  });
};