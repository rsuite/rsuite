import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import isNil from 'lodash/isNil';
import on from 'dom-lib/on';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import InputGroup from '../InputGroup/InputGroup';
import InputGroupAddon from '../InputGroup/InputGroupAddon';
import Input from '../Input';
import Button from '../Button';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { KEY_VALUES } from '@/internals/constants';
import { forwardRef, partitionHTMLProps, createChainedFunction } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type {
  WithAsProps,
  SizeType,
  AppearanceType,
  FormControlBaseProps
} from '@/internals/types';

export interface InputNumberProps<T = number | string | null>
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'size'
      // RDFa attributes
      | 'prefix'
    >,
    WithAsProps,
    FormControlBaseProps<T> {
  /**
   * Button can have different appearances
   */
  buttonAppearance?: AppearanceType;

  /**
   * An input can show that it is disabled
   */
  disabled?: boolean;

  /**
   *
   * Decimal separator
   * https://en.wikipedia.org/wiki/Decimal_separator
   *
   * @default '.'
   * @version 5.69.0
   */
  decimalSeparator?: string;

  /**
   * Format the value of the input
   */
  formatter?: (value: number | string) => string;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * The value of each step. can be decimal
   */
  step?: number;

  /**
   * Sets the element displayed to the left of the component
   */
  prefix?: React.ReactNode;

  /**
   * Sets the element displayed on the right side of the component
   */
  postfix?: React.ReactNode;

  /**
   * An Input can have different sizes
   */
  size?: SizeType;

  /**
   * Whether the value can be changed through the wheel event
   */
  scrollable?: boolean;

  /**
   * Callback function when wheel event is triggered
   */
  onWheel?: (event: React.WheelEvent) => void;
}

/**
 * Check if the value is a number.
 * @param value
 */
const isNumber = (value: string | number) => /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');

/**
 * Get the length of the decimal.
 * @param value
 */
function getDecimalLength(value: number): number {
  if (isNumber(value)) {
    return value.toString().split('.')[1].length;
  }
  return 0;
}

/**
 * Get the value after the decimal point.
 * @param values
 */
function decimals(...values: number[]) {
  const lengths: number[] = values.map(getDecimalLength);
  return Math.max(...lengths);
}

/**
 * Disable the upper limit of the number.
 * @param value
 * @param max
 */
function valueReachesMax(value: number | string | null | undefined, max: number) {
  if (!isNil(value)) {
    return +value >= max;
  }
  return false;
}

/**
 * Disable the lower limit of the number.
 * @param value
 * @param min
 */
function valueReachesMin(value: number | string | null | undefined, min: number) {
  if (!isNil(value)) {
    return +value <= min;
  }
  return false;
}

/**
 * The `InputNumber` component is used to enter a numerical value.
 * @see https://rsuitejs.com/components/input-number
 */
const InputNumber = forwardRef<typeof InputGroup, InputNumberProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('InputNumber', props);
  const {
    as: Component = InputGroup,
    className,
    classPrefix = 'input-number',
    disabled,
    decimalSeparator,
    formatter,
    readOnly,
    plaintext,
    value: valueProp,
    defaultValue,
    size,
    prefix: prefixElement,
    postfix,
    step = 1,
    buttonAppearance = 'subtle',
    min: minProp,
    max: maxProp,
    scrollable = true,
    onChange,
    onWheel,
    onBlur,
    onFocus,
    ...restProps
  } = propsWithDefaults;

  const min = minProp ?? -Infinity;
  const max = maxProp ?? Infinity;

  const [value, setValue] = useControlled(valueProp, defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const [htmlInputProps, rest] = partitionHTMLProps(restProps);
  const inputRef = useRef();

  const getSafeValue = (value: number | string) => {
    if (!Number.isNaN(value)) {
      if (+value > max) {
        value = max;
      }
      if (+value < min) {
        value = min;
      }
    } else {
      value = '';
    }

    return value.toString();
  };

  const handleChangeValue = useEventCallback(
    (currentValue: number | string, event: React.SyntheticEvent) => {
      if (currentValue !== value) {
        setValue(currentValue);
        onChange?.(currentValue, event);
      }
    }
  );

  // Increment value by step
  const handleStepUp = useEventCallback((event: React.SyntheticEvent) => {
    const val = +(value || 0);
    const bit = decimals(val, step);
    handleChangeValue(getSafeValue((val + step).toFixed(bit)), event);
  });

  // Decrement value by step
  const handleStepDown = useEventCallback((event: React.SyntheticEvent) => {
    const val = +(value || 0);
    const bit = decimals(val, step);
    handleChangeValue(getSafeValue((val - step).toFixed(bit)), event);
  });

  // Disables step up/down button when
  // - InputNumber is disabled/readonly
  // - value reaches max/min limits
  const stepUpDisabled = disabled || readOnly || valueReachesMax(value, max);
  const stepDownDisabled = disabled || readOnly || valueReachesMin(value, min);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEY_VALUES.UP:
        event.preventDefault();
        handleStepUp(event);
        break;
      case KEY_VALUES.DOWN:
        event.preventDefault();
        handleStepDown(event);
        break;
      case KEY_VALUES.HOME:
        if (typeof minProp !== 'undefined') {
          event.preventDefault();
          handleChangeValue(getSafeValue(minProp), event);
        }
        break;
      case KEY_VALUES.END:
        if (typeof maxProp !== 'undefined') {
          event.preventDefault();
          handleChangeValue(getSafeValue(maxProp), event);
        }
        break;
    }
  });

  const handleWheel = useEventCallback((event: React.WheelEvent<HTMLInputElement>) => {
    if (!scrollable) {
      event.preventDefault();
      return;
    }

    if (!disabled && !readOnly && event.target === document.activeElement) {
      event.preventDefault();
      const delta: number = event['wheelDelta'] || -event.deltaY || -event?.detail;

      if (delta > 0) {
        handleStepDown(event);
      }
      if (delta < 0) {
        handleStepUp(event);
      }
    }

    onWheel?.(event);
  });

  const handleChange = useEventCallback(
    (value: any, event: React.ChangeEvent<HTMLInputElement>) => {
      const separator = decimalSeparator || '.';
      const escapedSeparator = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

      const regex = new RegExp(`^-?(?:\\d+)?(${escapedSeparator})?\\d*$`);

      if (!regex.test(value) && value !== '') {
        return;
      }

      handleChangeValue(value, event);
    }
  );

  const replaceDecimalSeparator = useCallback(
    (value: string | number) => {
      if (decimalSeparator && value) {
        return value.toString().replace('.', decimalSeparator);
      }
      return value;
    },
    [decimalSeparator]
  );

  const restoreDecimalSeparator = useCallback(
    (value: string) => {
      if (decimalSeparator && value) {
        return value.replace(decimalSeparator, '.');
      }
      return value;
    },
    [decimalSeparator]
  );

  const handleBlur = useEventCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const value = restoreDecimalSeparator(event.target?.value);

    const targetValue = Number.parseFloat(value);
    handleChangeValue(getSafeValue(targetValue), event);
    setIsFocused(false);
  });

  useEffect(() => {
    let wheelListener: ReturnType<typeof on>;
    if (inputRef.current) {
      wheelListener = on(inputRef.current, 'wheel', handleWheel, { passive: false });
    }
    return () => {
      wheelListener?.off();
    };
  }, [handleWheel, scrollable]);

  const inputValue = useMemo(() => {
    if (isNil(value)) {
      return '';
    }

    if (isFocused) {
      return replaceDecimalSeparator(value);
    }

    if (formatter) {
      return formatter(value);
    }

    return replaceDecimalSeparator(value);
  }, [formatter, isFocused, replaceDecimalSeparator, value]);

  const input = (
    <Input
      {...(htmlInputProps as Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>)}
      ref={plaintext ? (ref as any) : undefined}
      inputRef={inputRef}
      autoComplete="off"
      inputMode="numeric"
      step={step}
      value={inputValue}
      disabled={disabled}
      readOnly={readOnly}
      plaintext={plaintext}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      onBlur={createChainedFunction(handleBlur, onBlur)}
      onFocus={createChainedFunction(() => setIsFocused(true), onFocus)}
    />
  );

  if (plaintext) {
    return input;
  }

  return (
    <Component {...rest} ref={ref} className={classes} disabled={disabled} size={size}>
      {prefixElement && <InputGroupAddon>{prefixElement}</InputGroupAddon>}
      {input}
      <span className={prefix('btn-group-vertical')}>
        <Button
          tabIndex={-1}
          appearance={buttonAppearance}
          className={prefix('touchspin-up')}
          onClick={handleStepUp}
          disabled={stepUpDisabled}
          aria-label="Increment"
        >
          <ArrowUpLineIcon />
        </Button>
        <Button
          tabIndex={-1}
          appearance={buttonAppearance}
          className={prefix('touchspin-down')}
          onClick={handleStepDown}
          disabled={stepDownDisabled}
          aria-label="Decrement"
        >
          <ArrowDownLineIcon />
        </Button>
      </span>
      {postfix && <InputGroupAddon>{postfix}</InputGroupAddon>}
    </Component>
  );
});

InputNumber.displayName = 'InputNumber';

export default InputNumber;
