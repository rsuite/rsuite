import React, { useState, useRef, useMemo } from 'react';
import Input, { InputProps } from '../Input';
import {
  mergeRefs,
  useCustom,
  useControlled,
  useEventCallback,
  safeSetSelection,
  createChainedFunction
} from '../utils';
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

  /**
   * The `placeholder` prop defines the text displayed in a form control when the control has no value.
   */
  placeholder?: string;
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
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
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

  const dateLocale = locale.dateLocale;
  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
  const [focused, setFocused] = useState(false);
  const { dateField, setDateOffset, setDateField, getDateField, toDateString, isEmptyValue } =
    useDateInputState({
      formatStr,
      locale: dateLocale,
      date: value,
      isControlledDate: isControlled
    });

  const dateString = toDateString();
  const keyPressOptions = useMemo(
    () => ({
      formatStr,
      localize: dateLocale.localize,
      selectedMonth: dateField.month,
      dateString
    }),
    [dateField, dateString, formatStr, dateLocale]
  );

  const setSelectionRange = (
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
  };

  const handleChange = useEventCallback(
    (value: Date | null, event: React.SyntheticEvent<HTMLInputElement>) => {
      onChange?.(value, event);
      setValue(value);
    }
  );

  const handleChangeField = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nextDirection?: 'right' | 'left') => {
      const input = event.target as HTMLInputElement;
      const direction = nextDirection || (event.key === 'ArrowRight' ? 'right' : 'left');
      const state = getInputSelectedState({ ...keyPressOptions, input, direction });

      setSelectionRange(state.selectionStart, state.selectionEnd);
      setSelectedState(state);
    }
  );

  const handleChangeFieldValue = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const key = event.key;
      const input = event.target as HTMLInputElement;
      const offset = key === 'ArrowUp' ? 1 : -1;

      const state = getInputSelectedState({ ...keyPressOptions, input, valueOffset: offset });

      setSelectedState(state);
      setDateOffset(state.selectedPattern, offset, date => handleChange(date, event));
      setSelectionRange(state.selectionStart, state.selectionEnd);
    }
  );

  const isFieldFullValue = (value: number, pattern: string) => {
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
  };
  const handleChangeFieldValueWithNumericKeys = useEventCallback(
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
    }
  );

  const handleRemoveFieldValue = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (selectedState.selectedPattern) {
        const input = event.target as HTMLInputElement;
        const nextState = getInputSelectedState({ ...keyPressOptions, input, valueOffset: null });

        setSelectedState(nextState);
        setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

        setDateField(selectedState.selectedPattern, null, date => handleChange(date, event));
      }
    }
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

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const state = getInputSelectedState({ ...keyPressOptions, input });

    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });

  const renderedValue = useMemo(() => {
    if (!isEmptyValue()) {
      return dateString;
    }

    return !focused ? '' : dateString;
  }, [dateString, focused, isEmptyValue]);

  return (
    <Input
      inputMode="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      ref={mergeRefs(inputRef, ref)}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      value={renderedValue}
      placeholder={placeholder || formatStr}
      onFocus={createChainedFunction(
        onFocus,
        useEventCallback(() => setFocused(true))
      )}
      onBlur={createChainedFunction(
        onBlur,
        useEventCallback(() => setFocused(false))
      )}
      {...rest}
    />
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
