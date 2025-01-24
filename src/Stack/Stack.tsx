import React from 'react';
import StackItem from './StackItem';
import { forwardRef, ReactChildren } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface StackProps extends WithAsProps {
  /**
   * The direction of the children in the stack.
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  /**
   * Define the alignment of the children in the stack on the cross axis
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

  /**
   *  Define the alignment of the children in the stack on the inline axis
   */
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';

  /**
   * Define the spacing between immediate children
   */
  spacing?: number | string | (number | string)[];

  /**
   * Add an element between each child
   */
  divider?: React.ReactNode;

  /**
   * Define whether the children in the stack are forced onto one line or can wrap onto multiple lines
   */
  wrap?: boolean;

  /**
   * The render mode of the children.
   */
  childrenRenderMode?: 'clone' | 'wrap';
}

function isStackItem(child: React.ReactElement<StackProps, React.FunctionComponent>) {
  return child.type === StackItem || child.type?.displayName === 'StackItem';
}

const Subcomponents = {
  Item: StackItem
};

/**
 * The `Stack` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 *
 * @see https://rsuitejs.com/components/stack
 */
const Stack = forwardRef<'div', StackProps, typeof Subcomponents>((props, ref) => {
  const { propsWithDefaults } = useCustom('Stack', props);
  const {
    as: Component = 'div',
    alignItems = 'center',
    classPrefix = 'stack',
    childrenRenderMode = 'wrap',
    className,
    children,
    direction,
    justifyContent,
    spacing,
    divider,
    style,
    wrap,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const styles = {
    alignItems,
    justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: spacing,
    ...style
  };

  /*
   * toArray remove undefined, null and boolean
   */
  const filterChildren = React.Children.toArray(children);

  const count = ReactChildren.count(filterChildren as React.ReactElement[]);

  return (
    <Component {...rest} ref={ref} className={classes} style={styles}>
      {ReactChildren.map(filterChildren as React.ReactElement[], (child, index) => {
        const childNode =
          childrenRenderMode === 'wrap' && !isStackItem(child) ? (
            <StackItem key={index} className={prefix('item')}>
              {child}
            </StackItem>
          ) : (
            React.cloneElement(child, {
              className: merge(prefix('item'), child.props.className)
            })
          );

        return [childNode, index < count - 1 ? divider : null];
      })}
    </Component>
  );
}, Subcomponents);

Stack.displayName = 'Stack';

export default Stack;
