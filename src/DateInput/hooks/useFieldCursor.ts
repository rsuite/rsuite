import { useCallback, useRef } from 'react';
import { getPatternGroups } from '../utils';
import { useUpdateEffect } from '@/internals/hooks';
export function useFieldCursor<V = Date | null>(format: string, value?: V) {
  const typeCount = useRef(0);

  const increment = useCallback(() => {
    typeCount.current += 1;
  }, []);

  const reset = useCallback(() => {
    typeCount.current = 0;
  }, []);

  const isResetValue = useCallback(() => {
    return typeCount.current === 0;
  }, []);

  // Check if the cursor should move to the next field
  const isMoveCursor = useCallback(
    (value: number, pattern: string) => {
      const patternGroup = getPatternGroups(format, pattern);

      if (value.toString().length === patternGroup.length) {
        return true;
      } else if (pattern === 'y' && typeCount.current === 4) {
        return true;
      } else if (pattern !== 'y' && typeCount.current === 2) {
        return true;
      }

      switch (pattern) {
        case 'M':
          return parseInt(`${value}0`) > 12;
        case 'd':
          return parseInt(`${value}0`) > 31;
        case 'H':
          return parseInt(`${value}0`) > 23;
        case 'h':
          return parseInt(`${value}0`) > 12;
        case 'm':
        case 's':
          return parseInt(`${value}0`) > 59;
        default:
          return false;
      }
    },
    [format]
  );

  useUpdateEffect(() => {
    if (!value) {
      reset();
    }
  }, [value]);

  return { increment, reset, isMoveCursor, isResetValue };
}

export default useFieldCursor;
