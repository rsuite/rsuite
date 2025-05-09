import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';

export interface InputGroupAddonProps extends BoxProps, React.HTMLAttributes<HTMLSpanElement> {
  /** An Input group addon can show that it is disabled */
  disabled?: boolean;
}

/**
 * The `InputGroup.Addon` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
const InputGroupAddon = forwardRef<'span', InputGroupAddonProps>((props, ref) => {
  const { as = 'span', classPrefix = 'input-group-addon', className, disabled, ...rest } = props;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ disabled }));

  return <Box as={as} {...rest} ref={ref} className={classes} />;
});

InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
