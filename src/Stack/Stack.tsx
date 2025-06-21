import React, { CSSProperties } from 'react';
import StackItem from './StackItem';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef, getCssValue } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import useStyled from '@/internals/hooks/useStyled';
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

  const { withPrefix, merge, responsive } = useStyles(classPrefix);
  const baseClasses = merge(className, withPrefix({ wrap }), ...responsive(direction));

  // Create CSS variables map for useStyled
  const cssVars: Record<string, string | number | undefined> = {};

  // Add spacing CSS variable
  if (spacing !== undefined) {
    // Handle array or single value for spacing
    if (Array.isArray(spacing)) {
      cssVars['--rs-stack-spacing'] = spacing.map(s => getCssValue(s)).join(' ');
    } else {
      cssVars['--rs-stack-spacing'] = getCssValue(spacing);
    }
  }

  // Add align CSS variable
  if (align !== undefined) {
    cssVars['--rs-stack-align'] = align;
  }

  // Add justify CSS variable
  if (justify !== undefined) {
    cssVars['--rs-stack-justify'] = justify;
  }

  // Use the useStyled hook to manage CSS variables
  const styled = useStyled({
    cssVars,
    className: baseClasses,
    style,
    prefix: classPrefix
  });

  const filteredChildren = React.Children.toArray(children);
  const childCount = filteredChildren.length;

  return (
    <Box as={as} ref={ref} className={styled.className} style={styled.style} {...rest}>
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
