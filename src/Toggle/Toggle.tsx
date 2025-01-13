import React, { useRef } from 'react';
import Plaintext from '@/internals/Plaintext';
import Loader from '../Loader';
import { useClassNames, useControlled, useUniqueId, useEventCallback } from '@/internals/hooks';
import { forwardRef, partitionHTMLProps } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, ColorType, SizeType } from '@/internals/types';
import type { ToggleLocale } from '../locales';

export interface ToggleProps
  extends WithAsProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * The color of the toggle.
   */
  color?: ColorType;

  /**
   * Whether to disabled toggle
   */
  disabled?: boolean;

  /**
   * Render the control as plain text
   */
  plaintext?: boolean;

  /**
   * Make the control readonly
   */
  readOnly?: boolean;

  /**
   * Whether the checked state is being updated
   */
  loading?: boolean;

  /**
   * Whether the toggle is checked （Controlled)
   */
  checked?: boolean;

  /**
   * Whether the toggle is checked (Uncontrolled)
   */
  defaultChecked?: boolean;

  /**
   * Checked display content
   */
  checkedChildren?: React.ReactNode;

  /**
   * Unchecked display content
   */
  unCheckedChildren?: React.ReactNode;

  /**
   * The size of the toggle
   */
  size?: Omit<SizeType, 'xs'>;

  /**
   * Custom locale
   */
  locale?: ToggleLocale;

  /**
   * Called when the state of the toggle changes
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * The `Toggle` component is used to activate or deactivate an element.
 *
 * @see https://rsuitejs.com/components/toggle
 */
const Toggle = forwardRef<'label', ToggleProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Toggle', props);
  const {
    as: Component = 'span',
    disabled,
    readOnly,
    loading = false,
    plaintext,
    children,
    className,
    color,
    checkedChildren,
    unCheckedChildren,
    classPrefix = 'toggle',
    checked: checkedProp,
    defaultChecked,
    size,
    locale,
    onChange,
    ...rest
  } = propsWithDefaults;

  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useControlled(checkedProp, defaultChecked);

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(size, color, { checked, disabled, loading }));
  const inner = checked ? checkedChildren : unCheckedChildren;
  const label = checked ? locale?.on : locale?.off;

  const labelId = useUniqueId('rs-label');
  const innerId = inner ? labelId + '-inner' : undefined;
  const labelledby = children ? labelId : innerId;

  const [htmlInputProps, restProps] = partitionHTMLProps(rest);

  const handleInputChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly || loading) {
      return;
    }
    const { checked } = e.target;

    setChecked(checked);
    onChange?.(checked, e);
  });

  if (plaintext) {
    return <Plaintext>{inner || label}</Plaintext>;
  }

  return (
    <label ref={ref} className={classes} {...restProps}>
      <input
        {...htmlInputProps}
        ref={inputRef}
        type="checkbox"
        checked={checkedProp}
        defaultChecked={defaultChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleInputChange}
        className={prefix('input')}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-labelledby={labelledby}
        aria-label={labelledby ? undefined : label}
        aria-busy={loading || undefined}
      />
      <Component className={prefix('presentation')}>
        <span className={prefix('inner')} id={innerId}>
          {inner}
        </span>
        {loading && <Loader className={prefix('loader')} />}
      </Component>
      {children && (
        <span className={prefix('label')} id={labelId}>
          {children}
        </span>
      )}
    </label>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
