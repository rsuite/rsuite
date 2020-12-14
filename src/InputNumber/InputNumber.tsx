import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import AngleUpIcon from '@rsuite/icons/legacy/AngleUp';
import AngleDownIcon from '@rsuite/icons/legacy/AngleDown';

import helper from '../DOMHelper';
import InputGroup from '../InputGroup/InputGroup';
import InputGroupAddon from '../InputGroup/InputGroupAddon';
import Input from '../Input';
import Button from '../Button';
import { partitionHTMLProps, createChainedFunction, useClassNames, useControlled } from '../utils';
import { WithAsProps, TypeAttributes, FormControlBaseProps } from '../@types/common';
import { Partial } from '../@types/utils';

export interface InputNumberProps<T = number | string>
  extends WithAsProps,
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
function disableMaxValue(value: number | string, max: number) {
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
function disableMinValue(value: number | string, min: number) {
  if (!isNil(value)) {
    return +value <= min;
  }
  return false;
}

const defaultProps: Partial<InputNumberProps> = {
  as: InputGroup,
  classPrefix: 'input-number',
  min: -Infinity,
  max: Infinity,
  step: 1,
  buttonAppearance: 'subtle',
  scrollable: true
};

const InputNumber = React.forwardRef((props: InputNumberProps, ref) => {
  const {
    as: Component,
    className,
    classPrefix,
    disabled,
    readOnly,
    plaintext,
    value: valueProp,
    defaultValue,
    size,
    prefix: prefixElement,
    postfix,
    step,
    buttonAppearance,
    min,
    max,
    scrollable,
    onChange,
    onWheel,
    ...restProps
  } = props;

  const [value, setValue] = useControlled<number | string>(valueProp, defaultValue);
  const [disabledUpButton, setDisabledUpButton] = useState<boolean>(disableMaxValue(value, max));
  const [disabledDownButton, setDisabledDownButton] = useState<boolean>(
    disableMinValue(value, min)
  );
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const [htmlInputProps, rest] = partitionHTMLProps(restProps);
  const inputRef = useRef();

  const handleValue = useCallback(
    (currentValue: number | string, event?: React.SyntheticEvent) => {
      if (currentValue !== value) {
        // Disable the up button when the value is greater than the maximum value.
        setDisabledUpButton(disableMaxValue(currentValue, max));

        // Disable the down button when the value is greater than the minimum value.
        setDisabledDownButton(disableMinValue(currentValue, min));
        setValue(currentValue);
        onChange?.(currentValue, event);
      }
    },
    [max, min, onChange, setValue, value]
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

  const handlePlus = useCallback(
    (event: React.SyntheticEvent) => {
      const val = +(value || 0);
      const bit = decimals(val, step);
      handleValue(getSafeValue((val + step).toFixed(bit)), event);
    },
    [getSafeValue, handleValue, step, value]
  );
  const handleMinus = useCallback(
    (event: React.SyntheticEvent) => {
      const val = +(value || 0);
      const bit = decimals(val, step);
      handleValue(getSafeValue((val - step).toFixed(bit)), event);
    },
    [getSafeValue, handleValue, step, value]
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly && event.target === document.activeElement) {
        event.preventDefault();
        const delta: number = event['wheelDelta'] || -event.deltaY || -event?.detail;

        if (delta > 0) {
          handleMinus(event);
        }
        if (delta < 0) {
          handlePlus(event);
        }
      }

      onWheel?.(event);
    },
    [disabled, handleMinus, handlePlus, onWheel, readOnly]
  );

  const handleChange = useCallback(
    (value: any, event: React.SyntheticEvent<any>) => {
      if (!/^-?(?:\d+)?(\.)?(\d+)*$/.test(value) && value !== '') {
        return;
      }
      handleValue(value, event);
    },
    [handleValue]
  );

  const handleBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue = Number.parseFloat(event.target?.value);
      handleValue(getSafeValue(targetValue), event);
    },
    [getSafeValue, handleValue]
  );

  useEffect(() => {
    let wheelListener: ReturnType<typeof helper.on>;
    if (inputRef.current && scrollable) {
      wheelListener = helper.on(inputRef.current, 'wheel', handleWheel, { passive: false });
    }
    return () => {
      wheelListener?.off();
    };
  }, [handleWheel, scrollable]);

  const input = (
    <Input
      {...(htmlInputProps as Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>)}
      type="text"
      autoComplete="off"
      step={step}
      inputRef={inputRef}
      onChange={handleChange}
      onBlur={createChainedFunction(handleBlur, htmlInputProps?.onBlur)}
      value={isNil(value) ? '' : `${value}`}
      disabled={disabled}
      readOnly={readOnly}
      plaintext={plaintext}
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
          appearance={buttonAppearance}
          className={prefix('touchspin-up')}
          onClick={handlePlus}
          disabled={disabledUpButton || disabled || readOnly}
        >
          <AngleUpIcon />
        </Button>
        <Button
          appearance={buttonAppearance}
          className={prefix('touchspin-down')}
          onClick={handleMinus}
          disabled={disabledDownButton || disabled || readOnly}
        >
          <AngleDownIcon />
        </Button>
      </span>
      {postfix && <InputGroupAddon>{postfix}</InputGroupAddon>}
    </Component>
  );
});

InputNumber.displayName = 'InputNumber';
InputNumber.defaultProps = defaultProps;
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
