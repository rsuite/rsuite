import React, { useContext } from 'react';
import { RadioContext } from '../RadioGroup/RadioGroup';
import { useClassNames, useControlled, useEventCallback, useUniqueId } from '@/internals/hooks';
import { forwardRef, partitionHTMLProps } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, ColorType } from '@/internals/types';

export interface RadioProps<T = string | number>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The color of the radio when checked
   *
   * @version 5.56.0
   */
  color?: ColorType;

  /**
   * The disable of component
   */
  disabled?: boolean;

  /**
   * Make the control readonly
   */
  readOnly?: boolean;

  /**
   * Render the control as plain text
   */
  plaintext?: boolean;

  /**
   * Specifies whether the radio is selected
   */
  checked?: boolean;

  /**
   * Specifies the initial state: whether or not the radio is selected
   */
  defaultChecked?: boolean;

  /**
   * Attributes applied to the input element
   */
  inputProps?: React.HTMLAttributes<HTMLInputElement>;

  /**
   * Pass a ref to the input element
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /**
   * Value, corresponding to the value of the Radiogroup, to determine whether the
   */
  value?: T;

  /**
   * Name to use for form
   */
  name?: string;

  /**
   * Inline layout.
   *
   * @private Used in RadioGroup
   */
  inline?: boolean;

  /**
   * Callback function with value changed
   */
  onChange?: (
    value: T | undefined,
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

/**
 * The `Radio` component is a simple radio button.
 * @see https://rsuitejs.com/components/radio
 */
const Radio = forwardRef<'div', RadioProps>((props, ref) => {
  const radioContext = useContext(RadioContext);
  const { propsWithDefaults } = useCustom('Radio', props);
  const {
    value: groupValue,
    inline: inlineContext,
    name: nameContext,
    disabled: disabledContext,
    readOnly: readOnlyContext,
    plaintext: plaintextContext,
    onChange: onGroupChange
  } = radioContext ?? {};

  const {
    as: Component = 'div',
    title,
    className,
    children,
    checked: checkedProp,
    color,
    defaultChecked,
    classPrefix = 'radio',
    tabIndex = 0,
    inputRef,
    inputProps,
    disabled = disabledContext,
    readOnly = readOnlyContext,
    plaintext = plaintextContext,
    inline = inlineContext,
    name = nameContext,
    value,
    onChange,
    onClick,
    ...rest
  } = propsWithDefaults;

  const [checked, setChecked, selfControlled] = useControlled(
    typeof groupValue !== 'undefined' ? groupValue === value : checkedProp,
    defaultChecked || false
  );

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(color, { inline, disabled, checked }));
  const [htmlInputProps, restProps] = partitionHTMLProps(rest);

  const handleChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) {
      return;
    }

    setChecked(true);
    onGroupChange?.(value, event);
    onChange?.(value, true, event);
  });

  const controlled = radioContext ? true : selfControlled;

  if (typeof controlled !== 'undefined') {
    // In uncontrolled situations, use defaultChecked instead of checked
    htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
  }

  const labelId = useUniqueId('label-');

  if (plaintext) {
    return checked ? (
      <Component {...restProps} ref={ref} className={classes}>
        {children}
      </Component>
    ) : null;
  }

  const control = (
    <span className={prefix`control`}>
      <input
        {...htmlInputProps}
        {...inputProps}
        aria-labelledby={labelId}
        aria-checked={checked}
        aria-disabled={disabled}
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        tabIndex={tabIndex}
        readOnly={readOnly}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className={prefix`inner`} aria-hidden />
    </span>
  );

  return (
    <Component {...restProps} ref={ref} onClick={onClick} className={classes}>
      <div className={prefix`checker`}>
        {children ? (
          <label title={title}>
            {control}
            <span className={prefix`label`} id={labelId}>
              {children}
            </span>
          </label>
        ) : (
          control
        )}
      </div>
    </Component>
  );
});

Radio.displayName = 'Radio';

export default Radio;
