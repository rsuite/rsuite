import React, { useContext, useEffect } from 'react';
import { useClassNames } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import { ContainerContext } from '../Container/Container';
import type { WithAsProps } from '@/internals/types';

export interface SidebarProps extends WithAsProps {
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
    as: Component = 'aside',
    classPrefix = 'sidebar',
    className,
    collapsible,
    width = 260,
    style,
    ...rest
  } = propsWithDefaults;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ collapse: collapsible }));
  const { setHasSidebar } = useContext(ContainerContext);

  useEffect(() => {
    /** Notify the Container that the Sidebar is in the child node of the Container. */
    setHasSidebar?.(true);
  }, [setHasSidebar]);

  const styles = {
    flex: `0 0 ${width}px`,
    width,
    ...style
  };
  return <Component {...rest} ref={ref} className={classes} style={styles} />;
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
