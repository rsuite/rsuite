import { MaskType, MaskFunctionType } from './types';

const emptyArray = [];
const strCaretTrap = '[]';

export const defaultPlaceholderChar = '_';

export function convertMaskToPlaceholder(
  mask: MaskType | MaskFunctionType = emptyArray,
  placeholderChar = defaultPlaceholderChar
) {
  if (!Array.isArray(mask)) {
    throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
  }

  if (mask.indexOf(placeholderChar) !== -1) {
    throw new Error(
      'Placeholder character must not be used as part of the mask. Please specify a character ' +
        'that is not present in your mask as your placeholder character.\n\n' +
        `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
        `The mask that was received is: ${JSON.stringify(mask)}`
    );
  }

  return mask
    .map(char => {
      return char instanceof RegExp ? placeholderChar : char;
    })
    .join('');
}

export function processCaretTraps(mask) {
  const indexes: number[] = [];

  let indexOfCaretTrap: number;

  while (((indexOfCaretTrap = mask.indexOf(strCaretTrap)), indexOfCaretTrap !== -1)) {
    indexes.push(indexOfCaretTrap);
    mask.splice(indexOfCaretTrap, 1);
  }

  return { maskWithoutCaretTraps: mask, indexes };
}
