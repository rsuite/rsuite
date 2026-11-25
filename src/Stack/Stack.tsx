import React, { CSSProperties } from 'react';
import StackItem from './StackItem';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { WithResponsive } from '@/internals/types';

export interface StackProps extends BoxProps {
  /** The direction of the children in the stack */
  direction?: WithResponsive<CSSProperties['flexDirection']>;

  /** Add an element between each child */
  divider?: React.ReactNode;

  /** Define whether the children in the stack are forced onto one line or can wrap onto multiple lines */
  wrap?: boolean;
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
    as,
    classPrefix = 'stack',
    className,
    children,
    direction,
    divider,
    wrap,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge, responsive } = useStyles(classPrefix);
  const baseClasses = merge(className, withPrefix(), ...responsive(direction));

  const filteredChildren = React.Children.toArray(children);
  const childCount = filteredChildren.length;

  return (
    <Box as={as} ref={ref} className={baseClasses} data-wrap={wrap} {...rest}>
      {filteredChildren.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childCount - 1 && divider}
        </React.Fragment>
      ))}
    </Box>
  );
}, Subcomponents);

Stack.displayName = 'Stack';

export default Stack;
