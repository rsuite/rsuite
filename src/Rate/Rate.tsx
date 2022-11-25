import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Star from '@rsuite/icons/legacy/Star';

import { useClassNames, useControlled, shallowEqualArray, SIZE, KEY_VALUES } from '../utils';
import { transformValueToCharacterMap, transformCharacterMapToValue, CharacterType } from './utils';
import Character from './Character';
import Plaintext from '../Plaintext';
import {
  WithAsProps,
  TypeAttributes,
  RsRefForwardingComponent,
  FormControlBaseProps
} from '../@types/common';

export interface RateProps<T = number> extends WithAsProps, FormControlBaseProps<T> {
  // Whether to allow semi selection
  allowHalf?: boolean;

  // custom character of rate
  character?: React.ReactNode;

  // The prefix of the component CSS class
  classPrefix?: string;

  // Whether to allow cancel selection
  cleanable?: boolean;

  /** A tate can have different sizes */
  size?: TypeAttributes.Size;

  /** A tate can have different colors */
  color?: TypeAttributes.Color;

  // Maximum rate
  max?: number;

  // Vertical Rate half
  vertical?: boolean;

  // render coutom character
  renderCharacter?: (value: number, index: number) => React.ReactNode;

  // Callback function when hover state changes
  onChangeActive?: (value: T, event: React.SyntheticEvent) => void;
}

const Rate: RsRefForwardingComponent<'ul', RateProps> = React.forwardRef(
  (props: RateProps, ref) => {
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
      onChange,
      renderCharacter,
      onChangeActive,
      ...rest
    } = props;

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
      withClassPrefix(size, color, { disabled, readonly: readOnly })
    );

    const resetCharacterMap = useCallback(() => {
      setCharacterMap(getCharacterMap());
    }, [getCharacterMap]);

    useEffect(() => {
      // Update characterMap when value is updated.
      setCharacterMap(getCharacterMap(valueProp));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueProp]);

    const handleMouseLeave = useCallback(
      (event: React.SyntheticEvent) => {
        resetCharacterMap();
        onChangeActive?.(value, event);
      },
      [onChangeActive, resetCharacterMap, value]
    );

    const handleChangeValue = useCallback(
      (value: number, event: React.SyntheticEvent) => {
        setValue(value);
        setCharacterMap(getCharacterMap(value));
        onChange?.(value, event);
      },
      [getCharacterMap, onChange, setValue]
    );

    /*  calculate the next value based on the index
        (+1, because array-index starts at 0, while the characterMap-index starts with 1 (0 means "nothing selected")
    */
    const calculateNextValue = useCallback(
      (index: number, key: string) => index + 1 + (allowHalf ? (key === 'before' ? -0.5 : 0) : 0),
      [allowHalf]
    );

    const handleClick = useCallback(
      (index: number, key: string, event: React.SyntheticEvent) => {
        let nextValue = calculateNextValue(index, key);

        if (cleanable && value === nextValue) {
          nextValue = 0;
        }

        if (nextValue !== value) {
          handleChangeValue(nextValue, event);
        }
      },
      [calculateNextValue, cleanable, value, handleChangeValue]
    );

    const handleArrowKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const { key } = event;
        let nextValue = transformCharacterMapToValue(characterMap);

        if (key === KEY_VALUES.RIGHT && nextValue < max) {
          nextValue = allowHalf ? nextValue + 0.5 : nextValue + 1;
        } else if (key === KEY_VALUES.LEFT && nextValue > 0) {
          nextValue = allowHalf ? nextValue - 0.5 : nextValue - 1;
        }

        setCharacterMap(getCharacterMap(nextValue));
      },
      [characterMap, max, allowHalf, setCharacterMap, getCharacterMap]
    );

    const handleEnterKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        let nextValue = transformCharacterMapToValue(characterMap);

        if (cleanable && value === nextValue) {
          nextValue = 0;
        }

        if (nextValue !== value) {
          handleChangeValue(nextValue, event);
        }
      },
      [characterMap, cleanable, value, handleChangeValue]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const { key } = event;

        if (key === KEY_VALUES.RIGHT || key === KEY_VALUES.LEFT) {
          handleArrowKeyDown(event);
        }

        if (key === KEY_VALUES.ENTER) {
          handleEnterKeyDown(event);
        }
      },
      [handleArrowKeyDown, handleEnterKeyDown]
    );

    const handleChangeCharacterMap = useCallback(
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
      },
      [allowHalf, characterMap, onChangeActive]
    );

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
        {...rest}
        ref={ref}
        className={classes}
        onMouseLeave={handleMouseLeave}
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
            onKeyDown={event => handleKeyDown(event)}
            onMouseMove={(key, event) => handleChangeCharacterMap(index, key, event)}
          >
            {renderCharacter ? renderCharacter(hoverValue, index) : character}
          </Character>
        ))}
      </Component>
    );
  }
);

Rate.displayName = 'Rate';
Rate.propTypes = {
  allowHalf: PropTypes.bool,
  character: PropTypes.node,
  classPrefix: PropTypes.string,
  cleanable: PropTypes.bool,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  renderCharacter: PropTypes.func,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(SIZE),
  value: PropTypes.number,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeActive: PropTypes.func
};

export default Rate;
