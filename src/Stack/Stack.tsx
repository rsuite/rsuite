import React from 'react';
import PropTypes from 'prop-types';
import { isSupportFlexGap, ReactChildren } from '@/internals/utils';
import { oneOf } from '@/internals/propTypes';
import { useClassNames, useCustom } from '@/internals/hooks';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import StackItem from './StackItem';

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

  /** Define the spacing between immediate children */
  spacing?: number | string | (number | string)[];

  /** Add an element between each child */
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

export interface StackComponent extends RsRefForwardingComponent<'div', StackProps> {
  Item: typeof StackItem;
}

/**
 * The `Stack` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 *
 * @see https://rsuitejs.com/components/stack
 */
const Stack = React.forwardRef((props: StackProps, ref: React.Ref<HTMLDivElement>) => {
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
  } = props;

  const { rtl } = useCustom('Stack');
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());
  const isSupportGap = isSupportFlexGap();

  const flexGap = Array.isArray(spacing) ? spacing : [spacing, spacing];
  const itemStyles: React.CSSProperties = {
    [rtl ? 'marginLeft' : 'marginRight']: flexGap[0],
    marginBottom: flexGap[1]
  };

  const styles = {
    alignItems,
    justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: isSupportGap ? spacing : undefined,
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
          childrenRenderMode === 'wrap' && child.type !== StackItem ? (
            <StackItem
              key={index}
              className={prefix('item')}
              style={!isSupportGap ? itemStyles : undefined}
            >
              {child}
            </StackItem>
          ) : (
            React.cloneElement(child, {
              className: merge(prefix('item'), child.props.className),
              style: !isSupportGap
                ? {
                    ...itemStyles,
                    ...child.props.style
                  }
                : child.props.style
            })
          );

        return [childNode, index < count - 1 ? divider : null];
      })}
    </Component>
  );
}) as unknown as StackComponent;

Stack.Item = StackItem;

Stack.displayName = 'Stack';
Stack.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  direction: oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justifyContent: oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  divider: PropTypes.node,
  wrap: PropTypes.bool
};

export default Stack;
