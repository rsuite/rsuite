import React, { useCallback, useState } from 'react';
import Button from '../Button';
import Stack, { StackProps } from '../Stack';
import { useUpdateEffect } from '@/internals/hooks';
import { getDefaultRanges, getRanges } from './utils';
import type { InnerRange } from './types';
import type { CalendarLocale } from '../locales';
import type { DateOptionPreset } from '@/internals/types';

export interface PredefinedRangesProps<T = any, Shortcut = T> extends StackProps {
  ranges?: DateOptionPreset<Shortcut>[];
  calendarDate: T;
  locale?: CalendarLocale;
  disableShortcut?: (value: T) => boolean;
  onShortcutClick?: (
    range: InnerRange<Shortcut>,
    closeOverlay: boolean,
    event: React.MouseEvent
  ) => void;
}

const PredefinedRanges = React.forwardRef<HTMLDivElement, PredefinedRangesProps>(
  function PredefinedRanges(props, ref) {
    const {
      className,
      disableShortcut,
      onShortcutClick,
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
        {ranges.map((range, index: number) => {
          const { value, closeOverlay, label, ...rest } = range;
          const disabled = disableShortcut?.(value);

          const handleClickShortcut = (event: React.MouseEvent) => {
            if (disabled) {
              return;
            }
            onShortcutClick?.(range, closeOverlay !== false ? true : false, event);
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
  }
);

export default PredefinedRanges;
