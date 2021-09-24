import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { ContainerContext } from '../Container/Container';

export interface SidebarProps extends WithAsProps {
  /** Width */
  width?: number | string;

  /** Sidebar can be collapsed */
  collapsible?: boolean;
}

const defaultProps: Partial<SidebarProps> = {
  as: 'aside',
  classPrefix: 'sidebar',
  width: 260
};

const Sidebar: RsRefForwardingComponent<'aside', SidebarProps> = React.forwardRef(
  (props: SidebarProps, ref) => {
    const { as: Component, classPrefix, className, collapsible, width, style, ...rest } = props;
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
Sidebar.defaultProps = defaultProps;
Sidebar.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsible: PropTypes.bool,
  style: PropTypes.object
};
export default Sidebar;
