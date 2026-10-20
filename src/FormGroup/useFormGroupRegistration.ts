import { useContext, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { FormGroupContext } from './FormGroupContext';

export function useFormGroupRegistration(part: 'label' | 'helpText', id?: string) {
  const { register } = useContext(FormGroupContext);
  const token = useRef({});
  useIsomorphicLayoutEffect(() => {
    const currentToken = token.current;
    register?.(part, currentToken, id);
    return () => register?.(part, currentToken, undefined);
  }, [register, part, id]);
}
