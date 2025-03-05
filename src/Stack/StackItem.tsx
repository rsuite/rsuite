import React from 'react';
import { forwardRef, mergeStyles } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';

export interface StackItemProps extends WithAsProps {
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
    as: Component = 'div',
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

  const { withClassPrefix, merge, cssVar } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const styles = mergeStyles(
    style,
    cssVar('align-self', alignSelf),
    cssVar('order', order),
    cssVar('flex', flex),
    cssVar('grow', grow),
    cssVar('shrink', shrink),
    cssVar('basis', basis)
  );

  return <Component ref={ref} className={classes} style={styles} {...rest} />;
});

StackItem.displayName = 'StackItem';

export default StackItem;
