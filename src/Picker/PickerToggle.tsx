import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import CloseButton from '../CloseButton';
import { createChainedFunction, useClassNames } from '../utils';
import { RsRefForwardingComponent } from '../@types/common';

export interface PickerToggleProps extends ToggleButtonProps {
  hasValue?: boolean;
  cleanable?: boolean;
  caret?: boolean;
  active?: boolean;
  disabled?: boolean;
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
    hasValue,
    cleanable,
    tabIndex = 0,
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

  return (
    <Component
      role="combobox"
      aria-haspopup
      aria-expanded={activeProp}
      aria-disabled={disabled}
      {...rest}
      ref={ref}
      tabIndex={tabIndex}
      className={classes}
      onFocus={!disabled ? createChainedFunction(handleFocus, onFocus) : null}
      onBlur={!disabled ? createChainedFunction(handleBlur, onBlur) : null}
    >
      <span className={prefix(hasValue ? 'value' : 'placeholder')}>{children}</span>
      {hasValue && cleanable && (
        <CloseButton className={prefix`clean`} tabIndex={-1} onClick={handleClean} />
      )}
      {caret && <span className={prefix`caret`} aria-hidden="true" />}
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
  active: PropTypes.bool
};

export default PickerToggle;
