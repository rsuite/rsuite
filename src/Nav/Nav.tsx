import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';
import Dropdown from '../Dropdown';
import { ReactChildren, useClassNames, shallowEqual } from '../utils';
import { NavbarContext } from '../Navbar/Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface NavProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** sets appearance */
  appearance?: 'default' | 'subtle' | 'tabs';

  /** Reverse Direction of tabs/subtle */
  reversed?: boolean;

  /** Justified navigation */
  justified?: boolean;

  /** Vertical navigation */
  vertical?: boolean;

  /** appears on the right. */
  pullRight?: boolean;

  /** Active key, corresponding to eventkey in <Nav.item>. */
  activeKey?: T;

  /** Callback function triggered after selection */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<NavProps> = {
  classPrefix: 'nav',
  appearance: 'default',
  as: 'div'
};

interface NavComponent extends RsRefForwardingComponent<'div', NavProps> {
  Dropdown?: typeof Dropdown;
  Item?: typeof NavItem;
}

const Nav: NavComponent = React.forwardRef((props: NavProps, ref: React.Ref<HTMLElement>) => {
  const {
    as: Component,
    classPrefix,
    appearance,
    vertical,
    justified,
    reversed,
    pullRight,
    className,
    children,
    activeKey: activeKeyProp,
    onSelect: onSelectProp,
    ...rest
  } = props;

  const { sidenav = false, expanded = false, activeKey = activeKeyProp, onSelect = onSelectProp } =
    React.useContext(SidenavContext) || {};

  const { withClassPrefix, merge, rootPrefix, prefix } = useClassNames(classPrefix);
  const hasWaterline = appearance !== 'default';

  const items = ReactChildren.mapCloneElement(children, item => {
    const { eventKey, active, ...rest } = item.props;
    const displayName = item?.type?.displayName;
    const hasTooltip = sidenav && !expanded;

    if (displayName === 'NavItem') {
      return {
        ...rest,
        onSelect,
        hasTooltip,
        active: typeof activeKey === 'undefined' ? active : shallowEqual(activeKey, eventKey)
      };
    } else if (displayName === 'Dropdown') {
      return {
        ...rest,
        onSelect,
        activeKey,
        showHeader: hasTooltip,
        as: 'div'
      };
    }

    return null;
  });

  return (
    <NavbarContext.Consumer>
      {navbar => {
        const classes = merge(
          className,
          rootPrefix({
            'navbar-nav': navbar,
            'navbar-right': pullRight,
            'sidenav-nav': sidenav
          }),
          withClassPrefix(appearance, {
            horizontal: navbar || (!vertical && !sidenav),
            vertical: vertical || sidenav,
            justified: justified,
            reversed: reversed
          })
        );

        return (
          <Component {...rest} ref={ref} className={classes}>
            {items}
            {hasWaterline && <div className={prefix('bar')} />}
          </Component>
        );
      }}
    </NavbarContext.Consumer>
  );
});

Nav.Dropdown = Dropdown;
Nav.Item = NavItem;

Nav.displayName = 'Nav';
Nav.defaultProps = defaultProps;
Nav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  appearance: PropTypes.oneOf(['default', 'subtle', 'tabs']),
  // Reverse Direction of tabs/subtle
  reversed: PropTypes.bool,
  justified: PropTypes.bool,
  vertical: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func
};

export default Nav;
