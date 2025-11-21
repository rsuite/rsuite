import { useRef, useCallback, useEffect } from 'react';

/**
 * A hook that manages the refs and focus behavior for a PIN input component
 */
export const usePinInputRefs = (length: number, autoFocus?: boolean) => {
  // Create ref to store input elements
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Initialize the refs array when length changes
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto focus the first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  // Focus a specific input by index
  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length && inputRefs.current[index]) {
        inputRefs.current[index]?.focus();
        return true;
      }
      return false;
    },
    [length]
  );

  // Focus the next input
  const focusNextInput = useCallback(
    (currentIndex: number) => {
      return focusInput(currentIndex + 1);
    },
    [focusInput]
  );

  // Focus the previous input
  const focusPrevInput = useCallback(
    (currentIndex: number) => {
      return focusInput(currentIndex - 1);
    },
    [focusInput]
  );

  // Get ref setter for an input
  const getRefSetter = useCallback((index: number) => {
    return (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    };
  }, []);

  return {
    inputRefs,
    focusInput,
    focusNextInput,
    focusPrevInput,
    getRefSetter
  };
};

export default usePinInputRefs;
