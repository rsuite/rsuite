import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioContext } from '../RadioGroup/RadioGroup';

import { useClassNames, useControlled, refType } from '../utils';
import { WithAsProps } from '../@types/common';

export interface RadioProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** HTML title */
  title?: string;

  /** The disable of component */
  disabled?: boolean;

  /** Specifies whether the radio is selected */
  checked?: boolean;

  /** Specifies the initial state: whether or not the radio is selected */
  defaultChecked?: boolean;

  /** Attributes applied to the input element. */
  inputProps?: React.HTMLAttributes<HTMLInputElement>;

  /** Pass a ref to the input element */
  inputRef?: React.Ref<HTMLInputElement>;

  /** Value, corresponding to the value of the Radiogroup, to determine whether the */
  value?: T;

  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** Callback function with value changed */
  onChange?: (value: T, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

const defaultProps: Partial<RadioProps> = {
  as: 'div',
  classPrefix: 'radio',
  tabIndex: 0
};

const Radio = React.forwardRef((props: RadioProps, ref) => {
  const {
    as: Component,
    title,
    className,
    children,
    disabled,
    checked: checkedProp,
    defaultChecked,
    classPrefix,
    tabIndex,
    inputRef,
    inputProps,
    inline: inlineProp,
    name: nameProp,
    value,
    onChange,
    onClick,
    ...rest
  } = props;

  const { inline, name, value: groupValue, onChange: onGroupChange } = useContext(RadioContext) || {
    inline: inlineProp,
    name: nameProp
  };

  const [checked, setChecked] = useControlled(
    typeof groupValue !== 'undefined' ? groupValue === value : checkedProp,
    defaultChecked || false
  );

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ inline, disabled, checked }));

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        return;
      }

      setChecked(true);
      onGroupChange?.(value, event);
      onChange?.(value, true, event);
    },
    [disabled, onChange, onGroupChange, setChecked, value]
  );

  const input = (
    <span className={prefix('wrapper')}>
      <input
        {...inputProps}
        ref={inputRef}
        type="radio"
        checked={checked}
        name={name}
        tabIndex={tabIndex}
        disabled={disabled}
        onChange={handleChange}
        onClick={useCallback(event => event.stopPropagation(), [])}
      />
      <span className={prefix('inner')} aria-hidden />
    </span>
  );

  return (
    <Component
      {...rest}
      ref={ref}
      onClick={onClick}
      className={classes}
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <div className={prefix('checker')}>
        <label title={title}>
          {input}
          {children}
        </label>
      </div>
    </Component>
  );
});

Radio.displayName = 'Radio';
Radio.defaultProps = defaultProps;
Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inline: PropTypes.bool,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  inputProps: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  value: PropTypes.any,
  inputRef: refType,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number
};
export default Radio;
