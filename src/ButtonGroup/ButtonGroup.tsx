import React, { useMemo } from 'react';
import ButtonGroupContext from './ButtonGroupContext';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { WithAsProps, Size } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export interface ButtonGroupProps extends WithAsProps {
  /** Display block buttongroups */
  block?: boolean;

  /** A button can show it is currently unable to be interacted with */
  disabled?: boolean;

  /** Add dividing lines between buttons */
  divided?: boolean;

  /** Vertical layouts of button */
  vertical?: boolean;

  /** Horizontal constant width layout */
  justified?: boolean;

  /**
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string;

  /** A button group can have different sizes */
  size?: Size;
}

/**
 * The ButtonGroup component is used to group a series of buttons together in a single line or column.
 * @see https://rsuitejs.com/components/button/#button-group
 */
const ButtonGroup = forwardRef<'div', ButtonGroupProps>((props: ButtonGroupProps, ref) => {
  const { propsWithDefaults } = useCustom('ButtonGroup', props);
  const {
    as: Component = 'div',
    classPrefix = 'btn-group',
    role = 'group',
    className,
    children,
    disabled,
    divided,
    block,
    vertical,
    justified,
    size,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(size, { block, divided, vertical, justified }));
  const contextValue = useMemo(() => ({ size, disabled }), [disabled, size]);

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <Component {...rest} role={role} ref={ref} className={classes}>
        {children}
      </Component>
    </ButtonGroupContext.Provider>
  );
});

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
