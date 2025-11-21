import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { forwardRef } from '@/internals/utils/react/forwardRef';
import { extractBoxProps, omitBoxProps } from './utils';
import { useStyled, getCSSVariables, CSSSystemProps } from '@/internals/styled-system';
import type { WithAsProps, Breakpoints } from '@/internals/types';

export interface BoxProps extends WithAsProps, CSSSystemProps {
  /** Breakpoint below which the component is shown with `display: block` */
  showFrom?: Breakpoints;

  /** Breakpoint above which the component is hidden with `display: none` */
  hideFrom?: Breakpoints;
}

export type BaseBoxProps = Omit<BoxProps, 'color'>;

/**
 * Box component is the base component for all components,
 * providing shorthand for style properties.
 *
 * @see https://rsuitejs.com/components/box
 */
const Box = forwardRef<'div', BoxProps>((props, ref) => {
  const { as: Component = 'div', className, children, showFrom, hideFrom, style, ...rest } = props;

  const boxProps = extractBoxProps(rest);
  const domProps = omitBoxProps(rest);
  const boxCSSVars = getCSSVariables(boxProps, '--rs-box-');
  const isBox = !isEmpty(boxCSSVars) || showFrom || hideFrom;

  const styled = useStyled({
    cssVars: boxCSSVars,
    className,
    style,
    enabled: isBox
  });

  return (
    <Component
      ref={ref}
      data-rs={isBox ? 'box' : undefined}
      data-visible-from={showFrom}
      data-hidden-from={hideFrom}
      className={styled.className}
      style={styled.style}
      {...domProps}
    >
      {children}
    </Component>
  );
});

Box.displayName = 'Box';

export default Box;
