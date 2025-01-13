import React, { useState, useCallback, useMemo } from 'react';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps, SizeType } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export const InputGroupContext = React.createContext<{
  onFocus: () => void;
  onBlur: () => void;
} | null>(null);

export interface InputGroupProps extends WithAsProps {
  /** Sets the composition content internally */
  inside?: boolean;

  /** An Input group can show that it is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** A component can have different sizes */
  size?: SizeType;
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
    as: Component = 'div',
    classPrefix = 'input-group',
    className,
    disabled,
    inside,
    size,
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

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, { inside, focus, disabled }));

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
    () => ({ onFocus: handleFocus, onBlur: handleBlur }),
    [handleFocus, handleBlur]
  );

  return (
    <InputGroupContext.Provider value={contextValue}>
      <Component {...rest} ref={ref} className={classes}>
        {renderChildren()}
      </Component>
    </InputGroupContext.Provider>
  );
}, Subcomponents);

InputGroup.displayName = 'InputGroup';

export default InputGroup;
