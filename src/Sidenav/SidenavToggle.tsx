import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';

export interface SidenavToggleProps extends WithAsProps {
  /** Expand then nav */
  expanded?: boolean;

  /** Callback function for menu state switching */
  onToggle?: (expanded: boolean, event: React.MouseEvent) => void;
}

const defaultProps: Partial<SidenavToggleProps> = {
  as: 'div',
  classPrefix: 'sidenav-toggle'
};

const SidenavToggle: RsRefForwardingComponent<'div', SidenavToggleProps> = React.forwardRef(
  (props: SidenavToggleProps, ref) => {
    const { as: Component, expanded, className, classPrefix, onToggle, ...rest } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ collapsed: !expanded }));
    const Icon = expanded ? AngleRight : AngleLeft;

    const handleToggle = (event: React.MouseEvent) => {
      onToggle?.(!expanded, event);
    };

    return (
      <Component {...rest} ref={ref} className={classes}>
        <IconButton appearance="default" icon={<Icon />} onClick={handleToggle} />
      </Component>
    );
  }
);

SidenavToggle.displayName = 'SidenavToggle';
SidenavToggle.defaultProps = defaultProps;
SidenavToggle.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
};

export default SidenavToggle;
