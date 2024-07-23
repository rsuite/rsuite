import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { WithAsProps } from '@/internals/types';
import { oneOf } from '@/internals/propTypes';
import { useClassNames } from '@/internals/hooks';

export interface StackItemProps extends WithAsProps {
  /**
   * Specifies the alignment of the item along the cross axis.
   */
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

  /**
   * Specifies the flex property of the item.
   */
  flex?: CSSProperties['flex'];

  /**
   * Specifies the flex grow property of the item.
   */
  grow?: CSSProperties['flexGrow'];

  /**
   * Specifies the flex shrink property of the item.
   */
  shrink?: CSSProperties['flexShrink'];

  /**
   * Specifies the flex basis property of the item.
   */
  basis?: CSSProperties['flexBasis'];

  /**
   * Specifies the order property of the item.
   */
  order?: CSSProperties['order'];
}

/**
 * The `Stack.Item` component is used to set the layout of the child element in the `Stack` component.
 *
 * @see https://rsuitejs.com/components/stack
 */
export default function StackItem(props: StackItemProps) {
  const {
    as: Component = 'div',
    classPrefix = 'stack',
    className,
    style,
    alignSelf,
    flex,
    grow,
    shrink,
    order,
    basis,
    ...rest
  } = props;

  const mergedStyle = {
    alignSelf,
    order,
    flex,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    ...style
  };

  const { baseClassName } = useClassNames(classPrefix, className);

  return <Component style={mergedStyle} className={baseClassName} {...rest} />;
}

StackItem.displayName = 'StackItem';
StackItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  alignSelf: oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.number,
  shrink: PropTypes.number,
  order: PropTypes.number,
  basis: PropTypes.string
};
