import { useMemo, useCallback } from 'react';
import isNil from 'lodash/isNil';

export interface UseNumberInputValueParams {
  value?: number | string | null;
  isFocused: boolean;
  formatter?: (value: number | string) => string;
  decimalSeparator?: string;
}

export function useNumberInputValue(params: UseNumberInputValueParams): string | number {
  const { value, isFocused, formatter, decimalSeparator } = params;

  const replaceDecimalSeparator = useCallback(
    (val: number | string) => {
      if (decimalSeparator && val != null) {
        return val.toString().replace('.', decimalSeparator);
      }
      return val;
    },
    [decimalSeparator]
  );

  return useMemo<string | number>(() => {
    if (isNil(value)) {
      return '';
    }

    if (isFocused) {
      return replaceDecimalSeparator(value);
    }

    if (formatter) {
      return formatter(value);
    }

    return replaceDecimalSeparator(value);
  }, [formatter, isFocused, replaceDecimalSeparator, value]);
}
