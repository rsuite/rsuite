import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface InputGroupAddonProps extends WithAsProps, React.HTMLAttributes<HTMLSpanElement> {
  /** An Input group addon can show that it is disabled */
  disabled?: boolean;
}

/**
 * The `InputGroup.Addon` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
const InputGroupAddon = forwardRef<'span', InputGroupAddonProps>((props, ref) => {
  const {
    as: Component = 'span',
    classPrefix = 'input-group-addon',
    className,
    disabled,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ disabled }));

  return <Component {...rest} ref={ref} className={classes} />;
});

InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
