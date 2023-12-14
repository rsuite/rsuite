import React, { useState, useCallback, useRef, useMemo } from 'react';
import Input, { InputProps } from '../Input';
import { mergeRefs, useCustom, useControlled, safeSetSelection } from '../utils';
import { FormControlBaseProps } from '../@types/common';
import { getInputSelectedState, validateDateTime, getPatternGroups } from './utils';
import useDateInputState from './useDateInputState';

const isTestEnvironment = process.env.RUN_ENV === 'test';

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
 * @see https://rsuitejs.com/components/date-input/
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
  const { dateField, setDateOffset, setDateField, getDateField, toDateString } = useDateInputState({
    formatStr,
    localize,
    date: value,
    isControlledDate: isControlled
  });

  const dateString = toDateString();
  const keyPressOptions = useMemo(
    () => ({ formatStr, localize, selectedMonth: dateField.month, dateString }),
    [dateField, dateString, formatStr, localize]
  );

  const setSelectionRange = useCallback(
    (
      selectionStart: number = selectedState.selectionStart,
      selectionEnd: number = selectedState.selectionEnd
    ) => {
      const input = inputRef?.current as HTMLInputElement;

      if (isTestEnvironment) {
        safeSetSelection(input, selectionStart, selectionEnd);
        return;
      }

      requestAnimationFrame(() => {
        safeSetSelection(input, selectionStart, selectionEnd);
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

  const handleChangeField = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nextDirection?: 'right' | 'left') => {
      const input = event.target as HTMLInputElement;
      const direction = nextDirection || (event.key === 'ArrowRight' ? 'right' : 'left');
      const state = getInputSelectedState({ ...keyPressOptions, input, direction });

      setSelectionRange(state.selectionStart, state.selectionEnd);
      setSelectedState(state);
    },
    [keyPressOptions, setSelectionRange]
  );

  const handleChangeFieldValue = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const key = event.key;
      const input = event.target as HTMLInputElement;
      const offset = key === 'ArrowUp' ? 1 : -1;

      const state = getInputSelectedState({ ...keyPressOptions, input, valueOffset: offset });

      setSelectedState(state);
      setDateOffset(state.selectedPattern, offset, date => handleChange(date, event));
      setSelectionRange(state.selectionStart, state.selectionEnd);
    },
    [handleChange, keyPressOptions, setDateOffset, setSelectionRange]
  );

  const isFieldFullValue = useCallback(
    (value: number, pattern: string) => {
      const patternGroup = getPatternGroups(formatStr, pattern);

      if (value.toString().length === patternGroup.length) {
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
    [formatStr]
  );

  const handleChangeFieldValueWithNumericKeys = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const key = event.key;
      const input = event.target as HTMLInputElement;
      const pattern = selectedState.selectedPattern;
      if (!pattern) {
        return;
      }

      const field = getDateField(pattern);
      const value = parseInt(key, 10);
      const padValue = parseInt(`${field.value || ''}${key}`, 10);

      let newValue = value;

      // Check if the value entered by the user is a valid date
      if (validateDateTime(field.name, padValue)) {
        newValue = padValue;
      }

      if (pattern === 'M') {
        // Month cannot be less than 1.
        newValue = Math.max(1, newValue);
      }

      setDateField(pattern, newValue, date => handleChange(date, event));

      // The currently selected month will be retained as a parameter of getInputSelectedState,
      // but if the user enters a month, the month value will be replaced with the value entered by the user.
      const selectedMonth = pattern === 'M' ? newValue : dateField.month;
      const nextState = getInputSelectedState({ ...keyPressOptions, input, selectedMonth });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      // If the field is full value, move the cursor to the next field
      if (isFieldFullValue(newValue, pattern) && input.selectionEnd !== input.value.length) {
        handleChangeField(event, 'right');
      }
    },
    [
      dateField,
      getDateField,
      handleChange,
      handleChangeField,
      isFieldFullValue,
      keyPressOptions,
      selectedState.selectedPattern,
      setDateField,
      setSelectionRange
    ]
  );

  const handleRemoveFieldValue = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (selectedState.selectedPattern) {
        setDateField(selectedState.selectedPattern, null, date => handleChange(date, event));
        setSelectionRange();
      }
    },
    [handleChange, selectedState, setDateField, setSelectionRange]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    switch (key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        handleChangeField(event);
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        handleChangeFieldValue(event);
        event.preventDefault();
        break;
      case 'Backspace':
        handleRemoveFieldValue(event);
        event.preventDefault();
        break;
      case key.match(/\d/)?.input:
        handleChangeFieldValueWithNumericKeys(event);
        event.preventDefault();
        break;
    }

    onKeyDown?.(event);
  };

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const state = getInputSelectedState({ ...keyPressOptions, input });

      setSelectedState(state);
      setSelectionRange(state.selectionStart, state.selectionEnd);
    },
    [keyPressOptions, setSelectionRange]
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

DateInput.displayName = 'DateInput';

export default DateInput;
