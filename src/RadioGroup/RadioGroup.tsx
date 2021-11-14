import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from '../Radio';
import Plaintext from '../Plaintext';

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

export const RadioContext = React.createContext<RadioContextProps>({});

const RadioGroup: RsRefForwardingComponent<'div', RadioGroupProps> = React.forwardRef(
  (props: RadioGroupProps, ref) => {
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
    } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(appearance, { inline }));
    const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);

    const handleChange = useCallback(
      (nextValue: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(nextValue);
        onChange?.(nextValue ?? '', event);
      },
      [onChange, setValue]
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
          <Plaintext ref={ref} localeKey="notSelected">
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
  appearance: PropTypes.oneOf(['default', 'picker']),
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
