import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input, { InputProps } from '../Input';
import { mergeRefs, useCustom, useControlled, useEventCallback } from '../utils';
import { FormControlBaseProps } from '../@types/common';
import {
  getInputSelectedState,
  validateDateTime,
  isFieldFullValue,
  useInputSelection
} from './utils';

import useDateInputState from './useDateInputState';
import useKeyboardInputEvent from './useKeyboardInputEvent';
import useIsFocused from './useIsFocused';

export interface DateInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'defaultValue'>,
    FormControlBaseProps<Date | null> {
  /**
   * Format of the date when rendered in the input. Format of the string is based on Unicode Technical Standard.
   *
   * @see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
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

  const handleChange = useEventCallback(
    (value: Date | null, event: React.SyntheticEvent<HTMLInputElement>) => {
      onChange?.(value, event);
      setValue(value);
    }
  );

  const setSelectionRange = useInputSelection(inputRef);

  const onSegmentChange = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nextDirection?: 'right' | 'left') => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');

      const state = getInputSelectedState({ ...keyPressOptions, input, direction });

      setSelectionRange(state.selectionStart, state.selectionEnd);
      setSelectedState(state);
    }
  );

  const onSegmentValueChange = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const key = event.key;
    const offset = key === 'ArrowUp' ? 1 : -1;

    const state = getInputSelectedState({ ...keyPressOptions, input, valueOffset: offset });

    setSelectedState(state);
    setDateOffset(state.selectedPattern, offset, date => handleChange(date, event));
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });

  const onSegmentValueChangeWithNumericKeys = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const key = event.key;

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
      if (
        isFieldFullValue(formatStr, newValue, pattern) &&
        input.selectionEnd !== input.value.length
      ) {
        onSegmentChange(event, 'right');
      }
    }
  );

  const onSegmentValueRemove = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (selectedState.selectedPattern) {
      const nextState = getInputSelectedState({ ...keyPressOptions, input, valueOffset: null });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      setDateField(selectedState.selectedPattern, null, date => handleChange(date, event));
    }
  });

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const state = getInputSelectedState({ ...keyPressOptions, input });

    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });

  const onKeyboardInput = useKeyboardInputEvent({
    onSegmentChange,
    onSegmentValueChange,
    onSegmentValueChangeWithNumericKeys,
    onSegmentValueRemove,
    onKeyDown
  });

  const [focused, focusEventProps] = useIsFocused({ onBlur, onFocus });

  const renderedValue = useMemo(() => {
    if (!isEmptyValue()) {
      return dateString;
    }

    return !focused ? '' : dateString;
  }, [dateString, focused, isEmptyValue]);

  return (
    <Input
      inputMode={focused ? 'numeric' : 'text'}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      ref={mergeRefs(inputRef, ref)}
      onKeyDown={onKeyboardInput}
      onClick={handleClick}
      value={renderedValue}
      placeholder={placeholder || formatStr}
      {...focusEventProps}
      {...rest}
    />
  );
});

DateInput.displayName = 'DateInput';
DateInput.propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default DateInput;
