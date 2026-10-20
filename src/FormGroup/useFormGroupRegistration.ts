import { useCallback, useContext, useRef } from 'react';
import { FormGroupContext } from './FormGroupContext';

export function useFormGroupRegistration(part: 'label' | 'helpText', id?: string) {
  const { register } = useContext(FormGroupContext);
  const token = useRef({});
  return useCallback(
    (element: HTMLElement | null) => {
      register?.(part, token.current, element);
    },
    [register, part, id]
  );
}
