import React, { useRef, useMemo } from 'react';
import Input, { InputProps } from '../Input';
import useDateInputState from './hooks/useDateInputState';
import useKeyboardInputEvent from './hooks/useKeyboardInputEvent';
import useIsFocused from './hooks/useIsFocused';
import useFieldCursor from './hooks/useFieldCursor';
import useSelectedState from './hooks/useSelectedState';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { isValid } from '@/internals/utils/date';
import { getInputSelectedState, validateDateTime, useInputSelection } from './utils';
import { useCustom } from '../CustomProvider';
import type { FormControlBaseProps } from '@/internals/types';

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
const DateInput = forwardRef<typeof Input, DateInputProps>((props, ref) => {
  const { propsWithDefaults, parseDate, getLocale } = useCustom('DateInput', props);
  const { dateLocale, shortDateFormat } = getLocale('DateTimeFormats');
  const {
    format: formatStr = shortDateFormat,
    value: valueProp,
    defaultValue,
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    onPaste,
    ...rest
  } = propsWithDefaults;

  const inputRef = useRef<HTMLInputElement>();
  const { selectedState, setSelectedState } = useSelectedState();

  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
  const {
    dateField,
    setDateOffset,
    setDateField,
    setNewDate,
    getDateField,
    toDateString,
    isEmptyValue
  } = useDateInputState({
    formatStr,
    locale: dateLocale,
    date: value,
    isControlledDate: isControlled
  });

  const { isMoveCursor, isResetValue, increment, reset } = useFieldCursor(formatStr, valueProp);

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

  const setSelectionRange = useInputSelection(inputRef);

  const handleChange = useEventCallback(
    (value: Date | null, event: React.SyntheticEvent<HTMLInputElement>) => {
      onChange?.(value, event);
      setValue(value);
    }
  );

  const handleClear = useEventCallback((event: React.SyntheticEvent<HTMLInputElement>) => {
    handleChange(null, event);
    setNewDate(null);
    setSelectionRange(0, 0);
    reset();
  });

  const onSegmentChange = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nextDirection?: 'right' | 'left') => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');

      const state = getInputSelectedState({ ...keyPressOptions, input, direction });

      setSelectedState(state);
      setSelectionRange(state.selectionStart, state.selectionEnd);

      // If the selected field changes, reset the input state
      if (selectedState.selectedPattern !== state.selectedPattern) {
        reset();
      }
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

      if (validateDateTime(field.name, padValue) && !isResetValue()) {
        // Check if the value entered by the user is a valid date
        newValue = padValue;
      }

      setDateField(pattern, newValue, date => handleChange(date, event));

      // The currently selected month will be retained as a parameter of getInputSelectedState,
      // but if the user enters a month, the month value will be replaced with the value entered by the user.
      const selectedMonth = pattern === 'M' ? newValue : dateField.month;
      const nextState = getInputSelectedState({ ...keyPressOptions, input, selectedMonth });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      increment();

      // If the field is full value, move the cursor to the next field
      if (isMoveCursor(newValue, pattern) && input.selectionEnd !== input.value.length) {
        onSegmentChange(event, 'right');
      }
    }
  );

  const onSegmentValueRemove = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // If the text is all selected, clear the value
    if (input.selectionStart === 0 && value && input.selectionEnd === value.length) {
      handleClear(event);
    } else if (selectedState.selectedPattern) {
      const nextState = getInputSelectedState({ ...keyPressOptions, input, valueOffset: null });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      setDateField(selectedState.selectedPattern, null, date => handleChange(date, event));

      reset();
    }
  });

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const state = getInputSelectedState({ ...keyPressOptions, input });

    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);

    if (selectedState.selectedPattern !== state.selectedPattern) {
      reset();
    }
  });

  const handlePaste = useEventCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasteText = event.clipboardData?.getData('text');
    const nextDate = parseDate(pasteText, formatStr);

    if (isValid(nextDate)) {
      handleChange(nextDate, event);
      setNewDate(nextDate);
    }

    onPaste?.(event);
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
      onPaste={handlePaste}
      value={renderedValue}
      placeholder={placeholder || formatStr}
      {...focusEventProps}
      {...rest}
    />
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
