import React, { useCallback, useMemo } from 'react';
import Stack from '../Stack';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom, useControlled } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { FormControlBaseProps } from '@/internals/types';

export interface RadioTileContextProps {
  name?: string;
  value?: number | string | null;
  controlled?: boolean;
  disabled?: boolean;
  onChange?: (
    value: number | string | undefined,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface RadioTileGroupProps<T = number | string>
  extends BoxProps,
    FormControlBaseProps<T> {
  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Whether radio is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

export const RadioTileContext = React.createContext<RadioTileContextProps>({});

/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
const RadioTileGroup = forwardRef<'div', RadioTileGroupProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('RadioTileGroup', props);
  const {
    as = Stack,
    className,
    inline,
    children,
    classPrefix = 'radio-tile-group',
    disabled,
    value: valueProp,
    defaultValue,
    name,
    onChange,
    ...rest
  } = propsWithDefaults;
  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const [value, setValue] = useControlled(valueProp, defaultValue);

  const handleChange = useCallback(
    (nextValue: number | string | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(nextValue);
      onChange?.(nextValue as number | string, event);
    },
    [onChange, setValue]
  );

  const contextValue = useMemo(
    () => ({
      name,
      disabled,
      value: typeof value === 'undefined' ? null : value,
      onChange: handleChange
    }),
    [disabled, handleChange, name, value]
  );

  return (
    <RadioTileContext.Provider value={contextValue}>
      <Box
        as={as}
        alignItems="stretch"
        spacing={10}
        role="radiogroup"
        direction={inline ? 'row' : 'column'}
        ref={ref}
        className={classes}
        {...rest}
      >
        {children}
      </Box>
    </RadioTileContext.Provider>
  );
});

RadioTileGroup.displayName = 'RadioTileGroup';

export default RadioTileGroup;
