import React from 'react';
import isNil from 'lodash/isNil';
import Star from '@rsuite/icons/Star';
import Character from './Character';
import Plaintext from '@/internals/Plaintext';
import StyledBox, { StyledBoxProps } from '@/internals/StyledBox';
import { KEY_VALUES } from '@/internals/constants';
import { useControlled, useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { forwardRef, shallowEqualArray, mergeStyles } from '@/internals/utils';
import { transformStarStatusToValue, getFractionalValue } from './utils';
import { useRatingStates } from './useRatingStates';
import type { Color, FormControlBaseProps, Size } from '@/internals/types';

export interface RateProps<T = number>
  extends Omit<StyledBoxProps, 'name'>,
    FormControlBaseProps<T> {
  /** Whether to allow semi selection */
  allowHalf?: boolean;

  /** Custom character of rate */
  character?: React.ReactNode;

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Whether to allow cancel selection */
  cleanable?: boolean;

  /** A rate can have different sizes */
  size?: Size;

  /** A rate can have different colors */
  color?: Color | React.CSSProperties['color'];

  /** Maximum rate */
  max?: number;

  /** Vertical Rate half */
  vertical?: boolean;

  /** Render custom character */
  renderCharacter?: (value: number, index: number) => React.ReactNode;

  /** Callback function when hover state changes */
  onChangeActive?: (value: T, event: React.SyntheticEvent) => void;
}

/**
 * The `Rate` component is used for rating. It can be used to evaluate the quality of the content.
 * @see https://rsuitejs.com/components/rate/
 */
const Rate = forwardRef<'ul', RateProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Rate', props);
  const {
    as = 'ul',
    character = <Star />,
    className,
    classPrefix = 'rate',
    disabled,
    max = 5,
    readOnly,
    vertical,
    size,
    color,
    allowHalf = false,
    value: valueProp,
    defaultValue = 0,
    cleanable = true,
    plaintext,
    style,
    onChange,
    renderCharacter,
    onChangeActive,
    ...rest
  } = propsWithDefaults;

  const [value, setValue] = useControlled(valueProp, defaultValue);
  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  // Use the custom hook to manage rating star states
  const { starStates, setStarStates, resetStarStates, hoverValue, getStarStates } = useRatingStates(
    {
      value,
      max,
      allowHalf,
      valueProp
    }
  );

  const handleMouseLeave = useEventCallback((event: React.SyntheticEvent) => {
    resetStarStates();
    onChangeActive?.(value, event);
  });

  const handleChangeValue = useEventCallback((index: number, event: React.SyntheticEvent) => {
    let nextValue = transformStarStatusToValue(starStates);

    if (cleanable && value === nextValue && getStarStates(value)[index] === starStates[index]) {
      nextValue = 0;
    }

    if (nextValue !== value) {
      setValue(nextValue);
      setStarStates(getStarStates(nextValue));
      onChange?.(nextValue, event);
    }
  });

  const handleKeyDown = useEventCallback((index: number, event: React.KeyboardEvent) => {
    const { key } = event;
    let nextValue = transformStarStatusToValue(starStates);

    if (key === KEY_VALUES.RIGHT && nextValue < max) {
      nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
    } else if (key === KEY_VALUES.LEFT && nextValue > 0) {
      nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
    }

    setStarStates(getStarStates(nextValue));

    if (key === KEY_VALUES.ENTER) {
      handleChangeValue(index, event);
    }
  });

  const handleChangeStarStates = useEventCallback(
    (index: number, key: string, event: React.MouseEvent) => {
      const nextStarStates = starStates.map((_item, i) => {
        if (i === index && key === 'before' && allowHalf) {
          return 0.5;
        }
        return index >= i ? 1 : 0;
      });

      if (!shallowEqualArray(starStates, nextStarStates)) {
        setStarStates(nextStarStates);
        onChangeActive?.(transformStarStatusToValue(nextStarStates), event);
      }
    }
  );

  const handleClick = useEventCallback((index: number, key: string, event: React.MouseEvent) => {
    handleChangeStarStates(index, key, event);
    handleChangeValue(index, event);
  });

  if (plaintext) {
    return (
      <Plaintext localeKey="notSelected" className={className}>
        {!isNil(value) ? `${value}/${max}` : null}
      </Plaintext>
    );
  }

  const mergedStyle = mergeStyles(style, {
    '--rs-rate-before-size': getFractionalValue(value)
  });

  return (
    <StyledBox
      as={as}
      name="rate"
      size={size}
      color={color}
      role="radiogroup"
      tabIndex={disabled ? -1 : 0}
      ref={ref}
      className={classes}
      style={mergedStyle}
      onMouseLeave={handleMouseLeave}
      data-disabled={disabled}
      data-readonly={readOnly}
      {...rest}
    >
      {starStates.map((status, index) => (
        <Character
          role="radio"
          aria-posinset={index + 1}
          aria-setsize={max}
          aria-checked={value === index + 1}
          key={index}
          status={status}
          disabled={disabled || readOnly}
          vertical={vertical}
          onClick={(key, event) => handleClick(index, key, event)}
          onKeyDown={event => handleKeyDown(index, event)}
          onMouseMove={(key, event) => handleChangeStarStates(index, key, event)}
        >
          {renderCharacter ? renderCharacter(hoverValue, index) : character}
        </Character>
      ))}
    </StyledBox>
  );
});

Rate.displayName = 'Rate';

export default Rate;
