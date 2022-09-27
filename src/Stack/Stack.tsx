import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useCustom, isSupportFlexGap } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
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
}

export interface StackComponent extends RsRefForwardingComponent<'div', StackProps> {
  Item: typeof StackItem;
}

const Stack = React.forwardRef((props: StackProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'div',
    alignItems = 'center',
    classPrefix = 'stack',
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
  const isSupportGridGap = isSupportFlexGap();

  const gridGap = Array.isArray(spacing) ? spacing : [spacing, 0];
  const itemStyles: React.CSSProperties = {
    [rtl ? 'marginLeft' : 'marginRight']: gridGap[0],
    marginBottom: gridGap[1]
  };

  const styles = {
    alignItems,
    justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: isSupportGridGap ? spacing : undefined,
    ...style
  };

  /*
   * toArray remove undefined, null and boolean
   */
  const filterChildren = React.Children.toArray(children);

  const count = filterChildren.length;

  return (
    <Component {...rest} ref={ref} className={classes} style={styles}>
      {React.Children.map(filterChildren as React.ReactElement[], (child, index) => {
        const childNode =
          child.type !== StackItem ? (
            <StackItem
              key={index}
              className={prefix('item')}
              style={!isSupportGridGap ? itemStyles : undefined}
            >
              {child}
            </StackItem>
          ) : (
            React.cloneElement(child, {
              className: merge(prefix('item'), child.props.className),
              style: !isSupportGridGap
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
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around'
  ]),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  divider: PropTypes.node,
  wrap: PropTypes.bool
};

export default Stack;
