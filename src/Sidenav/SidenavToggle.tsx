import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import deprecatePropType from '../utils/deprecatePropType';
import { SidenavContext } from './Sidenav';

export interface SidenavToggleProps extends WithAsProps {
  /**
   * Expand then nav
   *
   * @deprecated Use <Sidenav expanded> instead.
   */
  expanded?: boolean;

  /** Callback function for menu state switching */
  onToggle?: (expanded: boolean, event: React.MouseEvent) => void;
}

const SidenavToggle: RsRefForwardingComponent<'div', SidenavToggleProps> = React.forwardRef(
  (props: SidenavToggleProps, ref) => {
    const sidenav = useContext(SidenavContext);

    if (!sidenav) {
      throw new Error('<Sidenav.Toggle> must be rendered within a <Sidenav>');
    }

    const {
      as: Component = 'div',
      expanded: DEPRECATED_expanded,
      className,
      classPrefix = 'sidenav-toggle',
      onToggle,
      ...rest
    } = props;

    // if `expanded` prop is provided, it takes priority
    const expanded = DEPRECATED_expanded ?? sidenav.expanded;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ collapsed: !expanded }));
    const Icon = expanded ? AngleLeft : AngleRight;

    const handleToggle = (event: React.MouseEvent) => {
      onToggle?.(!expanded, event);
    };

    return (
      <Component {...rest} ref={ref} className={classes}>
        <IconButton
          icon={<Icon />}
          className={prefix('button')}
          onClick={handleToggle}
          aria-label={expanded ? 'Collapse' : 'Expand'}
        />
      </Component>
    );
  }
);

SidenavToggle.displayName = 'Sidenav.Toggle';
SidenavToggle.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: deprecatePropType(PropTypes.bool, 'Use <Sidenav expanded> instead.'),
  onToggle: PropTypes.func
};

export default SidenavToggle;
