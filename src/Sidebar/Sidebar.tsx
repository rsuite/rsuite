import React, { useContext, useEffect } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import { ContainerContext } from '../Container/Container';

export interface SidebarProps extends BoxProps {
  /** Width */
  width?: number | string;

  /** Sidebar can be collapsed */
  collapsible?: boolean;
}

/**
 * The `Sidebar` component for use with the `Container` component.
 * @see https://rsuitejs.com/components/container/
 */
const Sidebar = forwardRef<'aside', SidebarProps>((props: SidebarProps, ref) => {
  const { propsWithDefaults } = useCustom('Sidebar', props);
  const {
    as = 'aside',
    classPrefix = 'sidebar',
    className,
    collapsible,
    width = 260,
    ...rest
  } = propsWithDefaults;

  const { withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ collapse: collapsible }));
  const { setHasSidebar } = useContext(ContainerContext);

  useEffect(() => {
    /** Notify the Container that the Sidebar is in the child node of the Container. */
    setHasSidebar?.(true);
  }, [setHasSidebar]);

  return <Box as={as} w={width} ref={ref} className={classes} {...rest} />;
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
