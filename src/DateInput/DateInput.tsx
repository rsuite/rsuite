import React, { useState, useCallback, useRef } from 'react';
import Input, { InputProps } from '../Input';
import { mergeRefs, useCustom, useControlled, safeSetSelection } from '../utils';
import { FormControlBaseProps } from '../@types/common';
import { getInputSelectedState, validateDateTime } from './utils';
import useDateInputState from './useDateInputState';

export interface DateInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'defaultValue'>,
    FormControlBaseProps<Date | null> {
  /**
   * Format of the date when rendered in the input.
   * Format of the string is based on Unicode Technical Standard: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   * @default 'yyyy-MM-dd'
   **/
  format?: string;
}

/**
 * The DateInput component lets users select a date with the keyboard.
 * @version 5.58.0
 * @see https://rsuitejs.com/components/date-picker/
 */
const DateInput = React.forwardRef((props: DateInputProps, ref) => {
  const {
    format: formatStr = 'yyyy-MM-dd',
    value: valueProp,
    defaultValue,
    onChange,
    onKeyDown,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>();

  const [selectedState, setSelectedState] = useState<{
    selectedPattern: string;
    selectionStart: number;
    selectionEnd: number;
  }>({
    selectedPattern: 'y',
    selectionStart: 0,
    selectionEnd: 0
  });

  const { locale } = useCustom('Calendar');
  const localize = locale.dateLocale.localize;
  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
  const { dateFiled, setDateOffset, setDateField, getDateField, toDateString } = useDateInputState({
    formatStr,
    localize,
    date: value,
    isControlledDate: isControlled
  });

  const dateString = toDateString();

  const setSelectionRange = useCallback(
    (
      selectionStart: number = selectedState.selectionStart,
      selectionEnd: number = selectedState.selectionEnd
    ) => {
      requestAnimationFrame(() => {
        safeSetSelection(inputRef?.current as HTMLInputElement, selectionStart, selectionEnd);
      });
    },
    [selectedState]
  );

  const handleChange = useCallback(
    (value: Date, event: React.SyntheticEvent<HTMLInputElement>) => {
      setValue(value);
      onChange?.(value, event);
    },
    [onChange, setValue]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const key = event.key;

    const options = { input, formatStr, localize, selectedMonth: dateFiled.month, dateString };

    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      const direction = key === 'ArrowRight' ? 'right' : 'left';
      const state = getInputSelectedState({ ...options, direction });

      setSelectedState(state);
      setSelectionRange(state.selectionStart, state.selectionEnd);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      const offset = key === 'ArrowUp' ? 1 : -1;

      const state = getInputSelectedState({ ...options, valueOffset: offset });

      setSelectedState(state);
      setDateOffset(state.selectedPattern, offset, date => handleChange(date, event));
      setSelectionRange(state.selectionStart, state.selectionEnd);
    } else if (key === 'Backspace') {
      if (selectedState.selectedPattern) {
        setDateField(selectedState.selectedPattern, null, date => handleChange(date, event));
        setSelectionRange();
      }
    } else if (key.match(/\d/)) {
      const pattern = selectedState.selectedPattern;
      if (pattern) {
        const field = getDateField(pattern);
        const value = parseInt(key, 10);
        const padValue = parseInt(`${field.value || ''}${key}`, 10);

        let newValue = value;

        if (validateDateTime(field.name, padValue)) {
          newValue = padValue;
        }

        if (pattern === 'M') {
          newValue = Math.max(1, newValue);
        }

        setDateField(pattern, newValue, date => handleChange(date, event));

        const selectedMonth = pattern === 'M' ? newValue : dateFiled.month;
        const nextState = getInputSelectedState({ ...options, selectedMonth });

        setSelectedState(nextState);
        setSelectionRange(nextState.selectionStart, nextState.selectionEnd);
      }
    }

    event.preventDefault();
    onKeyDown?.(event);
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const state = getInputSelectedState({
        input,
        formatStr,
        localize,
        selectedMonth: dateFiled.month,
        dateString
      });

      setSelectedState(state);
      setSelectionRange(state.selectionStart, state.selectionEnd);
    },
    [dateFiled, dateString, formatStr, localize, setSelectionRange]
  );

  return (
    <Input
      inputMode="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      ref={mergeRefs(inputRef, ref)}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      value={dateString}
      {...rest}
    />
  );
});

export default DateInput;
