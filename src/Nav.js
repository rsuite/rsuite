// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import { mapCloneElement } from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';
import prefix, { globalKey } from './utils/prefix';

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
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
}

class Nav extends React.Component<Props> {
  static defaultProps = {
    appearance: 'default',
    classPrefix: `${globalKey}nav`,
  }
  static contextTypes = {
    navbar: PropTypes.bool
  };


  static Item = NavItem;
  static Dropdown = NavDropdown;

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
      onSelect,
      activeKey,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const { navbar } = this.context;

    const classes = classNames(classPrefix, addPrefix(appearance), {
      [`${classPrefix}bar-nav`]: navbar,
      [`${classPrefix}bar-right`]: pullRight,
      [addPrefix('horizontal')]: !vertical || navbar,
      [addPrefix('vertical')]: vertical,
      [addPrefix('justified')]: justified,
      [addPrefix('reversed')]: reversed,
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
