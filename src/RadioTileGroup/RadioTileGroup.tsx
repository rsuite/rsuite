import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from '../RadioTile';
import Stack from '../Stack';

export interface RadioTileContextProps {
  name?: string;
  value?: ValueType | null;
  controlled?: boolean;
  onChange?: (value: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioTileGroupProps<T = ValueType> extends WithAsProps, FormControlBaseProps<T> {
  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

export const RadioTileContext = React.createContext<RadioTileContextProps>({});

const RadioTileGroup: RsRefForwardingComponent<'div', RadioTileGroupProps> = React.forwardRef(
  (props: RadioTileGroupProps, ref) => {
    const {
      as: Component = Stack,
      className,
      inline,
      children,
      classPrefix = 'radio-tile-group',
      value: valueProp,
      defaultValue,
      name,
      onChange,
      ...rest
    } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const [value, setValue] = useControlled(valueProp, defaultValue);

    const handleChange = useCallback(
      (nextValue: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(nextValue);
        onChange?.(nextValue ?? '', event);
      },
      [onChange, setValue]
    );

    const contextValue = useMemo(
      () => ({
        name,
        value: typeof value === 'undefined' ? null : value,
        onChange: handleChange
      }),
      [handleChange, name, value]
    );

    return (
      <RadioTileContext.Provider value={contextValue}>
        <Component
          {...rest}
          role="radiogroup"
          childrenRenderMode="clone"
          spacing={10}
          direction={inline ? 'row' : 'column'}
          alignItems="stretch"
          ref={ref}
          className={classes}
        >
          {children}
        </Component>
      </RadioTileContext.Provider>
    );
  }
);

RadioTileGroup.displayName = 'RadioTileGroup';
RadioTileGroup.propTypes = {
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};

export default RadioTileGroup;
