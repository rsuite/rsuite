import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import { WithAsProps, RsRefForwardingComponent, FormControlComponentProps } from '../@types/common';
import { ValueType } from '../Radio';
import Plaintext from '../Plaintext';

export interface RadioContextProps {
  inline?: boolean;
  name?: string;
  value?: ValueType;
  controlled?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  onChange?: FormControlComponentProps['onChange'];
}

export interface RadioGroupProps<T = ValueType> extends WithAsProps, FormControlComponentProps<T> {
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
      as: Component,
      className,
      inline,
      children,
      classPrefix,
      value: valueProp,
      defaultValue,
      appearance,
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
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChange?.(event);
      },
      [onChange, setValue]
    );

    const contextValue = useMemo<RadioContextProps>(
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

const defaultProps: Partial<RadioGroupProps> = {
  as: 'div',
  appearance: 'default',
  classPrefix: 'radio-group'
};

RadioGroup.displayName = 'RadioGroup';
RadioGroup.defaultProps = defaultProps;
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
