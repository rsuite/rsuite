import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@rsuite/icons/Check';
import Stack from '../Stack';
import { RadioTileContext } from '../RadioTileGroup/RadioTileGroup';
import { useClassNames, useControlled, partitionHTMLProps } from '../utils';
import useUniqueId from '../utils/useUniqueId';
import { WithAsProps } from '../@types/common';

export type ValueType = string | number;

export interface RadioTileProps<T = ValueType>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Additional description, if needed*/
  children?: React.ReactNode;

  /** Specifies whether the radio is selected */
  checked?: boolean;

  /** Specifies the initial state: whether or not the radio is selected */
  defaultChecked?: boolean;

  /** Whether the Radio is disabled */
  disabled?: boolean;

  /** Label of the Radio tile */
  label?: React.ReactNode;

  /** Icon to be used */
  icon?: React.ReactNode;

  /** Name to use for form */
  name?: string;

  /** Value, corresponding to the value of the RadioTileGroup, to determine whether the */
  value?: T;

  /** Callback function with value changed */
  onChange?: (value?: T, event?: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioTile = React.forwardRef((props: RadioTileProps, ref) => {
  const {
    value: groupValue,
    name: nameContext,
    disabled: disabledContext,
    onChange: onGroupChange
  } = useContext(RadioTileContext);

  const {
    as: Component = Stack,
    children,
    classPrefix = 'radio-tile',
    checked: checkedProp,
    className,
    defaultChecked,
    disabled = disabledContext,
    icon,
    value,
    label,
    name = nameContext,
    tabIndex = 0,
    onChange,
    ...rest
  } = props;

  const [checked, setChecked] = useControlled(
    typeof groupValue !== 'undefined' ? groupValue === value : checkedProp,
    defaultChecked || false
  );

  const [htmlInputProps, restProps] = partitionHTMLProps(rest);
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(true);
      onGroupChange?.(value, event);
      onChange?.(value, event);
    },
    [onChange, onGroupChange, setChecked, value]
  );

  const classes = merge(className, withClassPrefix({ checked, disabled }));
  const radioId = useUniqueId('radio-');

  return (
    <Component
      spacing={6}
      {...restProps}
      childrenRenderMode="clone"
      ref={ref}
      className={classes}
      as="label"
    >
      <div className={prefix('icon')}>{icon}</div>
      <div className={prefix('body')}>
        <input
          {...htmlInputProps}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          tabIndex={tabIndex}
          disabled={disabled}
          onChange={handleChange}
          aria-checked={checked}
          aria-disabled={disabled}
          aria-labelledby={`${radioId}-label`}
          aria-describedby={`${radioId}-desc`}
        />
        <div className={prefix('label')} id={`${radioId}-label`}>
          {label}
        </div>
        <div className={prefix('content')} id={`${radioId}-desc`}>
          {children}
        </div>
        <div className={prefix('mark')}>
          <CheckIcon className={prefix('mark-icon')} />
        </div>
      </div>
    </Component>
  );
});

RadioTile.displayName = 'RadioTile';
RadioTile.propTypes = {
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

export default RadioTile;
