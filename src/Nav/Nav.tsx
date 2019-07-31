import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';

import NavItem from './NavItem';
import { prefix, getUnhandledProps, defaultProps, ReactChildren } from '../utils';
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
      let { eventKey, active, ...rest } = item.props;
      let displayName = _.get(item, ['type', 'displayName']);

      if (displayName === 'NavItem') {
        return {
          ...rest,
          onSelect,
          hasTooltip: sidenav && !expanded,
          active: _.isUndefined(activeKey) ? active : shallowEqual(activeKey, eventKey)
        };
      } else if (displayName === 'Dropdown') {
        return {
          ...rest,
          onSelect,
          activeKey,
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
