import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import CloseButton from '../CloseButton';
import { createChainedFunction, useClassNames } from '../utils';
import { RsRefForwardingComponent } from '../@types/common';
import Plaintext from '../Plaintext';

type ValueType = string | number;

export interface PickerToggleProps extends ToggleButtonProps {
  value?: ValueType | ValueType[];
  id?: string;
  hasValue?: boolean;
  cleanable?: boolean;
  caret?: boolean;
  active?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  tabIndex?: number;
  onClean?: (event: React.MouseEvent) => void;
}

const PickerToggle: RsRefForwardingComponent<
  typeof ToggleButton,
  PickerToggleProps
> = React.forwardRef((props: PickerToggleProps, ref) => {
  const {
    active: activeProp,
    as: Component = ToggleButton,
    classPrefix = 'picker-toggle',
    children,
    caret = true,
    className,
    disabled,
    readOnly,
    plaintext,
    hasValue,
    cleanable: cleanableProp,
    tabIndex = 0,
    id,
    value,
    onClean,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [activeState, setActive] = useState(false);
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

  const classes = merge(
    className,
    withClassPrefix({
      active: activeProp || activeState
    })
  );

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  const handleClean = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      onClean?.(event);
      handleBlur();
    },
    [onClean, handleBlur]
  );

  if (plaintext) {
    if (hasValue && !children) {
      return null;
    }
    return (
      <Plaintext ref={ref} localeKey="notSelected">
        {children}
      </Plaintext>
    );
  }

  const cleanable = cleanableProp && hasValue && !readOnly && !plaintext;

  return (
    <Component
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={activeProp}
      aria-disabled={disabled}
      aria-owns={id ? `${id}-listbox` : undefined}
      {...rest}
      ref={ref}
      tabIndex={tabIndex}
      className={classes}
      onFocus={!disabled ? createChainedFunction(handleFocus, onFocus) : null}
      onBlur={!disabled ? createChainedFunction(handleBlur, onBlur) : null}
    >
      <input
        id={id}
        aria-hidden
        aria-controls={id ? `${id}-listbox` : undefined}
        tabIndex={-1}
        className={prefix`native-input`}
        value={Array.isArray(value) ? value.join(',') : value}
        readOnly
      />
      <span
        className={prefix(hasValue ? 'value' : 'placeholder')}
        aria-placeholder={typeof children === 'string' ? children : null}
      >
        {children}
      </span>
      {cleanable && <CloseButton className={prefix`clean`} tabIndex={-1} onClick={handleClean} />}
      {caret && <span className={prefix`caret`} aria-hidden />}
    </Component>
  );
});

PickerToggle.displayName = 'PickerToggle';
PickerToggle.propTypes = {
  classPrefix: PropTypes.string,
  hasValue: PropTypes.bool,
  cleanable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  caret: PropTypes.bool,
  as: PropTypes.elementType,
  onClean: PropTypes.func,
  active: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  plaintext: PropTypes.bool
};

export default PickerToggle;
