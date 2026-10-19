import React, { useRef, useMemo } from 'react';
import Input, { InputProps } from '../Input';
import useDateInputState from './hooks/useDateInputState';
import useKeyboardInputEvent from './hooks/useKeyboardInputEvent';
import useIsFocused from './hooks/useIsFocused';
import useFieldCursor from './hooks/useFieldCursor';
import useSelectedState from './hooks/useSelectedState';
import useDateInputSelection from './hooks/useDateInputSelection';
import { useControlled, useEventCallback, useCustom } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { isValid } from '@/internals/utils/date';
import { getInputSelectedState, validateDateTime } from './utils';
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

  const inputRef = useRef<HTMLInputElement>(null);
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

  const { setSelectionRange, resolveKeyboardSelection, invalidate } =
    useDateInputSelection(inputRef);

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
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      nextDirection?: 'right' | 'left',
      selectionRange = resolveKeyboardSelection(),
      selectedMonth = dateField.month,
      dateString = keyPressOptions.dateString
    ) => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');

      const state = getInputSelectedState({
        ...keyPressOptions,
        input,
        direction,
        selectionRange,
        selectedMonth,
        dateString
      });

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

    const state = getInputSelectedState({
      ...keyPressOptions,
      input,
      selectionRange: resolveKeyboardSelection(),
      valueOffset: offset
    });

    setSelectedState(state);
    setDateOffset(state.selectedPattern, offset, date => handleChange(date, event));
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });

  const onSegmentValueChangeWithNumericKeys = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const isFunctionKey = key.startsWith('F') && !isNaN(Number(key.slice(1)));

      if (isFunctionKey) {
        return;
      }

      const currentSelection = resolveKeyboardSelection();
      const currentState = getInputSelectedState({
        ...keyPressOptions,
        input,
        selectionRange: currentSelection
      });
      const pattern = currentState.selectedPattern;
      if (!pattern) {
        return;
      }

      if (currentState.selectedPattern !== selectedState.selectedPattern) reset();

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
      const nextDateString = toDateString(field.name, newValue);
      const nextState = getInputSelectedState({
        ...keyPressOptions,
        input,
        selectionRange: currentState,
        selectedMonth,
        dateString: nextDateString
      });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      increment();

      // If the field is full value, move the cursor to the next field
      if (isMoveCursor(newValue, pattern) && currentState.selectionEnd !== dateString.length) {
        onSegmentChange(event, 'right', nextState, selectedMonth, nextDateString);
      }
    }
  );

  const onSegmentValueRemove = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // If the text is all selected, clear the value
    if (input.selectionStart === 0 && value && input.selectionEnd === value.length) {
      handleClear(event);
    } else {
      const nextState = getInputSelectedState({
        ...keyPressOptions,
        input,
        selectionRange: resolveKeyboardSelection(),
        valueOffset: null
      });

      if (!nextState.selectedPattern) return;

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      setDateField(nextState.selectedPattern, null, date => handleChange(date, event));

      reset();
    }
  });

  const onAmPmToggle = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const key = event.key.toLowerCase();

    // Only handle 'a' or 'p' keys when the selected pattern is 'a' (AM/PM)
    if (selectedState.selectedPattern === 'a' && (key === 'a' || key === 'p')) {
      const currentHour = dateField.hour || 0;
      const isAM = currentHour < 12;
      const isPM = currentHour >= 12;

      // Toggle AM/PM based on the key pressed
      // 'a' key -> set to AM, 'p' key -> set to PM
      if ((key === 'a' && isPM) || (key === 'p' && isAM)) {
        const state = getInputSelectedState({
          ...keyPressOptions,
          input,
          selectionRange: resolveKeyboardSelection()
        });
        setSelectedState(state);
        setDateOffset('a', 1, date => handleChange(date, event));
        setSelectionRange(state.selectionStart, state.selectionEnd);
      }
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
    onAmPmToggle,
    onKeyDown: event => {
      onKeyDown?.(event);
      if (
        !event.defaultPrevented &&
        (event.key === 'Home' ||
          event.key === 'End' ||
          ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a'))
      ) {
        invalidate();
      }
    }
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
