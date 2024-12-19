import React from 'react';
import { WithAsProps } from '@/internals/types';

export interface StackItemProps extends WithAsProps {
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
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
export default function StackItem(props: StackItemProps) {
  const {
    as: Component = 'div',
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

  return (
    <Component
      className={className}
      style={{
        alignSelf,
        order,
        ...(flex ? { flex } : { flexGrow: grow, flexShrink: shrink, flexBasis: basis }),
        ...style
      }}
      {...rest}
    />
  );
}

StackItem.displayName = 'StackItem';
