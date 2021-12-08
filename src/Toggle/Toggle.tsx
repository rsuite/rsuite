import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled, useCustom } from '../utils';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import Plaintext from '../Plaintext';
import { ToggleLocale } from '../locales';
import Loader from '../Loader';

export interface ToggleProps extends WithAsProps {
  /** Wheather to disabled toggle */
  disabled?: boolean;

  /** Render the control as plain text */
  plaintext?: boolean;

  /** Make the control readonly */
  readOnly?: boolean;

  /** Whether the checked state is being updated */
  loading?: boolean;

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
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: RsRefForwardingComponent<'label', ToggleProps> = React.forwardRef<
  HTMLLabelElement,
  ToggleProps
>((props, ref) => {
  const {
    as: Component = 'span',
    disabled,
    readOnly,
    loading = false,
    plaintext,
    className,
    checkedChildren,
    unCheckedChildren,
    classPrefix = 'toggle',
    checked: checkedProp,
    defaultChecked,
    size,
    locale: localeProp,
    onChange,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useControlled(checkedProp, defaultChecked);
  const { locale } = useCustom<ToggleLocale>('Toggle', localeProp);

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, { checked, disabled, loading }));
  const inner = checked ? checkedChildren : unCheckedChildren;
  const label = checked ? locale.on : locale.off;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }
      const { checked } = e.target;

      setChecked(checked);
      onChange?.(checked, e);
    },
    [disabled, readOnly, setChecked, onChange]
  );

  if (plaintext) {
    return <Plaintext>{inner || label}</Plaintext>;
  }

  return (
    <label ref={ref} className={classes} {...rest}>
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleInputChange}
        className={prefix('input')}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={typeof inner === 'string' ? inner : label}
        aria-busy={loading || undefined}
      />
      <Component className={prefix('presentation')}>
        <span className={prefix('inner')}>{inner}</span>
        {loading && <Loader className={prefix('loader')} />}
      </Component>
    </label>
  );
});

Toggle.displayName = 'Toggle';
Toggle.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  loading: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  as: PropTypes.elementType,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  locale: PropTypes.shape({
    on: PropTypes.string,
    off: PropTypes.string
  })
};

export default Toggle;
