import React, { useCallback, useMemo } from 'react';
import Stack from '../Stack';
import { useClassNames, useControlled } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type {
  WithAsProps,
  FormControlBaseProps,
  RsRefForwardingComponent
} from '@/internals/types';
import type { ValueType } from '../RadioTile';

export interface RadioTileContextProps {
  name?: string;
  value?: ValueType | null;
  controlled?: boolean;
  disabled?: boolean;
  onChange?: (value: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioTileGroupProps<T = ValueType> extends WithAsProps, FormControlBaseProps<T> {
  /** Name to use for form */
  name?: string;

  /** Inline layout */
  inline?: boolean;

  /** Whether radio is disabled */
  disabled?: boolean;

  /** Primary content */
  children?: React.ReactNode;
}

export const RadioTileContext = React.createContext<RadioTileContextProps>({});

/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
const RadioTileGroup: RsRefForwardingComponent<'div', RadioTileGroupProps> = React.forwardRef(
  (props: RadioTileGroupProps, ref) => {
    const { propsWithDefaults } = useCustom('RadioTileGroup', props);
    const {
      as: Component = Stack,
      className,
      inline,
      children,
      classPrefix = 'radio-tile-group',
      disabled,
      value: valueProp,
      defaultValue,
      name,
      onChange,
      ...rest
    } = propsWithDefaults;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    const [value, setValue] = useControlled(valueProp, defaultValue);

    const handleChange = useCallback(
      (nextValue: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(nextValue);
        onChange?.(nextValue as ValueType, event);
      },
      [onChange, setValue]
    );

    const contextValue = useMemo(
      () => ({
        name,
        disabled,
        value: typeof value === 'undefined' ? null : value,
        onChange: handleChange
      }),
      [disabled, handleChange, name, value]
    );

    return (
      <RadioTileContext.Provider value={contextValue}>
        <Component
          alignItems="stretch"
          spacing={10}
          {...rest}
          role="radiogroup"
          childrenRenderMode="clone"
          direction={inline ? 'row' : 'column'}
          ref={ref}
          className={classes}
        >
          {children}
        </Component>
      </RadioTileContext.Provider>
    );
  }
);

RadioTileGroup.displayName = 'RadioTileGroup';

export default RadioTileGroup;
