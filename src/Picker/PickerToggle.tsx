import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { StandardProps } from '../@types/common';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import { createChainedFunction, useClassNames } from '../utils';

export interface PickerToggleProps extends StandardProps, ToggleButtonProps {
  classPrefix?: string;
  hasValue?: boolean;
  cleanable?: boolean;
  className?: string;
  caret?: boolean;
  onClean?: (event: React.MouseEvent) => void;
  cleanButtonTitle?: string;
  active?: boolean;
  tabIndex?: number;
}

const PickerToggle = React.forwardRef(
  (props: PickerToggleProps, ref: React.Ref<HTMLButtonElement>) => {
    const {
      active,
      as: Component = ToggleButton,
      classPrefix = 'picker-toggle',
      children,
      caret = true,
      className,
      hasValue,
      cleanable,
      tabIndex = 0,
      cleanButtonTitle,
      onClean,
      ...rest
    } = props;

    const [activeState, setActive] = useState(false);
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

    const classes = merge(
      className,
      withClassPrefix({
        active: active || activeState
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
        {...rest}
        ref={ref}
        tabIndex={tabIndex}
        className={classes}
        onFocus={createChainedFunction(handleFocus, get(rest, 'onFocus'))}
        onBlur={createChainedFunction(handleBlur, get(rest, 'onBlur'))}
      >
        <span className={prefix(hasValue ? 'value' : 'placeholder')}>{children}</span>
        {hasValue && cleanable && (
          <span
            className={prefix`clean`}
            role="button"
            tabIndex={-1}
            onClick={handleClean}
            title={cleanButtonTitle}
            aria-label={cleanButtonTitle}
          >
            <span aria-hidden="true">×</span>
          </span>
        )}
        {caret && <span className={prefix`caret`} />}
      </Component>
    );
  }
);

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
