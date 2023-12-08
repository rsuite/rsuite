import React, { useState, useCallback, useRef } from 'react';
import Input, { InputProps } from '../Input';
import { mergeRefs, useCustom, useControlled } from '../utils';
import { FormControlBaseProps } from '../@types/common';
import safeSetSelection from '../utils/safeSetSelection';
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
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const { dateFiled, setDateOffset, setDateField, getDateField, toDateString } = useDateInputState(
    formatStr,
    localize,
    value
  );

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
    [selectedState.selectionEnd, selectedState.selectionStart]
  );

  const handleChange = (value: Date, event: React.SyntheticEvent<HTMLInputElement>) => {
    console.log('onChange', value);
    setValue(value);
    onChange?.(value, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const key = event.key;

    const options = { input, formatStr, localize, selectedMonth: dateFiled.month, dateString };

    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      const direction = key === 'ArrowRight' ? 'right' : 'left';
      const selectedState = getInputSelectedState({
        ...options,
        direction
      });

      setSelectedState(selectedState);
      setSelectionRange(selectedState.selectionStart, selectedState.selectionEnd);

      event.preventDefault();
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      const offset = key === 'ArrowUp' ? 1 : -1;

      const selectedState = getInputSelectedState({ ...options, valueOffset: offset });
      setSelectedState(selectedState);

      setDateOffset(selectedState.selectedPattern, offset, date => handleChange(date, event));
      setSelectionRange(selectedState.selectionStart, selectedState.selectionEnd);

      event.preventDefault();
    } else if (key === 'Backspace') {
      if (selectedState.selectedPattern) {
        setDateField(selectedState.selectedPattern, null, date => handleChange(date, event));
        setSelectionRange();
      }
      event.preventDefault();
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
        const nextSelectedState = getInputSelectedState({ ...options, selectedMonth });

        setSelectedState(nextSelectedState);
        setSelectionRange(nextSelectedState.selectionStart, nextSelectedState.selectionEnd);
      }

      event.preventDefault();
    }

    onKeyDown?.(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    const selectedState = getInputSelectedState({
      input,
      formatStr,
      localize,
      selectedMonth: dateFiled.month,
      dateString
    });
    setSelectedState(selectedState);
    setSelectionRange(selectedState.selectionStart, selectedState.selectionEnd);
  };

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
