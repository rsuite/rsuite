import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Plaintext from '@/internals/Plaintext';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { oneOf } from '@/internals/propTypes';
import { useCustom } from '../CustomProvider';
import type {
  WithAsProps,
  FormControlBaseProps,
  RsRefForwardingComponent
} from '@/internals/types';
import type { ValueType } from '../Radio';

export interface RadioContextProps {
  inline?: boolean;
  name?: string;
  value?: ValueType | null;
  controlled?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  onChange?: (value: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps<T = ValueType> extends WithAsProps, FormControlBaseProps<T> {
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
const RadioGroup: RsRefForwardingComponent<'div', RadioGroupProps> = React.forwardRef(
  (props: RadioGroupProps, ref) => {
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
      (nextValue: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
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
  }
);

RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = {
  appearance: oneOf(['default', 'picker']),
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  plaintext: PropTypes.bool
};

export default RadioGroup;
