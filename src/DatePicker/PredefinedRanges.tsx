import React, { useCallback, useState } from 'react';
import Button from '../Button';
import Stack, { StackProps } from '../Stack';
import { useUpdateEffect } from '../utils';
import { getDefaultRanges, getRanges } from './utils';
import { InnerRange, RangeType } from './types';
import { CalendarLocale } from '../locales';

export interface PredefinedRangesProps<T = any, Shortcut = T> extends StackProps {
  ranges?: RangeType<Shortcut>[];
  calendarDate: T;
  locale: CalendarLocale;
  disabledShortcut?: (value: T) => boolean;
  onClickShortcut?: (value: Shortcut, closeOverlay: boolean, event: React.MouseEvent) => void;
}

const PredefinedRanges = React.forwardRef<HTMLDivElement, PredefinedRangesProps>((props, ref) => {
  const {
    className,
    disabledShortcut,
    onClickShortcut,
    calendarDate,
    ranges: rangesProp,
    locale,
    ...rest
  } = props;
  const [ranges, setRanges] = useState<InnerRange<any>[]>(getRanges(props));

  useUpdateEffect(() => {
    setRanges(getRanges({ ranges: rangesProp, calendarDate }));
  }, [calendarDate, rangesProp]);

  const hasLocaleKey = useCallback(
    (key: React.ReactNode) => getDefaultRanges(calendarDate).some(item => item.label === key),
    [calendarDate]
  );

  if (ranges.length === 0) {
    return null;
  }

  return (
    <Stack className={className} ref={ref} alignItems="flex-start" spacing={4} {...rest}>
      {ranges.map(({ value, closeOverlay, label, ...rest }, index: number) => {
        const disabled = disabledShortcut?.(value);

        const handleClickShortcut = (event: React.MouseEvent) => {
          if (disabled) {
            return;
          }
          onClickShortcut?.(value, closeOverlay !== false ? true : false, event);
        };

        return (
          <Button
            appearance="link"
            size="sm"
            key={index}
            disabled={disabled}
            onClick={handleClickShortcut}
            {...rest}
          >
            {hasLocaleKey(label) && typeof label === 'string' ? locale?.[label] : label}
          </Button>
        );
      })}
    </Stack>
  );
});

export default PredefinedRanges;
