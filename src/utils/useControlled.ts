import React, { useRef, useState, useCallback } from 'react';

/**
 * A hook for controlled value management.
 * In the case of passing the controlled value, the controlled value is returned, otherwise the value in state is returned.
 * Generally used for a component including controlled and uncontrolled modes.
 * @param controlledValue
 * @param defaultValue
 */
function useControlled<T = any>(
  controlledValue: T,
  defaultValue: T
): [T, (value: React.SetStateAction<T>) => void, boolean] {
  const { current: isControlled } = useRef(controlledValue !== undefined);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: React.SetStateAction<T>) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [isControlled]
  );

  return [value, setValue, isControlled];
}

export default useControlled;
