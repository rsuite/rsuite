import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useControlled } from '../utils';
import { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from '../Radio';

export interface RadioContextProps {
  inline?: boolean;
  name?: string;
  value?: ValueType;
  controlled?: boolean;
  onChange?: (value: ValueType, event: React.SyntheticEvent<HTMLInputElement>) => void;
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
      as: Component,
      className,
      inline,
      children,
      classPrefix,
      value: valueProp,
      defaultValue,
      appearance,
      name,
      onChange,
      ...rest
    } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(appearance, { inline }));
    const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);

    const handleChange = useCallback(
      (nextValue: ValueType, event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(nextValue);
        onChange?.(nextValue, event);
      },
      [onChange, setValue]
    );

    const contextValue = useMemo(
      () => ({
        inline,
        name,
        value: typeof value === 'undefined' ? null : value,
        controlled: isControlled,
        onChange: handleChange
      }),
      [handleChange, inline, isControlled, name, value]
    );

    return (
      <RadioContext.Provider value={contextValue}>
        <Component role="radiogroup" {...rest} ref={ref} className={classes}>
          {children}
        </Component>
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
  onChange: PropTypes.func
};

export default RadioGroup;
