import React, { useRef } from 'react';
import Plaintext from '@/internals/Plaintext';
import Loader from '../Loader';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useControlled, useUniqueId, useEventCallback } from '@/internals/hooks';
import { forwardRef, partitionHTMLProps } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { SanitizedInputProps, Color, Size } from '@/internals/types';
import type { ToggleLocale } from '../locales';

export interface ToggleProps extends BoxProps, SanitizedInputProps {
  /**
   * The color of the toggle.
   */
  color?: Color;

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
  size?: Size;

  /**
   * Custom locale
   */
  locale?: ToggleLocale;

  /**
   * The label of the toggle switch
   */
  label?: React.ReactNode;

  /**
   * The placement of the label
   * @version 6.0.0
   */
  labelPlacement?: 'start' | 'end';

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
    as = 'label',
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
    size = 'md',
    locale,
    label = children,
    labelPlacement = 'end',
    onChange,
    ...rest
  } = propsWithDefaults;

  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useControlled(checkedProp, defaultChecked);

  const { merge, withPrefix, prefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size, color, { checked, disabled, loading }));
  const inner = checked ? checkedChildren : unCheckedChildren;
  const innerLabel = checked ? locale?.on : locale?.off;

  const labelId = useUniqueId('rs-label');
  const innerId = inner ? labelId + '-inner' : undefined;
  const labelledby = label ? labelId : innerId;

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
    return <Plaintext>{inner || innerLabel}</Plaintext>;
  }

  return (
    <Box as={as} ref={ref} className={classes} data-placement={labelPlacement} {...restProps}>
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
        aria-label={labelledby ? undefined : innerLabel}
        aria-busy={loading || undefined}
      />
      <span className={prefix('track')}>
        {inner && (
          <span className={prefix('inner')} id={innerId}>
            {inner}
          </span>
        )}
        {loading && <Loader className={prefix('loader')} />}
      </span>
      {label && (
        <span className={prefix('label')} id={labelId}>
          {label}
        </span>
      )}
    </Box>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
