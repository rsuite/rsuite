// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import NavItem from './NavItem';
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
    navbar: PropTypes.bool,
    sidenav: PropTypes.bool,
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
      onSelect,
      activeKey,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const { navbar, sidenav } = this.context;

    const classes = classNames(classPrefix, addPrefix(appearance), {
      [`${classPrefix}bar-nav`]: navbar,
      [`${classPrefix}bar-right`]: pullRight,
      [`${globalKey}sidenav-nav`]: sidenav,
      [addPrefix('horizontal')]: navbar || (!vertical && !sidenav),
      [addPrefix('vertical')]: vertical || sidenav,
      [addPrefix('justified')]: justified,
      [addPrefix('reversed')]: reversed,
    }, className);

    const hasWaterline = (appearance !== 'default');
    const items = mapCloneElement(children, (item) => {
      let { eventKey, active } = item.props;

      if (get(item, ['type', 'displayName']) !== 'NavItem') {
        return null;
      }
      return {
        onSelect,
        active: isNullOrUndefined(activeKey) ? active : isEqual(activeKey, eventKey)
      };
    });

    return (
      <div {...props} className={classes} >
        <ul>
          {items}
        </ul>
        {hasWaterline && <div className={addPrefix('waterline')} />}
      </div>
    );
  }
}

export default Nav;
