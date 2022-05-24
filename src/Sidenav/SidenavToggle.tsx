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

const SidenavToggle: RsRefForwardingComponent<'div', SidenavToggleProps> = React.forwardRef(
  (props: SidenavToggleProps, ref) => {
    const {
      as: Component = 'div',
      expanded,
      className,
      classPrefix = 'sidenav-toggle',
      onToggle,
      ...rest
    } = props;
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ collapsed: !expanded }));
    const Icon = expanded ? AngleLeft : AngleRight;

    const handleToggle = (event: React.MouseEvent) => {
      onToggle?.(!expanded, event);
    };

    return (
      <Component {...rest} ref={ref} className={classes}>
        <IconButton icon={<Icon />} className={prefix('button')} onClick={handleToggle} />
      </Component>
    );
  }
);

SidenavToggle.displayName = 'Sidenav.Toggle';
SidenavToggle.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
};

export default SidenavToggle;
