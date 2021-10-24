import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled, useCustom } from '../utils';
import { WithAsProps, TypeAttributes } from '../@types/common';
import Plaintext from '../Plaintext';
import { ToggleLocale } from '../locales';

export interface ToggleProps extends WithAsProps {
  /** Wheather to disabled toggle */
  disabled?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Make the control readonly */
  readOnly?: boolean;

  /** Checked（Controlled) */
  checked?: boolean;

  /** Default checked */
  defaultChecked?: boolean;

  /** Checked display content */
  checkedChildren?: React.ReactNode;

  /** Unselected display content */
  unCheckedChildren?: React.ReactNode;

  /** Toggle size */
  size?: Omit<TypeAttributes.Size, 'xs'>;

  /** Custom locale */
  locale?: ToggleLocale;

  /** Callback function when state changes */
  onChange?: (checked: boolean, event: React.SyntheticEvent) => void;
}

/**
 * fixme: Should contain an input[type=checkbox]
 */
const Toggle = React.forwardRef((props: ToggleProps, ref) => {
  const {
    as: Component = 'span',
    disabled,
    readOnly,
    plaintext,
    className,
    checkedChildren,
    unCheckedChildren,
    classPrefix = 'btn-toggle',
    checked: checkedProp,
    defaultChecked,
    size,
    locale: localeProp,
    onChange,
    ...rest
  } = props;
  const [checked, setChecked] = useControlled(checkedProp, defaultChecked);
  const { locale } = useCustom<ToggleLocale>('Toggle', localeProp);

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, { checked, disabled }));
  const inner = checked ? checkedChildren : unCheckedChildren;
  const label = checked ? locale.on : locale.off;

  const handleChange = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled || readOnly) {
        return;
      }
      setChecked(!checked);
      onChange?.(!checked, event);
    },
    [checked, disabled, onChange, readOnly, setChecked]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<Element>) => {
      if (event.key !== ' ') {
        return;
      }
      handleChange(event);
      event.preventDefault();
    },
    [handleChange]
  );

  if (plaintext) {
    return <Plaintext>{inner || label}</Plaintext>;
  }

  return (
    <Component
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={typeof inner === 'string' ? inner : label}
      tabIndex={0}
      {...rest}
      ref={ref}
      className={classes}
      onClick={handleChange}
      onKeyDown={handleKeyDown}
    >
      <span className={prefix('inner')}>{inner}</span>
    </Component>
  );
});

Toggle.displayName = 'Toggle';
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
