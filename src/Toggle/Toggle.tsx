import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import { WithAsProps, TypeAttributes } from '../@types/common';

export interface ToggleProps extends WithAsProps {
  /** Wheather to disabled toggle */
  disabled?: boolean;

  /** Checked（Controlled) */
  checked?: boolean;

  /** Default checked */
  defaultChecked?: boolean;

  /** Checked display content */
  checkedChildren?: React.ReactNode;

  /** Unselected display content */
  unCheckedChildren?: React.ReactNode;

  /** Callback function when state changes */
  onChange?: (checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;

  /** Toggle size */
  size?: Omit<TypeAttributes.Size, 'xs'>;
}

const defaultProps: Partial<ToggleProps> = {
  as: 'span',
  classPrefix: 'btn-toggle'
};

const Toggle = React.forwardRef((props: ToggleProps, ref) => {
  const {
    as: Component,
    disabled,
    className,
    checkedChildren,
    unCheckedChildren,
    classPrefix,
    checked: checkedProp,
    defaultChecked,
    size,
    onChange,
    ...rest
  } = props;
  const [checked, setChecked] = useControlled(checkedProp, defaultChecked);

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, { checked, disabled }));
  const inner = checked ? checkedChildren : unCheckedChildren;

  const handleChange = useCallback(
    (event: React.MouseEvent<any>) => {
      if (disabled) {
        return;
      }
      setChecked(!checked);
      onChange?.(!checked, event);
    },
    [checked, disabled, onChange, setChecked]
  );

  return (
    <Component
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={typeof inner === 'string' ? inner : null}
      role="switch"
      {...rest}
      ref={ref}
      className={classes}
      tabIndex={-1}
      onClick={handleChange}
    >
      <span className={prefix('inner')}>{inner}</span>
    </Component>
  );
});

Toggle.displayName = 'Toggle';
Toggle.defaultProps = defaultProps;
Toggle.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Toggle;
