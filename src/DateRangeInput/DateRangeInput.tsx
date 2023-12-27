import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input, { InputProps } from '../Input';
import {
  mergeRefs,
  useClassNames,
  useCustom,
  useControlled,
  useEventCallback,
  createChainedFunction
} from '../utils';
import {
  validateDateTime,
  isFieldFullValue,
  useDateInputState,
  useInputSelection
} from '../DateInput';
import { getInputSelectedState, DateType, getDateType, isSwitchDateType } from './utils';
import { FormControlBaseProps } from '../@types/common';

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
  const rangeFormatStr = `${formatStr}${character}${formatStr}`;

  const dateLocale = locale.dateLocale;
  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
  const [focused, setFocused] = useState(false);
  const [dateType, setDateType] = useState<DateType>(DateType.Start);

  const dateInputOptions = { formatStr, locale: dateLocale, isControlledDate: isControlled };

  const startDateState = useDateInputState({ ...dateInputOptions, date: value?.[0] });
  const endDateState = useDateInputState({ ...dateInputOptions, date: value?.[1] });

  const getActiveState = (type: DateType = dateType) => {
    return type === DateType.Start ? startDateState : endDateState;
  };

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

  const handleChangeField = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, nextDirection?: 'right' | 'left') => {
      const input = event.target as HTMLInputElement;
      const direction = nextDirection || (event.key === 'ArrowRight' ? 'right' : 'left');

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
      getActiveState().setDateOffset(state.selectedPattern, offset, date =>
        handleChange(date, event)
      );
      setSelectionRange(state.selectionStart, state.selectionEnd);
    }
  );

  const handleChangeFieldValueWithNumericKeys = useEventCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const key = event.key;
      const input = event.target as HTMLInputElement;
      const pattern = selectedState.selectedPattern;
      if (!pattern) {
        return;
      }

      const field = getActiveState().getDateField(pattern);
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

      getActiveState().setDateField(pattern, newValue, date => handleChange(date, event));

      // The currently selected month will be retained as a parameter of getInputSelectedState,
      // but if the user enters a month, the month value will be replaced with the value entered by the user.
      const selectedMonth = pattern === 'M' ? newValue : getActiveState().dateField.month;
      const nextState = getInputSelectedState({ ...keyPressOptions, input, selectedMonth });

      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);

      // If the field is full value, move the cursor to the next field
      if (
        isFieldFullValue(formatStr, newValue, pattern) &&
        input.selectionEnd !== input.value.length
      ) {
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

        getActiveState().setDateField(selectedState.selectedPattern, null, date =>
          handleChange(date, event)
        );
      }
    }
  );

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
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
  });

  const handleClick = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (input.selectionStart === null) {
      return;
    }

    const cursorIndex = input.selectionStart === renderedValue.length ? 0 : input.selectionStart;

    const dateType = getDateType(renderedValue, character, cursorIndex);
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

  return (
    <Input
      inputMode="text"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      className={classes}
      ref={mergeRefs(inputRef, ref)}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      value={renderedValue}
      placeholder={placeholder || rangeFormatStr}
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
