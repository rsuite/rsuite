import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import shallowEqual from '../utils/shallowEqual';

import NavItem from './NavItem';
import {
  prefix,
  getUnhandledProps,
  defaultProps,
  ReactChildren,
  createChainedFunction
} from '../utils';
import { getClassNamePrefix } from '../utils/prefix';
import { NavbarContext } from '../Navbar/Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';
import { NavProps } from './Nav.d';

class Nav extends React.Component<NavProps> {
  static contextType = SidenavContext;
  static propTypes = {
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
  static defaultProps = {
    appearance: 'default'
  };

  render() {
    const {
      classPrefix,
      appearance,
      vertical,
      justified,
      reversed,
      pullRight,
      className,
      children,
      ...props
    } = this.props;

    const {
      sidenav = false,
      expanded = false,
      activeKey = props.activeKey,
      onSelect = props.onSelect
    } = this.context || {};

    const addPrefix = prefix(classPrefix);
    const globalClassNamePrefix = getClassNamePrefix();

    const hasWaterline = appearance !== 'default';

    const items = ReactChildren.mapCloneElement(children, item => {
      const { eventKey, active, onSelect: onSelectItem, ...rest } = item.props;
      const displayName = item?.type?.displayName;
      const hasTooltip = sidenav && !expanded;

      if (~displayName?.indexOf('(NavItem)')) {
        return {
          ...rest,
          onSelect: createChainedFunction(onSelect, onSelectItem),
          hasTooltip,
          active: typeof activeKey === 'undefined' ? active : shallowEqual(activeKey, eventKey)
        };
      } else if (~displayName?.indexOf('(Dropdown)')) {
        return {
          ...rest,
          onSelect: createChainedFunction(onSelect, onSelectItem),
          activeKey,
          showHeader: hasTooltip,
          componentClass: 'li'
        };
      }

      return null;
    });

    const unhandled = getUnhandledProps(Nav, props);

    return (
      <NavbarContext.Consumer>
        {navbar => {
          const classes = classNames(classPrefix, addPrefix(appearance), className, {
            [`${globalClassNamePrefix}navbar-nav`]: navbar,
            [`${globalClassNamePrefix}navbar-right`]: pullRight,
            [`${globalClassNamePrefix}sidenav-nav`]: sidenav,
            [addPrefix('horizontal')]: navbar || (!vertical && !sidenav),
            [addPrefix('vertical')]: vertical || sidenav,
            [addPrefix('justified')]: justified,
            [addPrefix('reversed')]: reversed
          });
          return (
            <div {...unhandled} className={classes}>
              <ul>{items}</ul>
              {hasWaterline && <div className={addPrefix('waterline')} />}
            </div>
          );
        }}
      </NavbarContext.Consumer>
    );
  }
}

const EnhancedNav = defaultProps<NavProps>({
  classPrefix: 'nav'
})(Nav);

setStatic('Item', NavItem)(EnhancedNav);

export default EnhancedNav;
