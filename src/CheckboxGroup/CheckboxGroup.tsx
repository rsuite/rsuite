import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import { useClassNames, useControlled, shallowEqual } from '../utils';
import Plaintext from '../Plaintext';
import { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../@types/common';
import { ValueType } from '../Checkbox';

export interface CheckboxGroupProps<V = ValueType[]> extends WithAsProps, FormControlBaseProps<V> {
  /** Used for the name of the form */
  name?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Inline layout */
  inline?: boolean;
}

const defaultProps: Partial<CheckboxGroupProps> = {
  as: 'div',
  classPrefix: 'checkbox-group'
};

export interface CheckboxGroupContextValue {
  inline?: boolean;
  name?: string;
  value?: ValueType[];
  controlled?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  onChange?: (value: any, checked: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void;
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({});

const CheckboxGroup: RsRefForwardingComponent<'div', CheckboxGroupProps> = React.forwardRef(
  (props: CheckboxGroupProps, ref) => {
    const {
      as: Component,
      className,
      inline,
      children,
      name,
      value: valueProp,
      defaultValue,
      classPrefix,
      disabled,
      readOnly,
      plaintext,
      onChange,
      ...rest
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ inline }));
    const [value, setValue, isControlled] = useControlled<ValueType[]>(valueProp, defaultValue);

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
          <Plaintext ref={ref} localeKey="notSelected">
            {value?.length ? children : null}
          </Plaintext>
        ) : (
          <Component {...rest} ref={ref} role="group" className={classes}>
            {children}
          </Component>
        )}
      </CheckboxGroupContext.Provider>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.defaultProps = defaultProps;
CheckboxGroup.propTypes = {
  as: PropTypes.elementType,
  name: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.array,
  classPrefix: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  plaintext: PropTypes.bool
};

export default CheckboxGroup;
