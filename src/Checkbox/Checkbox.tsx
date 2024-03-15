import React, { useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useControlled,
  partitionHTMLProps,
  useClassNames,
  useEventCallback,
  useUniqueId,
  mergeRefs
} from '../utils';
import { CheckboxGroupContext } from '../CheckboxGroup';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../@types/common';
import { refType } from '../internals/propTypes';

export type ValueType = string | number;
export interface CheckboxProps<V = ValueType>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The color of the checkbox when checked or indeterminate
   *
   * @version 5.56.0
   */
  color?: TypeAttributes.Color;

  /**
   * Whether to show checkbox
   *
   * @private Used in MultiCascader
   */
  checkable?: boolean;

  /**
   * A checkbox can appear disabled and be unable to change states
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
   * Whether or not checkbox is checked.
   */
  checked?: boolean;

  /**
   * The initial value of checked.
   */
  defaultChecked?: boolean;

  /**
   * Whether or not checkbox is indeterminate.
   */
  indeterminate?: boolean;

  /**
   * Attributes applied to the input element.
   */
  inputProps?: React.HTMLAttributes<HTMLInputElement>;

  /**
   * Pass a ref to the input element.
   */
  inputRef?: React.Ref<any>;

  /**
   * Inline layout
   *
   * @private Used in CheckboxGroup
   */
  inline?: boolean;

  /**
   * The HTML input value.
   */
  value?: V;

  /**
   * Used for the name of the form
   */
  name?: string;

  /**
   * Whether the label is clickable
   *
   * @private Used in MultiCascader
   */
  labelClickable?: boolean;

  /**
   * Called when the user attempts to change the checked state.
   */
  onChange?: (
    value: V | undefined,
    checked: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  /**
   * Called when the checkbox or label is clicked.
   */
  onClick?: (event: React.SyntheticEvent) => void;

  /**
   * Called when the checkbox is clicked.
   *
   * @private Used in MultiCascader
   */
  onCheckboxClick?: (event: React.SyntheticEvent) => void;
}

/**
 * The Checkbox component is used for selecting multiple options from a set.
 * @see https://rsuitejs.com/components/checkbox
 */
const Checkbox: RsRefForwardingComponent<'div', CheckboxProps> = React.forwardRef(
  (props: CheckboxProps, ref) => {
    const checkboxGroupContext = useContext(CheckboxGroupContext);

    const {
      inline: inlineContext,
      name: nameContext,
      disabled: disabledContext,
      readOnly: readOnlyContext,
      plaintext: plaintextContext,
      onChange: onGroupChange
    } = checkboxGroupContext ?? {};

    const {
      as: Component = 'div',
      checked: controlledChecked,
      className,
      children,
      classPrefix = 'checkbox',
      checkable = true,
      color,
      defaultChecked = false,
      title,
      inputRef,
      inputProps,
      indeterminate,
      labelClickable = true,
      tabIndex = 0,
      disabled = disabledContext,
      readOnly = readOnlyContext,
      plaintext = plaintextContext,
      inline = inlineContext,
      name = nameContext,
      value,
      onClick,
      onCheckboxClick,
      onChange,
      ...rest
    } = props;

    const [selfChecked, setSelfChecked, selfControlled] = useControlled(
      controlledChecked,
      defaultChecked
    );

    // Either <Checkbox> is checked itself or by parent <CheckboxGroup>
    const checked = useMemo(() => {
      if (!checkboxGroupContext) {
        return selfChecked;
      }

      // fixme value from group should not be nullable
      return checkboxGroupContext.value?.some(checkedValue => checkedValue === value) ?? false;
    }, [checkboxGroupContext, selfChecked, value]);

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix(color, { inline, indeterminate, disabled, checked })
    );
    const [htmlInputProps, restProps] = partitionHTMLProps(rest);

    // If <Checkbox> is within a <CheckboxGroup>, it's bound to be controlled
    // because its checked state is inferred from group's value, not retrieved from the DOM
    const controlled = checkboxGroupContext ? true : selfControlled;

    if (typeof controlled !== 'undefined') {
      // In uncontrolled situations, use defaultChecked instead of checked
      htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
    }

    const checkboxRef = useRef<HTMLInputElement>(null);

    const handleChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const nextChecked = event.target.checked;

      if (disabled || readOnly) {
        return;
      }

      setSelfChecked(nextChecked);
      onChange?.(value, nextChecked, event);
      onGroupChange?.(value, nextChecked, event);
    });

    const handleLabelClick = useEventCallback((event: React.SyntheticEvent) => {
      // Prevent check when label is not clickable
      if (!labelClickable && event.target !== checkboxRef.current) {
        event.preventDefault();
      }
    });

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
          aria-disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-labelledby={labelId}
          name={name}
          value={value}
          type="checkbox"
          ref={mergeRefs(checkboxRef, inputRef)}
          tabIndex={tabIndex}
          readOnly={readOnly}
          disabled={disabled}
          onClick={onCheckboxClick}
          onChange={handleChange}
        />
        <span className={prefix`inner`} aria-hidden role="presentation" />
      </span>
    );

    return (
      <Component {...restProps} ref={ref} onClick={onClick} className={classes}>
        <div className={prefix`checker`}>
          <label title={title} onClick={handleLabelClick}>
            {checkable ? control : null}
            <span className={prefix`label`} id={labelId}>
              {children}
            </span>
          </label>
        </div>
      </Component>
    );
  }
);

Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  as: PropTypes.elementType,
  checked: PropTypes.bool,
  checkable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  inline: PropTypes.bool,
  indeterminate: PropTypes.bool,
  inputProps: PropTypes.any,
  inputRef: refType,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onCheckboxClick: PropTypes.func
};

export default Checkbox;
