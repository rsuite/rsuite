import React, { useRef } from 'react';
import Plaintext from '@/internals/Plaintext';
import Loader from '../Loader';
import Box, { BoxProps } from '@/internals/Box';
import {
  useStyles,
  useControlled,
  useUniqueId,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useCustom
} from '@/internals/hooks';
import { forwardRef, partitionHTMLProps } from '@/internals/utils';
import useToggleInputActivation from './useToggleInputActivation';
import type { SanitizedInputProps, Color, Size } from '@/internals/types';
import type { ToggleLocale } from '../locales';

export interface ToggleProps extends Omit<BoxProps, 'height' | 'width'>, SanitizedInputProps {
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
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
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
    defaultChecked = false,
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
  const classes = merge(className, withPrefix({}));
  const inner = checked ? checkedChildren : unCheckedChildren;
  const innerLabel = checked ? locale?.on : locale?.off;

  const labelId = useUniqueId('rs-label');
  const innerId = inner ? labelId + '-inner' : undefined;
  const labelledby =
    ariaLabelledby ?? (ariaLabel !== undefined ? undefined : label ? labelId : innerId);

  const [htmlInputProps, restProps] = partitionHTMLProps(rest);
  const { admitActivation, markPrimaryHandled, handleInput } = useToggleInputActivation({
    inputRef,
    controlled: checkedProp !== undefined,
    locked: Boolean(disabled || readOnly || loading),
    setChecked,
    onChange,
    onInput: htmlInputProps.onInput
  });

  const handleInputClick = useEventCallback((e: React.MouseEvent<HTMLInputElement>) => {
    admitActivation(e);
    if (disabled || readOnly || loading) {
      e.currentTarget.checked = checkedProp === undefined ? !e.currentTarget.checked : checked;
      e.preventDefault();
    }
    htmlInputProps.onClick?.(e);
  });

  const handleInputChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    markPrimaryHandled(e);
    if (disabled || readOnly || loading) {
      return;
    }
    const nextChecked = e.target.checked;

    setChecked(nextChecked);
    onChange?.(nextChecked, e);
  });

  const resetSubscription = useRef<{
    input: HTMLInputElement;
    form: HTMLFormElement;
    listener: (event: Event) => void;
  } | null>(null);

  const syncResetChecked = useEventCallback((input: HTMLInputElement, event: Event) => {
    if (!event.defaultPrevented && checkedProp === undefined && inputRef.current === input) {
      setChecked(input.checked);
    }
  });

  useIsomorphicLayoutEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    const subscription = resetSubscription.current;

    if (subscription?.input === input && subscription?.form === form) {
      return;
    }

    subscription?.form.removeEventListener('reset', subscription.listener);
    resetSubscription.current = null;

    if (input && form) {
      const listener = (event: Event) => {
        if (event.target === form && input.form === form) {
          // Reset is cancelable and the native checked value changes after event dispatch.
          setTimeout(() => syncResetChecked(input, event), 0);
        }
      };

      form.addEventListener('reset', listener);
      resetSubscription.current = { input, form, listener };
    }
  });

  useIsomorphicLayoutEffect(() => {
    return () => {
      const subscription = resetSubscription.current;
      subscription?.form.removeEventListener('reset', subscription.listener);
      resetSubscription.current = null;
    };
  }, []);

  if (plaintext) {
    return <Plaintext>{inner || innerLabel}</Plaintext>;
  }

  return (
    <Box
      as={as}
      ref={ref}
      className={classes}
      data-placement={labelPlacement}
      data-color={color}
      data-size={size}
      data-checked={checked}
      data-loading={loading}
      data-disabled={disabled}
      {...restProps}
    >
      <input
        {...htmlInputProps}
        ref={inputRef}
        type="checkbox"
        checked={checkedProp}
        defaultChecked={checkedProp === undefined ? defaultChecked : undefined}
        disabled={disabled}
        readOnly={readOnly}
        onClick={handleInputClick}
        onChange={handleInputChange}
        onInput={handleInput}
        className={prefix('input')}
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-labelledby={labelledby}
        aria-label={ariaLabel ?? (labelledby ? undefined : innerLabel)}
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
