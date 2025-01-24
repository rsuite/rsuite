import React, { useEffect, useCallback, useState, useMemo } from 'react';
import isNil from 'lodash/isNil';
import Star from '@rsuite/icons/Star';
import Character from './Character';
import Plaintext from '@/internals/Plaintext';
import { KEY_VALUES } from '@/internals/constants';
import { useControlled, useClassNames, useEventCallback } from '@/internals/hooks';
import {
  forwardRef,
  shallowEqualArray,
  isPresetColor,
  createColorVariables,
  mergeStyles
} from '@/internals/utils';
import { transformValueToCharacterMap, transformCharacterMapToValue, CharacterType } from './utils';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, ColorType, FormControlBaseProps, SizeType } from '@/internals/types';

export interface RateProps<T = number> extends WithAsProps, FormControlBaseProps<T> {
  // Whether to allow semi selection
  allowHalf?: boolean;

  // custom character of rate
  character?: React.ReactNode;

  // The prefix of the component CSS class
  classPrefix?: string;

  // Whether to allow cancel selection
  cleanable?: boolean;

  /** A rate can have different sizes */
  size?: SizeType;

  /** A rate can have different colors */
  color?: ColorType | React.CSSProperties['color'];

  // Maximum rate
  max?: number;

  // Vertical Rate half
  vertical?: boolean;

  // render coutom character
  renderCharacter?: (value: number, index: number) => React.ReactNode;

  // Callback function when hover state changes
  onChangeActive?: (value: T, event: React.SyntheticEvent) => void;
}

/**
 * The `Rate` component is used for rating. It can be used to evaluate the quality of the content.
 * @see https://rsuitejs.com/components/rate/
 */
const Rate = forwardRef<'ul', RateProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Rate', props);
  const {
    as: Component = 'ul',
    character = <Star />,
    className,
    classPrefix = 'rate',
    disabled,
    max = 5,
    readOnly,
    vertical,
    size = 'md',
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

  const getCharacterMap = useCallback(
    (v?: number) => {
      return transformValueToCharacterMap(typeof v !== 'undefined' ? v : value, max, allowHalf);
    },
    [allowHalf, max, value]
  );

  const [characterMap, setCharacterMap] = useState<CharacterType[]>(getCharacterMap());

  const hoverValue = transformCharacterMapToValue(characterMap);
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(size, isPresetColor(color) && color, { disabled, readonly: readOnly })
  );

  const styles = useMemo(
    () => mergeStyles(style, createColorVariables(color, '--rs-rate-symbol-checked')),
    [style, color]
  );

  const resetCharacterMap = useCallback(() => {
    setCharacterMap(getCharacterMap());
  }, [getCharacterMap]);

  useEffect(() => {
    // Update characterMap when value is updated.
    setCharacterMap(getCharacterMap(valueProp));
  }, [valueProp]);

  const handleMouseLeave = useEventCallback((event: React.SyntheticEvent) => {
    resetCharacterMap();
    onChangeActive?.(value, event);
  });

  const handleChangeValue = useEventCallback((index: number, event: React.SyntheticEvent) => {
    let nextValue = transformCharacterMapToValue(characterMap);

    if (cleanable && value === nextValue && getCharacterMap(value)[index] === characterMap[index]) {
      nextValue = 0;
    }

    if (nextValue !== value) {
      setValue(nextValue);
      setCharacterMap(getCharacterMap(nextValue));
      onChange?.(nextValue, event);
    }
  });

  const handleKeyDown = useEventCallback((index: number, event: React.KeyboardEvent) => {
    const { key } = event;
    let nextValue = transformCharacterMapToValue(characterMap);

    if (key === KEY_VALUES.RIGHT && nextValue < max) {
      nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
    } else if (key === KEY_VALUES.LEFT && nextValue > 0) {
      nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
    }

    setCharacterMap(getCharacterMap(nextValue));

    if (key === KEY_VALUES.ENTER) {
      handleChangeValue(index, event);
    }
  });

  const handleChangeCharacterMap = useEventCallback(
    (index: number, key: string, event: React.MouseEvent) => {
      const nextCharacterMap = characterMap.map((_item, i) => {
        if (i === index && key === 'before' && allowHalf) {
          return 0.5;
        }
        return index >= i ? 1 : 0;
      });

      if (!shallowEqualArray(characterMap, nextCharacterMap)) {
        setCharacterMap(nextCharacterMap);
        onChangeActive?.(transformCharacterMapToValue(nextCharacterMap), event);
      }
    }
  );

  const handleClick = useEventCallback((index: number, key: string, event: React.MouseEvent) => {
    handleChangeCharacterMap(index, key, event);
    handleChangeValue(index, event);
  });

  if (plaintext) {
    return (
      <Plaintext localeKey="notSelected" className={className}>
        {!isNil(value) ? `${value}(${max})` : null}
      </Plaintext>
    );
  }

  return (
    <Component
      role="radiogroup"
      tabIndex={0}
      ref={ref}
      className={classes}
      style={styles}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {characterMap.map((item, index) => (
        <Character
          role="radio"
          aria-posinset={index + 1}
          aria-setsize={max}
          aria-checked={value === index + 1}
          key={index}
          status={item}
          disabled={disabled || readOnly}
          vertical={vertical}
          onClick={(key, event) => handleClick(index, key, event)}
          onKeyDown={event => handleKeyDown(index, event)}
          onMouseMove={(key, event) => handleChangeCharacterMap(index, key, event)}
        >
          {renderCharacter ? renderCharacter(hoverValue, index) : character}
        </Character>
      ))}
    </Component>
  );
});

Rate.displayName = 'Rate';

export default Rate;
