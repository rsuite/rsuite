import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input, { InputProps } from '../Input';
import { useClassNames, useCustom, useControlled, useEventCallback } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import {
  validateDateTime,
  useDateInputState,
  useInputSelection,
  useKeyboardInputEvent,
  useIsFocused,
  useSelectedState,
  useFieldCursor
} from '../DateInput';
import { getInputSelectedState, DateType, getDateType, isSwitchDateType } from './utils';
import { FormControlBaseProps } from '@/internals/types';

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
  const {
    className,
    classPrefix = 'date-range-input',
    character = ' ~ ',
    format: formatStr = 'yyyy-MM-dd',
    value: valueProp,
    defaultValue = [],
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
    onFocus,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const inputRef = useRef<HTMLInputElement>();

  const { selectedState, setSelectedState } = useSelectedState();

  const { locale } = useCustom('Calendar');
  const rangeFormatStr = `${formatStr}${character}${formatStr}`;

  const dateLocale = locale.dateLocale;
  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
  const [dateType, setDateType] = useState<DateType>(DateType.Start);

  const dateInputOptions = { formatStr, locale: dateLocale, isControlledDate: isControlled };

  const startDateState = useDateInputState({ ...dateInputOptions, date: value?.[0] || null });
  const endDateState = useDateInputState({ ...dateInputOptions, date: value?.[1] || null });

  const { isMoveCursor, increment, reset } = useFieldCursor<ValueType>(formatStr, valueProp);

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

  const setSelectionRange = useInputSelection(inputRef);

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

  const onSegmentChange = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nextDirection?: 'right' | 'left') => {
      const input = event.target as HTMLInputElement;
      const key = event.key;
      const direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');

      if (input.selectionEnd === null || input.selectionStart === null) {
        return;
      }

      const cursorIndex = direction === 'right' ? input.selectionEnd : input.selectionStart;
      let nextDateType = dateType;

      if (isSwitchDateType(renderedValue, character, cursorIndex, direction)) {
        nextDateType = dateType === DateType.Start ? DateType.End : DateType.Start;

        setDateType(nextDateType);
      }

      const state = getInputSelectedState({
        ...keyPressOptions,
        dateType: nextDateType,
        selectedMonth: getActiveState(nextDateType).dateField.month,
        input,
        direction
      });

      setSelectedState(state);
      setSelectionRange(state.selectionStart, state.selectionEnd);
      reset();
    }
  );

  const onSegmentValueChange = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const key = event.key;
    const offset = key === 'ArrowUp' ? 1 : -1;

    const state = getInputSelectedState({ ...keyPressOptions, input, valueOffset: offset });

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
      const pattern = selectedState.selectedPattern;

      if (!pattern) {
        return;
      }

      increment();

      const field = getActiveState().getDateField(pattern);
      const value = parseInt(key, 10);
      const padValue = parseInt(`${field.value || ''}${key}`, 10);

      let newValue = value;

      // Check if the value entered by the user is a valid date
      if (validateDateTime(field.name, padValue)) {
        newValue = padValue;
      }

      getActiveState().setDateField(pattern, newValue, date => handleChange(date, event));

      // The currently selected month will be retained as a parameter of getInputSelectedState,
      // but if the user enters a month, the month value will be replaced with the value entered by the user.
      const selectedMonth = pattern === 'M' ? newValue : getActiveState().dateField.month;
      const nextState = getInputSelectedState({ ...keyPressOptions, input, selectedMonth });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      // If the field is full value, move the cursor to the next field
      if (isMoveCursor(newValue, pattern) && input.selectionEnd !== input.value.length) {
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

      getActiveState().setDateField(selectedState.selectedPattern, null, date =>
        handleChange(date, event)
      );

      reset();
    }
  });

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (input.selectionStart === null) {
      return;
    }

    const cursorIndex = input.selectionStart === renderedValue.length ? 0 : input.selectionStart;

    const dateType = getDateType(renderedValue || rangeFormatStr, character, cursorIndex);
    const state = getInputSelectedState({
      ...keyPressOptions,
      dateType,
      selectedMonth: getActiveState(dateType).dateField.month,
      input
    });

    setDateType(dateType);
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
      value={renderedValue}
      placeholder={placeholder || rangeFormatStr}
      {...focusEventProps}
      {...rest}
    />
  );
});

DateRangeInput.displayName = 'DateRangeInput';
DateRangeInput.propTypes = {
  character: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default DateRangeInput;
