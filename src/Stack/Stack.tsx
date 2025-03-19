import React, { CSSProperties } from 'react';
import StackItem from './StackItem';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { ResponsiveValue } from '@/internals/types';

interface DeprecatedStackProps {
  /**
   * Define the alignment of the children in the stack on the inline axis
   * @deprecated  Use `justify` instead
   */
  justifyContent?: CSSProperties['justifyContent'];
  /**
   * Define the alignment of the children in the stack on the cross axis
   * @deprecated  Use `align` instead
   */
  alignItems?: CSSProperties['alignItems'];
}

export interface StackProps extends BoxProps, DeprecatedStackProps {
  /** Define the alignment of the children in the stack on the cross axis */
  align?: CSSProperties['alignItems'];

  /** The direction of the children in the stack */
  direction?: CSSProperties['flexDirection'] | ResponsiveValue<CSSProperties['flexDirection']>;

  /** Define the alignment of the children in the stack on the inline axis */
  justify?: CSSProperties['justifyContent'];

  /** Define the spacing between immediate children */
  spacing?: number | string | (number | string)[];

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
    alignItems,
    align = alignItems,
    classPrefix = 'stack',
    className,
    children,
    direction,
    justifyContent,
    justify = justifyContent,
    spacing,
    divider,
    style,
    wrap,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge, cssVar, responsive } = useStyles(classPrefix);
  const classes = merge(className, withPrefix(), ...responsive(direction));

  const styles = mergeStyles(
    style,
    cssVar('spacing', spacing, getCssValue),
    cssVar('align', align),
    cssVar('justify', justify),
    cssVar('wrap', wrap ? 'wrap' : undefined)
  );

  const filteredChildren = React.Children.toArray(children);
  const childCount = filteredChildren.length;

  return (
    <Box as={as} ref={ref} className={classes} style={styles} {...rest}>
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
