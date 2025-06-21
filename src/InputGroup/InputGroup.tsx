import React, { useState, useCallback, useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import { InputGroupContext } from './InputGroupContext';
import type { Size } from '@/internals/types';

export interface InputGroupProps extends BoxProps {
  /** Sets the composition content internally */
  inside?: boolean;

  /** An Input group can show that it is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** A component can have different sizes */
  size?: Size;
}

const Subcomponents = {
  Addon: InputGroupAddon,
  Button: InputGroupButton
};

/**
 * The `InputGroup` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
const InputGroup = forwardRef<'div', InputGroupProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('InputGroup', props);
  const {
    as,
    classPrefix = 'input-group',
    className,
    disabled,
    inside,
    size = 'md',
    children,
    ...rest
  } = propsWithDefaults;
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size, { inside, focus, disabled }));

  const renderChildren = useCallback(() => {
    return React.Children.map(children, item => {
      if (React.isValidElement(item)) {
        if (React.isValidElement(item)) {
          // Fix: Add type assertion to pass the disabled prop to the child element
          return disabled ? React.cloneElement(item, { disabled } as { disabled?: boolean }) : item;
        }
      }
      return item;
    });
  }, [children, disabled]);

  const contextValue = useMemo(
    () => ({ size, onFocus: handleFocus, onBlur: handleBlur }),
    [size, handleFocus, handleBlur]
  );

  return (
    <InputGroupContext.Provider value={contextValue}>
      <Box as={as} {...rest} ref={ref} className={classes}>
        {renderChildren()}
      </Box>
    </InputGroupContext.Provider>
  );
}, Subcomponents);

InputGroup.displayName = 'InputGroup';

export default InputGroup;
