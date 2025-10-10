'use client';
var emptyArray = [];
var strCaretTrap = '[]';
export var defaultPlaceholderChar = '_';
export function convertMaskToPlaceholder(mask, placeholderChar) {
  if (mask === void 0) {
    mask = emptyArray;
  }
  if (placeholderChar === void 0) {
    placeholderChar = defaultPlaceholderChar;
  }
  if (!Array.isArray(mask)) {
    throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
  }
  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error('Placeholder character must not be used as part of the mask. Please specify a character ' + 'that is not present in your mask as your placeholder character.\n\n' + ("The placeholder character that was received is: " + JSON.stringify(placeholderChar) + "\n\n") + ("The mask that was received is: " + JSON.stringify(mask)));
  }
  return mask.map(function (char) {
    return char instanceof RegExp ? placeholderChar : char;
  }).join('');
}
export function processCaretTraps(mask) {
  var indexes = [];
  var indexOfCaretTrap;
  while (indexOfCaretTrap = mask.indexOf(strCaretTrap), indexOfCaretTrap !== -1) {
    indexes.push(indexOfCaretTrap);
    mask.splice(indexOfCaretTrap, 1);
  }
  return {
    maskWithoutCaretTraps: mask,
    indexes: indexes
  };
}