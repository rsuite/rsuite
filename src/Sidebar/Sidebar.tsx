import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { ContainerContext } from '../Container/Container';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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
const Sidebar: RsRefForwardingComponent<'aside', SidebarProps> = React.forwardRef(
  (props: SidebarProps, ref) => {
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
  }
);

Sidebar.displayName = 'Sidebar';
Sidebar.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsible: PropTypes.bool,
  style: PropTypes.object
};
export default Sidebar;
