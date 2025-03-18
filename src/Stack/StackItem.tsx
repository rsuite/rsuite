import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface StackItemProps extends BoxProps {
  alignSelf?: React.CSSProperties['alignSelf'];
  flex?: React.CSSProperties['flex'];
  grow?: React.CSSProperties['flexGrow'];
  shrink?: React.CSSProperties['flexShrink'];
  basis?: React.CSSProperties['flexBasis'];
  order?: React.CSSProperties['order'];
}

/**
 * The `Stack.Item` component is used to set the layout of the child element in the `Stack` component.
 *
 * @see https://rsuitejs.com/components/stack
 */
const StackItem = forwardRef<'div', StackItemProps>((props, ref) => {
  const {
    as,
    classPrefix = 'stack-item',
    style,
    className,
    alignSelf,
    flex,
    grow,
    shrink,
    order,
    basis,
    ...rest
  } = props;

  const { withPrefix, merge, cssVar } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const styles = mergeStyles(
    style,
    cssVar('align-self', alignSelf),
    cssVar('order', order),
    cssVar('flex', flex),
    cssVar('grow', grow),
    cssVar('shrink', shrink),
    cssVar('basis', basis)
  );

  return <Box as={as} ref={ref} className={classes} style={styles} {...rest} />;
});

StackItem.displayName = 'StackItem';

export default StackItem;
