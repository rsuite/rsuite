import { useCallback, useRef } from 'react';
import type { RefObject } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { retainPointerValidation } from '../utils/pointerValidation';
import useFormEventCallback from './useFormEventCallback';

export default function usePointerBlurValidation(
  root: RefObject<HTMLFormElement | null>,
  reserve: (fieldName: string) => () => boolean
) {
  const connection = useRef<ReturnType<typeof retainPointerValidation>>(undefined);
  const document = useRef<Document | undefined>(undefined);
  const pending = useRef(new Map<object, () => void>());

  const dispose = useCallback(() => {
    pending.current.forEach(cancel => cancel());
    connection.current?.release();
    connection.current = undefined;
    document.current = undefined;
  }, []);

  useIsomorphicLayoutEffect(() => {
    const next = root.current?.ownerDocument;
    if (next !== document.current) {
      dispose();
      document.current = next;
      connection.current = next ? retainPointerValidation(next) : undefined;
    }
  });
  useIsomorphicLayoutEffect(() => dispose, [dispose]);

  return useFormEventCallback((fieldName: string, validate: () => void) => {
    const current = connection.current;
    if (!current?.isPressing()) {
      validate();
      return () => {};
    }

    const isCurrent = reserve(fieldName);
    const token = {};
    const remove = current.enqueue(() => {
      pending.current.delete(token);
      if (isCurrent()) validate();
    });
    const cancel = () => {
      remove();
      pending.current.delete(token);
    };
    pending.current.set(token, cancel);
    return cancel;
  });
}
