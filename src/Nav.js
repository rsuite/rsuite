// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import NavItem from './NavItem';
import { mapCloneElement } from './utils/ReactChildren';
import getUnhandledProps from './utils/getUnhandledProps';
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
    expanded: PropTypes.bool,
    navbar: PropTypes.bool,
    sidenav: PropTypes.bool,
    activeKey: PropTypes.any,
    onSelect: PropTypes.func
  };


  static Item = NavItem;

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


    const classes = classNames(classPrefix, addPrefix(appearance), {
      [`${globalKey}navbar-nav`]: navbar,
      [`${globalKey}navbar-right`]: pullRight,
      [`${globalKey}sidenav-nav`]: sidenav,
      [addPrefix('horizontal')]: navbar || (!vertical && !sidenav),
      [addPrefix('vertical')]: vertical || sidenav,
      [addPrefix('justified')]: justified,
      [addPrefix('reversed')]: reversed,
    }, className);

    const hasWaterline = (appearance !== 'default');

    const items = mapCloneElement(children, (item) => {
      let { eventKey, active } = item.props;
      let displayName = _.get(item, ['type', 'displayName']);

      if (displayName === 'NavItem') {
        return {
          onSelect,
          hasTooltip: sidenav && !expanded,
          active: _.isUndefined(activeKey) ? active : _.isEqual(activeKey, eventKey)
        };
      } else if (displayName === 'Dropdown') {
        return {
          onSelect,
          activeKey,
          componentClass: 'li',
          trigger: 'hover',
          placement: sidenav ? 'rightBottom' : undefined
        };
      }

      return null;
    });

    const unhandled = getUnhandledProps(Nav, props);

    return (
      <div {...unhandled} className={classes} >
        <ul>
          {items}
        </ul>
        {hasWaterline && <div className={addPrefix('waterline')} />}
      </div>
    );
  }
}

export default Nav;
