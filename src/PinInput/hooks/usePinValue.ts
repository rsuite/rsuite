import { useMemo } from 'react';
import { useControlled } from '@/internals/hooks';

/**
 * Hook for managing pin input value
 * - Handles controlled/uncontrolled value
 * - Normalizes value to array format
 * - Manages array updates and modifications
 */
export const usePinValue = (
  controlValue: string | undefined,
  defaultValue: string,
  length: number,
  onChange?: (value: string) => void,
  onComplete?: (value: string) => void
) => {
  // Use controlled pattern for value management
  const [value, setValue] = useControlled(controlValue, defaultValue);

  // Convert string value to array of characters
  const valueArray = useMemo(() => {
    // Ensure value is a string and split it into an array of characters
    const valueString = value || '';
    const chars = valueString.split('');

    // Pad the array with empty strings if needed
    while (chars.length < length) {
      chars.push('');
    }

    // Trim the array if it's too long
    if (chars.length > length) {
      chars.length = length;
    }

    return chars;
  }, [value, length]);

  // Update specific digit at index
  const setDigit = (index: number, digit: string) => {
    if (index < 0 || index >= length) return;

    const newValueArray = [...valueArray];
    newValueArray[index] = digit;

    updateValue(newValueArray.join(''));
  };

  // Clear specific digit at index
  const clearDigit = (index: number) => {
    if (index < 0 || index >= length) return;

    const newValueArray = [...valueArray];
    newValueArray[index] = '';

    updateValue(newValueArray.join(''));
  };

  // Set entire value at once
  const updateValue = (newValue: string) => {
    // Filter out any extra characters beyond length
    const filteredValue = newValue.slice(0, length);
    setValue(filteredValue);
    onChange?.(filteredValue);

    // Call onComplete if the value is complete
    if (filteredValue.length === length) {
      onComplete?.(filteredValue);
    }
  };

  return {
    value,
    valueArray,
    setDigit,
    clearDigit,
    updateValue
  };
};

export default usePinValue;
