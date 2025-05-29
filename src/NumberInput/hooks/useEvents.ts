import { useRef, useState, useCallback } from 'react';
import { useEventCallback } from '@/internals/hooks';
import { KEY_VALUES } from '@/internals/constants';
import { clampValue, decimals } from '../utils/number';
import { useWheelHandler } from './useWheelHandler';

export interface UseEventsParams {
  value?: number | string | null;
  scrollable: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  decimalSeparator?: string;
  onChangeValue: (currentValue: number | string, event: React.SyntheticEvent) => void;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
}

export function useEvents(params: UseEventsParams) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const {
    value,
    onChangeValue,
    scrollable,
    disabled,
    readOnly,
    onWheel: onWheelProp,
    min,
    max,
    step = 1,
    decimalSeparator
  } = params;

  const getSafeValue = (value: number | string) => clampValue(value, min, max);

  const onStepUp = useEventCallback((event: React.SyntheticEvent) => {
    const val = +(value || 0);
    const bit = decimals(val, step);
    onChangeValue(getSafeValue((val + step).toFixed(bit)), event);
  });

  const onStepDown = useEventCallback((event: React.SyntheticEvent) => {
    const val = +(value || 0);
    const bit = decimals(val, step);
    onChangeValue(getSafeValue((val - step).toFixed(bit)), event);
  });

  const onKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEY_VALUES.UP:
        event.preventDefault();
        onStepUp(event);
        break;
      case KEY_VALUES.DOWN:
        event.preventDefault();
        onStepDown(event);
        break;
      case KEY_VALUES.HOME:
        if (typeof min !== 'undefined') {
          event.preventDefault();
          onChangeValue(getSafeValue(min), event);
        }

        break;
      case KEY_VALUES.END:
        if (typeof max !== 'undefined') {
          event.preventDefault();
          onChangeValue(getSafeValue(max), event);
        }
        break;
      default:
        break;
    }
  });

  const handleWheel = useEventCallback((event: React.WheelEvent<HTMLInputElement>) => {
    if (!scrollable) {
      event.preventDefault();
      return;
    }
    if (!disabled && !readOnly && event.target === document.activeElement) {
      event.preventDefault();
      const delta: number = (event as any).wheelDelta || -event.deltaY || -event.detail;
      if (delta > 0) {
        onStepDown(event);
      }
      if (delta < 0) {
        onStepUp(event);
      }
    }
    onWheelProp?.(event);
  });

  const restoreDecimalSeparator = useCallback(
    (value: string) => {
      if (decimalSeparator && value) {
        // Handle both custom decimalSeparator and standard decimal point '.'
        if (decimalSeparator !== '.') {
          // Create a regex that matches both the custom separator and '.'
          const separatorRegex = new RegExp(
            `[${decimalSeparator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}.]`,
            'g'
          );
          return value.replace(separatorRegex, '.');
        }
        return value;
      }
      return value;
    },
    [decimalSeparator]
  );

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = restoreDecimalSeparator(event.target?.value);

    const targetValue = Number.parseFloat(value);
    onChangeValue(getSafeValue(targetValue), event);
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  // wheel events
  useWheelHandler(inputRef, handleWheel, scrollable);

  return { inputRef, isFocused, onStepUp, onStepDown, onKeyDown, onBlur, onFocus };
}
