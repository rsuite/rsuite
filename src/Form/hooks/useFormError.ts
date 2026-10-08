import { useCallback, useInsertionEffect, useRef, useState } from 'react';

export default function useFormError(controlledError: any) {
  const [uncontrolledError, setUncontrolledError] = useState({});
  const controlled = controlledError !== undefined;
  const formError = controlled ? controlledError : uncontrolledError;
  const formErrorRef = useRef(formError);
  const controlledRef = useRef(controlled);

  // Publish committed ownership before child layout callbacks, without exposing suspended renders.
  useInsertionEffect(() => {
    formErrorRef.current = formError;
    controlledRef.current = controlled;
  });

  const isControlled = useCallback(() => controlledRef.current, []);
  const setFormError = useCallback((nextFormError: any) => {
    if (controlledRef.current) return;
    formErrorRef.current = nextFormError;
    setUncontrolledError(nextFormError);
  }, []);

  return { formError, formErrorRef, isControlled, setFormError };
}
