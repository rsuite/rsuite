import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { createContext, useClassNames } from '../utils';
import { StandardProps, TypeAttributes } from '../@types/common';

export const InputGroupContext = createContext(null);

export interface InputGroupProps extends StandardProps {
  /** Sets the composition content internally */
  inside?: boolean;

  /** An Input group can show that it is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** A component can have different sizes */
  size?: TypeAttributes.Size;
}

const InputGroup = React.forwardRef((props: InputGroupProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    classPrefix = 'input-group',
    className,
    disabled,
    inside,
    size,
    children,
    ...rest
  } = props;
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, { inside, focus, disabled }));

  const disabledChildren = () => {
    return React.Children.map(children, item => {
      if (React.isValidElement(item)) {
        return React.cloneElement(item, { disabled: true });
      }
      return item;
    });
  };

  const contextValue = useMemo(() => ({ onFocus: handleFocus, onBlur: handleBlur }), [
    handleFocus,
    handleBlur
  ]);

  return (
    <InputGroupContext.Provider value={contextValue}>
      <div {...rest} ref={ref} className={classes}>
        {disabled ? disabledChildren() : children}
      </div>
    </InputGroupContext.Provider>
  );
});

InputGroup.displayName = 'InputGroup';
InputGroup.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  inside: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs'])
};

const InputGroupWithExtras = {
  ...InputGroup,
  Addon: InputGroupAddon,
  Button: InputGroupButton
};

export default InputGroupWithExtras;
