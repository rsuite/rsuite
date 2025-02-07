import React, { useCallback, useMemo } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import Plaintext from '@/internals/Plaintext';
import { forwardRef, shallowEqual } from '@/internals/utils';
import { useClassNames, useControlled } from '@/internals/hooks';
import { WithAsProps, FormControlBaseProps } from '@/internals/types';
import { CheckboxGroupContext } from './CheckboxGroupContext';
import { useCustom } from '../CustomProvider';

export interface CheckboxGroupProps<V = (string | number)[]>
  extends WithAsProps,
    FormControlBaseProps<V> {
  /** Used for the name of the form */
  name?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Inline layout */
  inline?: boolean;
}

/**
 * The `CheckboxGroup` component is used for selecting multiple options which are unrelated.
 * @see https://rsuitejs.com/components/checkbox/#checkbox-group
 */
const CheckboxGroup = forwardRef<'div', CheckboxGroupProps>((props: CheckboxGroupProps, ref) => {
  const { propsWithDefaults } = useCustom('CheckboxGroup', props);
  const {
    as: Component = 'div',
    className,
    inline,
    children,
    name,
    value: valueProp,
    defaultValue,
    classPrefix = 'checkbox-group',
    disabled,
    readOnly,
    plaintext,
    onChange,
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ inline }));
  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);

  const handleChange = useCallback(
    (itemValue: any, itemChecked: boolean, event: React.SyntheticEvent) => {
      const nextValue = cloneDeep(value) || [];

      if (itemChecked) {
        nextValue.push(itemValue);
      } else {
        remove(nextValue, i => shallowEqual(i, itemValue));
      }

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [onChange, setValue, value]
  );

  const contextValue = useMemo(
    () => ({
      inline,
      name,
      value,
      readOnly,
      disabled,
      plaintext,
      controlled: isControlled,
      onChange: handleChange
    }),
    [disabled, handleChange, inline, isControlled, name, plaintext, readOnly, value]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      {plaintext ? (
        <Plaintext ref={ref} localeKey="notSelected" {...rest}>
          {value?.length ? children : null}
        </Plaintext>
      ) : (
        <Component {...rest} ref={ref} role="group" className={classes}>
          {children}
        </Component>
      )}
    </CheckboxGroupContext.Provider>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
