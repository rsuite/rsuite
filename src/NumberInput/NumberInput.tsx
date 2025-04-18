import React from 'react';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import InputGroup from '../InputGroup/InputGroup';
import InputGroupAddon from '../InputGroup/InputGroupAddon';
import Input from '../Input';
import Button from '../Button';
import { BoxProps } from '@/internals/Box';
import { useStyles, useControlled, useEventCallback } from '@/internals/hooks';
import { forwardRef, partitionHTMLProps, createChainedFunction } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import { useNumberInputValue } from './hooks/useNumberInputValue';
import { useEvents } from './hooks/useEvents';
import { valueReachesMax, valueReachesMin } from './utils/number';
import type {
  SanitizedInputProps,
  FormControlBaseProps,
  AppearanceType,
  BasicSize
} from '@/internals/types';

export interface NumberInputProps<T = number | string | null>
  extends Omit<
      SanitizedInputProps,
      | 'value'
      | 'defaultValue'
      // RDFa attributes
      | 'prefix'
    >,
    BoxProps,
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
   * @deprecated Use `suffix` instead.
   */
  postfix?: React.ReactNode;

  /**
   * Sets the element displayed on the right side of the component
   */
  suffix?: React.ReactNode;

  /**
   * An Input can have different sizes
   */
  size?: BasicSize;

  /**
   * Whether the value can be changed through the wheel event
   */
  scrollable?: boolean;

  /**
   * Show or hide control icons:
   * - `true` (default): show default up/down buttons.
   * - `false`: hide controls.
   * - `(trigger) => ReactNode`: fully custom control per trigger ('up' | 'down').
   */
  controls?: boolean | ((trigger: 'up' | 'down') => React.ReactNode);

  /**
   * Callback function when wheel event is triggered
   */
  onWheel?: (event: React.WheelEvent) => void;
}

/**
 * The `NumberInput` component is used to enter a numerical value.
 * @see https://rsuitejs.com/components/number-input
 */
const NumberInput = forwardRef<typeof InputGroup, NumberInputProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('NumberInput', props);
  const {
    as,
    className,
    classPrefix = 'number-input',
    controls = true,
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
    suffix = postfix,
    step = 1,
    buttonAppearance = 'subtle',
    min: minProp,
    max: maxProp,
    scrollable = true,
    onChange,
    onWheel,
    onBlur: onBlurProp,
    onFocus: onFocusProp,
    ...rest
  } = propsWithDefaults;

  const min = minProp ?? -Infinity;
  const max = maxProp ?? Infinity;
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  const [htmlInputProps, restProps] = partitionHTMLProps(rest);

  const onChangeValue = (currentValue: number | string, event: React.SyntheticEvent) => {
    if (currentValue !== value) {
      setValue(currentValue);
      onChange?.(currentValue, event);
    }
  };

  const { inputRef, isFocused, onStepUp, onStepDown, onKeyDown, onFocus, onBlur } = useEvents({
    min: minProp,
    max: maxProp,
    step,
    value,
    scrollable,
    disabled,
    readOnly,
    decimalSeparator,
    onWheel,
    onChangeValue
  });

  const handleChange = useEventCallback(
    (value: any, event: React.ChangeEvent<HTMLInputElement>) => {
      const separator = decimalSeparator || '.';
      const escapedSeparator = separator.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

      // Support both custom decimalSeparator and standard decimal point '.'
      let regex;
      if (separator !== '.') {
        // Allow both the custom separator and the standard decimal point
        regex = new RegExp(`^-?(?:\\d+)?([.${escapedSeparator}])?\\d*$`);
      } else {
        regex = new RegExp(`^-?(?:\\d+)?(${escapedSeparator})?\\d*$`);
      }

      if (!regex.test(value) && value !== '') {
        return;
      }

      onChangeValue(value, event);
    }
  );

  const inputValue = useNumberInputValue({ value, isFocused, formatter, decimalSeparator });

  const input = (
    <Input
      {...(htmlInputProps as SanitizedInputProps)}
      ref={plaintext ? (ref as any) : undefined}
      inputRef={inputRef}
      autoComplete="off"
      inputMode="numeric"
      step={step}
      value={inputValue}
      disabled={disabled}
      readOnly={readOnly}
      plaintext={plaintext}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      onBlur={createChainedFunction(onBlur, onBlurProp)}
      onFocus={createChainedFunction(onFocus, onFocusProp)}
    />
  );

  if (plaintext) {
    return input;
  }

  const stepUpDisabled = disabled || readOnly || valueReachesMax(value, max);
  const stepDownDisabled = disabled || readOnly || valueReachesMin(value, min);

  return (
    <InputGroup
      as={as}
      ref={ref}
      className={classes}
      disabled={disabled}
      size={size}
      inside
      {...restProps}
    >
      {prefixElement && <InputGroupAddon>{prefixElement}</InputGroupAddon>}
      {input}

      {suffix && <InputGroupAddon>{suffix}</InputGroupAddon>}

      {controls && (
        <span className={prefix('btn-group-vertical')}>
          <Button
            tabIndex={-1}
            appearance={buttonAppearance}
            className={prefix('touchspin-up')}
            onClick={onStepUp}
            disabled={stepUpDisabled}
            aria-label="Increment"
            size={size}
          >
            {typeof controls === 'function' ? controls('up') : <ArrowUpLineIcon />}
          </Button>
          <Button
            tabIndex={-1}
            appearance={buttonAppearance}
            className={prefix('touchspin-down')}
            onClick={onStepDown}
            disabled={stepDownDisabled}
            aria-label="Decrement"
            size={size}
          >
            {typeof controls === 'function' ? controls('down') : <ArrowDownLineIcon />}
          </Button>
        </span>
      )}
    </InputGroup>
  );
});

NumberInput.displayName = 'NumberInput';

export default NumberInput;
