import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Box, { BoxProps } from '@/internals/Box/Box';
import { forwardRef } from './forwardRef';
/**
 * Why not import like this:
 * ```
 * import { useStyles, useCustom } from '@/internals/hooks';
 * ```
 *
 * We import useStyles and useCustom separately to prevent Vite from displaying Rollup warnings
 * during the build process. This approach avoids circular dependency issues that could affect
 * chunk division and optimizes the build output.
 */
import { useStyles } from '@/internals/hooks/useStyles';
import { useCustom } from '@/internals/hooks/useCustom';

export type ComponentProps = BoxProps & React.HTMLAttributes<HTMLDivElement>;

interface Props<T extends React.ElementType> extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  componentAs?: T;
  componentClassPrefix?: string;
}

/**
 * Create a component with `classPrefix` and `as` attributes.
 * By default, the component is based on Box component and inherits all Box props.
 */
export function createComponent<T extends React.ElementType = typeof Box, P = ComponentProps>({
  name,
  componentAs,
  componentClassPrefix,
  ...defaultProps
}: Props<T> & Partial<P>) {
  const Component = forwardRef<T, Partial<P>>((props: ComponentProps, ref) => {
    const { propsWithDefaults } = useCustom(name as any, props);
    const {
      as,
      classPrefix = componentClassPrefix || kebabCase(name),
      className,
      role,
      ...rest
    } = propsWithDefaults;

    const { withPrefix, merge } = useStyles(classPrefix);
    const classes = merge(className, withPrefix());

    return (
      <Box
        {...defaultProps}
        {...rest}
        role={role}
        ref={ref}
        className={classes}
        as={as || componentAs || 'div'}
      />
    );
  });

  Component.displayName = name;

  return Component;
}

export default createComponent;
