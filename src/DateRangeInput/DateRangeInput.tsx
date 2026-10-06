import React, { useState, useRef, useMemo } from 'react';
import Input, { InputProps } from '../Input';
import { isValid } from '@/internals/utils/date';
import { useStyles, useCustom, useControlled, useEventCallback } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import {
  validateDateTime,
  useDateInputState,
  useKeyboardInputEvent,
  useIsFocused,
  useSelectedState,
  useFieldCursor
} from '../DateInput';
import { getInputSelectedState, DateType, getDateType, isSwitchDateType } from './utils';
import useDateInputSelection from '../DateInput/hooks/useDateInputSelection';
import type { FormControlBaseProps } from '@/internals/types';

type ValueType = [Date | null, Date | null] | null;

export interface DateRangeInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'defaultValue'>,
    FormControlBaseProps<ValueType> {
  /**
   * The character between the start and end dates.
   * @default ' ~ '
   **/
  character?: string;

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
 * The DateRangeInput component lets users select a date with the keyboard.
 * @version 5.59.0
 * @see https://rsuitejs.com/components/date-range-input/
 */
const DateRangeInput = React.forwardRef((props: DateRangeInputProps, ref) => {
  const { propsWithDefaults, parseDate, getLocale } = useCustom('Calendar', props);
  const { shortDateFormat, dateLocale } = getLocale('DateTimeFormats');

  const {
    className,
    classPrefix = 'date-range-input',
    character = ' ~ ',
    format: formatStr = shortDateFormat,
    value: valueProp,
    defaultValue = [],
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    onPaste,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const inputRef = useRef<HTMLInputElement>(null);

  const { selectedState, setSelectedState } = useSelectedState();

  const rangeFormatStr = `${formatStr}${character}${formatStr}`;

  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
  const [dateType, setDateType] = useState<DateType>(DateType.Start);

  const dateInputOptions = { formatStr, locale: dateLocale, isControlledDate: isControlled };

  const startDateState = useDateInputState({ ...dateInputOptions, date: value?.[0] || null });
  const endDateState = useDateInputState({ ...dateInputOptions, date: value?.[1] || null });

  const { isMoveCursor, isResetValue, increment, reset } = useFieldCursor<ValueType>(
    formatStr,
    valueProp
  );

  const getActiveState = (type: DateType = dateType) => {
    return type === DateType.Start ? startDateState : endDateState;
  };

  const [focused, focusEventProps] = useIsFocused({ onBlur, onFocus });

  const renderedValue = useMemo(() => {
    const dateString = startDateState.toDateString() + character + endDateState.toDateString();
    if (!startDateState.isEmptyValue() || !endDateState.isEmptyValue()) {
      return dateString;
    }

    return !focused ? '' : dateString;
  }, [character, endDateState, focused, startDateState]);

  const keyPressOptions = {
    formatStr,
    rangeFormatStr,
    localize: dateLocale.localize,
    selectedMonth: getActiveState().dateField.month,
    dateString: renderedValue,
    dateType,
    character
  };

  const { setSelectionRange, resolveKeyboardSelection, invalidate } =
    useDateInputSelection(inputRef);

  const handleChange = useEventCallback(
    (date: Date | null, event: React.SyntheticEvent<HTMLInputElement>) => {
      const nextValue =
        dateType === DateType.Start
          ? ([date, value?.[1]] as ValueType)
          : ([value?.[0], date] as ValueType);

      onChange?.(nextValue, event);
      setValue(nextValue);
    }
  );

  const handleClear = useEventCallback((event: React.SyntheticEvent<HTMLInputElement>) => {
    startDateState.setNewDate(null);
    endDateState.setNewDate(null);

    setSelectionRange(0, 0);
    reset();

    setValue(null);
    onChange?.(null, event);
  });

  const onSegmentChange = useEventCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      nextDirection?: 'right' | 'left',
      selectionRange = resolveKeyboardSelection(),
      selectedMonth = getActiveState().dateField.month,
      dateString = renderedValue
    ) => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');

      const selectionStart = selectionRange?.selectionStart ?? input.selectionStart;
      const selectionEnd = selectionRange?.selectionEnd ?? input.selectionEnd;

      if (selectionEnd === null || selectionStart === null) {
        return;
      }

      const cursorIndex = direction === 'right' ? selectionEnd : selectionStart;
      let nextDateType = dateType;

      if (isSwitchDateType(dateString, character, cursorIndex, direction)) {
        nextDateType = dateType === DateType.Start ? DateType.End : DateType.Start;

        setDateType(nextDateType);
      }

      const state = getInputSelectedState({
        ...keyPressOptions,
        dateType: nextDateType,
        input,
        selectionRange,
        dateString,
        selectedMonth:
          nextDateType === dateType ? selectedMonth : getActiveState(nextDateType).dateField.month,
        direction
      });

      setSelectedState(state);
      setSelectionRange(state.selectionStart, state.selectionEnd);

      // If the endpoint or selected field changes, reset the input state
      if (nextDateType !== dateType || selectedState.selectedPattern !== state.selectedPattern) {
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
    getActiveState().setDateOffset(state.selectedPattern, offset, date =>
      handleChange(date, event)
    );
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });

  const onSegmentValueChangeWithNumericKeys = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const currentSelection = resolveKeyboardSelection();
      const currentState = getInputSelectedState({
        ...keyPressOptions,
        input,
        selectionRange: currentSelection
      });
      const pattern = currentState.selectedPattern;
      const isFunctionKey = key.startsWith('F') && !isNaN(Number(key.slice(1)));

      if (isFunctionKey) {
        return;
      }

      if (!pattern) {
        return;
      }

      if (currentState.selectedPattern !== selectedState.selectedPattern) reset();

      const field = getActiveState().getDateField(pattern);
      const value = parseInt(key, 10);
      const padValue = parseInt(`${field.value || ''}${key}`, 10);

      let newValue = value;

      // Check if the value entered by the user is a valid date
      if (validateDateTime(field.name, padValue) && !isResetValue()) {
        newValue = padValue;
      }

      getActiveState().setDateField(pattern, newValue, date => handleChange(date, event));

      // The currently selected month will be retained as a parameter of getInputSelectedState,
      // but if the user enters a month, the month value will be replaced with the value entered by the user.
      const selectedMonth = pattern === 'M' ? newValue : getActiveState().dateField.month;
      const nextDateString =
        dateType === DateType.Start
          ? startDateState.toDateString(field.name, newValue) +
            character +
            endDateState.toDateString()
          : startDateState.toDateString() +
            character +
            endDateState.toDateString(field.name, newValue);
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
      if (isMoveCursor(newValue, pattern) && currentState.selectionEnd !== renderedValue.length) {
        onSegmentChange(event, 'right', nextState, selectedMonth, nextDateString);
      }
    }
  );

  const onSegmentValueRemove = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

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

      getActiveState().setDateField(nextState.selectedPattern, null, date =>
        handleChange(date, event)
      );

      reset();
    }
  });

  const onAmPmToggle = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const key = event.key.toLowerCase();

    // Only handle 'a' or 'p' keys when the selected pattern is 'a' (AM/PM)
    if (selectedState.selectedPattern === 'a' && (key === 'a' || key === 'p')) {
      const currentHour = getActiveState().dateField.hour || 0;
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
        getActiveState().setDateOffset('a', 1, date => handleChange(date, event));
        setSelectionRange(state.selectionStart, state.selectionEnd);
      }
    }
  });

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (input.selectionStart === null) {
      return;
    }

    const cursorIndex = input.selectionStart === renderedValue.length ? 0 : input.selectionStart;

    const nextDateType = getDateType(renderedValue || rangeFormatStr, character, cursorIndex);
    const state = getInputSelectedState({
      ...keyPressOptions,
      dateType: nextDateType,
      selectedMonth: getActiveState(nextDateType).dateField.month,
      input
    });

    setDateType(nextDateType);
    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);

    if (nextDateType !== dateType || selectedState.selectedPattern !== state.selectedPattern) {
      reset();
    }
  });

  const handlePaste = useEventCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasteText = event.clipboardData?.getData('text');
    const [start, end] = pasteText.split(character).map(date => parseDate(date, formatStr)) as [
      Date,
      Date
    ];

    if (isValid(start) && isValid(end)) {
      const nextValue = [start, end] as ValueType;

      onChange?.(nextValue, event);
      setValue(nextValue);

      startDateState.setNewDate(start);
      endDateState.setNewDate(end);
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

  return (
    <Input
      inputMode={focused ? 'numeric' : 'text'}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      className={classes}
      ref={mergeRefs(inputRef, ref)}
      onKeyDown={onKeyboardInput}
      onClick={handleClick}
      onPaste={handlePaste}
      value={renderedValue}
      placeholder={placeholder || rangeFormatStr}
      {...focusEventProps}
      {...rest}
    />
  );
});

DateRangeInput.displayName = 'DateRangeInput';

export default DateRangeInput;
