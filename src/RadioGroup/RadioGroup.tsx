import React, { useMemo } from 'react';
import Plaintext from '@/internals/Plaintext';
import { forwardRef } from '@/internals/utils';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, PrependParameters, FormControlBaseProps } from '@/internals/types';

export interface RadioContextProps {
  inline?: boolean;
  name?: string;
  value?: string | number | null;
  controlled?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  onChange?: PrependParameters<
    React.ChangeEventHandler<HTMLInputElement>,
    [value: string | number | undefined]
  >;
}

export interface RadioGroupProps<T = string | number> extends WithAsProps, FormControlBaseProps<T> {
  /** A radio group can have different appearances */
  appearance?: 'default' | 'picker';

  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

export const RadioContext = React.createContext<RadioContextProps | undefined>(void 0);

/**
 * The `RadioGroup` component is used to group a collection of `Radio` components.
 * @see https://rsuitejs.com/components/radio/#radio-group
 */
const RadioGroup = forwardRef<'div', RadioGroupProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('RadioGroup', props);
  const {
    as: Component = 'div',
    className,
    inline,
    children,
    classPrefix = 'radio-group',
    value: valueProp,
    defaultValue,
    appearance = 'default',
    name,
    plaintext,
    disabled,
    readOnly,
    onChange,
    ...rest
  } = propsWithDefaults;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix(appearance, { inline }));
  const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);

  const handleChange = useEventCallback(
    (nextValue: string | number | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(nextValue);
      onChange?.(nextValue ?? '', event);
    }
  );

  const contextValue = useMemo(
    () => ({
      inline,
      name,
      value: typeof value === 'undefined' ? null : value,
      controlled: isControlled,
      plaintext,
      disabled,
      readOnly,
      onChange: handleChange
    }),
    [disabled, handleChange, inline, isControlled, name, plaintext, readOnly, value]
  );

  return (
    <RadioContext.Provider value={contextValue}>
      {plaintext ? (
        <Plaintext ref={ref} localeKey="notSelected" {...rest}>
          {value ? children : null}
        </Plaintext>
      ) : (
        <Component role="radiogroup" {...rest} ref={ref} className={classes}>
          {children}
        </Component>
      )}
    </RadioContext.Provider>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
