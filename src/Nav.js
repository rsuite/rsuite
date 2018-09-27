// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setStatic from 'recompose/setStatic';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';

import NavItem from './NavItem';
import { prefix, getUnhandledProps, defaultProps, ReactChildren } from './utils';
import { getClassNamePrefix } from './utils/prefix';

type Props = {
  classPrefix: string,
  className?: string,
  children?: React.Node,
  appearance: 'default' | 'subtle' | 'tabs',
  // Reverse Direction of tabs/subtle
  reversed?: boolean,
  justified?: boolean,
  vertical?: boolean,
  pullRight?: boolean,
  activeKey?: any,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void
};

class Nav extends React.Component<Props> {
  static defaultProps = {
    appearance: 'default'
  };

  static contextTypes = {
    expanded: PropTypes.bool,
    navbar: PropTypes.bool,
    sidenav: PropTypes.bool,
    activeKey: PropTypes.any,
    onSelect: PropTypes.func
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
      navbar,
      sidenav,
      expanded,
      activeKey = props.activeKey,
      onSelect = props.onSelect
    } = this.context;

    const addPrefix = prefix(classPrefix);
    const globalClassNamePrefix = getClassNamePrefix();

    const classes = classNames(classPrefix, addPrefix(appearance), className, {
      [`${globalClassNamePrefix}navbar-nav`]: navbar,
      [`${globalClassNamePrefix}navbar-right`]: pullRight,
      [`${globalClassNamePrefix}sidenav-nav`]: sidenav,
      [addPrefix('horizontal')]: navbar || (!vertical && !sidenav),
      [addPrefix('vertical')]: vertical || sidenav,
      [addPrefix('justified')]: justified,
      [addPrefix('reversed')]: reversed
    });

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
      <div {...unhandled} className={classes}>
        <ul>{items}</ul>
        {hasWaterline && <div className={addPrefix('waterline')} />}
      </div>
    );
  }
}

const EnhancedNav = defaultProps({
  classPrefix: 'nav'
})(Nav);

setStatic('Item', NavItem)(EnhancedNav);

export default EnhancedNav;
