import React, { useMemo } from 'react';
import { useCustom } from './';

interface FormattedNumberProps {
  value: number;
  formatOptions?: Intl.NumberFormatOptions;
}

export function FormattedNumber({ value, formatOptions }: FormattedNumberProps) {
  const { code } = useCustom();

  const formatter = useMemo(
    () => new Intl.NumberFormat(code, formatOptions),
    [code, formatOptions]
  );

  return <React.Fragment>{formatter.format(value)}</React.Fragment>;
}
