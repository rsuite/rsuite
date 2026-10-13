import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';

export default function useNativeFormReset(reset: () => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Rebind when a form owner changes, including an explicit form="..." association.
  useIsomorphicLayoutEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;
    const handleReset = (event: Event) => {
      queueMicrotask(() => {
        if (!event.defaultPrevented && inputRef.current === input && input.form === form) reset();
      });
    };
    form.addEventListener('reset', handleReset);
    return () => form.removeEventListener('reset', handleReset);
  });
  return inputRef;
}
