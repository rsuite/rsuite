import { useEffect, useRef } from 'react';

export interface UseClickOutsideOptions {
  enabled?: boolean;
  isOutside: (event: MouseEvent) => boolean;
  handle: (event: MouseEvent) => void;
}

export function useClickOutside({ enabled = true, isOutside, handle }: UseClickOutsideOptions) {
  const isOutsideRef = useRef<((event: MouseEvent) => boolean) | null>(isOutside);
  const handleRef = useRef<((event: MouseEvent) => void) | null>(handle);

  useEffect(() => {
    isOutsideRef.current = isOutside;
    handleRef.current = handle;
  }, [isOutside, handle]);

  useEffect(() => {
    if (enabled) {
      const eventHandler = (event: MouseEvent) => {
        if (isOutsideRef.current?.(event)) {
          handleRef.current?.(event);
        }
      };
      window.addEventListener('mousedown', eventHandler);

      return () => {
        window.removeEventListener('mousedown', eventHandler);
      };
    }
  }, [enabled]);
}

export default useClickOutside;
