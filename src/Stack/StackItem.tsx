import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface StackItemProps extends BoxProps {
  /**
   * Define the alignment of the children in the stack on the cross axis
   * @deprecated Use `self` instead
   */
  alignSelf?: React.CSSProperties['alignSelf'];
}

/**
 * The `Stack.Item` component is used to set the layout of the child element in the `Stack` component.
 *
 * @see https://rsuitejs.com/components/stack
 */
const StackItem = forwardRef<'div', StackItemProps>((props, ref) => {
  const { as, classPrefix = 'stack-item', className, alignSelf, self = alignSelf, ...rest } = props;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());

  return <Box as={as} ref={ref} className={classes} self={self} {...rest} />;
});

StackItem.displayName = 'StackItem';

export default StackItem;
