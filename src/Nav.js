// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import { mapCloneElement } from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';
import prefix from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  children?: React.Node,
  tabs?: boolean,
  pills?: boolean,
  justified?: boolean,
  stacked?: boolean,
  pullRight?: boolean,
  activeKey?: any,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
}


class Nav extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'nav',
  }
  static contextTypes = {
    navbar: PropTypes.bool
  };


  static Item = NavItem;
  static Dropdown = NavDropdown;

  render() {
    const {
      classPrefix,
      tabs,
      pills,
      stacked,
      justified,
      pullRight,
      className,
      children,
      onSelect,
      activeKey,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);

    const classes = classNames(classPrefix, {
      'navbar-right': pullRight,
      'navbar-nav': this.context.navbar,
      [addPrefix('pills')]: pills,
      [addPrefix('tabs')]: tabs,
      [addPrefix('stacked')]: stacked,
      [addPrefix('justified')]: justified
    }, className);


    const items = mapCloneElement(children, (item) => {
      let { eventKey, active } = item.props;
      if (item.type.displayName !== 'NavItem') {
        return null;
      }
      return {
        onSelect,
        active: isNullOrUndefined(activeKey) ? active : isEqual(activeKey, eventKey)
      };
    });

    return (
      <ul {...props} className={classes} >
        {items}
      </ul>
    );
  }
}

export default Nav;
