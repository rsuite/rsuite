import React, { useCallback, useContext } from 'react';
import CheckIcon from '@rsuite/icons/Check';
import Box, { BoxProps } from '@/internals/Box';
import { RadioTileContext } from '../RadioTileGroup/RadioTileGroup';
import { forwardRef, partitionHTMLProps } from '@/internals/utils';
import { useStyles, useCustom, useControlled, useUniqueId } from '@/internals/hooks';
import type { HTMLPropsWithoutChange } from '@/internals/types';

export interface RadioTileProps<T = string | number> extends BoxProps, HTMLPropsWithoutChange {
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

/**
 * A series of selectable tile components that behave like Radio.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
const RadioTile = forwardRef<'label', RadioTileProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('RadioTile', props);
  const {
    value: groupValue,
    name: nameContext,
    disabled: disabledContext,
    onChange: onGroupChange
  } = useContext(RadioTileContext);

  const {
    as = 'label',
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
  } = propsWithDefaults;

  const [checked, setChecked] = useControlled(
    typeof groupValue !== 'undefined' ? groupValue === value : checkedProp,
    defaultChecked || false
  );

  const [htmlInputProps, restProps] = partitionHTMLProps(rest);
  const { merge, withPrefix, prefix } = useStyles(classPrefix);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(true);
      onGroupChange?.(value, event);
      onChange?.(value, event);
    },
    [onChange, onGroupChange, setChecked, value]
  );

  const classes = merge(className, withPrefix({ checked, disabled }));
  const radioId = useUniqueId('radio-');

  return (
    <Box as={as} ref={ref} className={classes} {...restProps}>
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
    </Box>
  );
});

RadioTile.displayName = 'RadioTile';

export default RadioTile;
