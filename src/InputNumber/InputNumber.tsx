import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';
import on from 'dom-lib/on';
import InputGroup from '../InputGroup/InputGroup';
import InputGroupAddon from '../InputGroup/InputGroupAddon';
import Input from '../Input';
import Button from '../Button';
import {
  partitionHTMLProps,
  createChainedFunction,
  useClassNames,
  useControlled,
  KEY_VALUES
} from '../utils';
import { WithAsProps, TypeAttributes, FormControlBaseProps } from '../@types/common';

export interface InputNumberProps<T = number | string>
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
  /** Button can have different appearances */
  buttonAppearance?: TypeAttributes.Appearance;

  /** An input can show that it is disabled */
  disabled?: boolean;

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** The value of each step. can be decimal */
  step?: number;

  /** Sets the element displayed to the left of the component */
  prefix?: React.ReactNode;

  /** Sets the element displayed on the right side of the component */
  postfix?: React.ReactNode;

  /** An Input can have different sizes */
  size?: TypeAttributes.Size;

  /** Whether the value can be changed through the wheel event */
  scrollable?: boolean;

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
function valueReachesMax(value: number | string | undefined, max: number) {
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
function valueReachesMin(value: number | string | undefined, min: number) {
  if (!isNil(value)) {
    return +value <= min;
  }
  return false;
}

const InputNumber = React.forwardRef((props: InputNumberProps, ref) => {
  const {
    as: Component = InputGroup,
    className,
    classPrefix = 'input-number',
    disabled,
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
    ...restProps
  } = props;

  const min = minProp ?? -Infinity;
  const max = maxProp ?? Infinity;

  const [value, setValue] = useControlled(valueProp, defaultValue);

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const [htmlInputProps, rest] = partitionHTMLProps(restProps);
  const inputRef = useRef();

  const handleChangeValue = useCallback(
    (currentValue: number | string, event: React.SyntheticEvent) => {
      if (currentValue !== value) {
        setValue(currentValue);
        onChange?.(currentValue, event);
      }
    },
    [onChange, setValue, value]
  );

  const getSafeValue = useCallback(
    value => {
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
    },
    [max, min]
  );

  // Increment value by step
  const handleStepUp = useCallback(
    (event: React.SyntheticEvent) => {
      const val = +(value || 0);
      const bit = decimals(val, step);
      handleChangeValue(getSafeValue((val + step).toFixed(bit)), event);
    },
    [getSafeValue, handleChangeValue, step, value]
  );

  // Decrement value by step
  const handleStepDown = useCallback(
    (event: React.SyntheticEvent) => {
      const val = +(value || 0);
      const bit = decimals(val, step);
      handleChangeValue(getSafeValue((val - step).toFixed(bit)), event);
    },
    [getSafeValue, handleChangeValue, step, value]
  );

  // Disables step up/down button when
  // - InputNumber is disabled/readonly
  // - value reaches max/min limits
  const stepUpDisabled = disabled || readOnly || valueReachesMax(value, max);
  const stepDownDisabled = disabled || readOnly || valueReachesMin(value, min);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
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
    },
    [handleStepUp, handleStepDown, minProp, maxProp, handleChangeValue, getSafeValue]
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLInputElement>) => {
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
    },
    [disabled, handleStepDown, handleStepUp, onWheel, readOnly]
  );

  const handleChange = useCallback(
    (value: any, event: React.ChangeEvent<HTMLInputElement>) => {
      if (!/^-?(?:\d+)?(\.)?\d*$/.test(value) && value !== '') {
        return;
      }
      handleChangeValue(value, event);
    },
    [handleChangeValue]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const targetValue = Number.parseFloat(event.target?.value);
      handleChangeValue(getSafeValue(targetValue), event);
    },
    [getSafeValue, handleChangeValue]
  );

  useEffect(() => {
    let wheelListener: ReturnType<typeof on>;
    if (inputRef.current && scrollable) {
      wheelListener = on(inputRef.current, 'wheel', handleWheel, { passive: false });
    }
    return () => {
      wheelListener?.off();
    };
  }, [handleWheel, scrollable]);

  const input = (
    <Input
      {...(htmlInputProps as Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>)}
      type="number"
      autoComplete="off"
      step={step}
      inputRef={inputRef}
      onChange={handleChange}
      onBlur={createChainedFunction(handleBlur, htmlInputProps?.onBlur)}
      value={isNil(value) ? '' : `${value}`}
      disabled={disabled}
      readOnly={readOnly}
      plaintext={plaintext}
      ref={plaintext ? (ref as any) : undefined}
      onKeyDown={handleKeyDown}
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
          <AngleUpIcon />
        </Button>
        <Button
          tabIndex={-1}
          appearance={buttonAppearance}
          className={prefix('touchspin-down')}
          onClick={handleStepDown}
          disabled={stepDownDisabled}
          aria-label="Decrement"
        >
          <AngleDownIcon />
        </Button>
      </span>
      {postfix && <InputGroupAddon>{postfix}</InputGroupAddon>}
    </Component>
  );
});

InputNumber.displayName = 'InputNumber';
InputNumber.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  buttonAppearance: PropTypes.oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  onWheel: PropTypes.func,
  onChange: PropTypes.func
};

export default InputNumber;
