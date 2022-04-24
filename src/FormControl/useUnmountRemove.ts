import { useEffect, useRef } from 'react';

function useUnmountResetForm(
  unMountRemove: boolean,
  name: string,
  removeFieldError?: (n: string) => void,
  removeFieldValue?: (n: string) => void
) {
  const removeValueRef = useRef<(n: string) => void>();
  const removeErrorRef = useRef<(n: string) => void>();
  useEffect(() => {
    removeValueRef.current = removeFieldValue;
    removeErrorRef.current = removeFieldError;
  }, [removeFieldError, removeFieldValue]);
  useEffect(() => {
    return () => {
      if (removeValueRef.current && removeErrorRef.current && unMountRemove) {
        removeValueRef.current(name);
        removeErrorRef.current(name);
      }
    };
  }, [name, unMountRemove]);
}

export default useUnmountResetForm;
