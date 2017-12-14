// @flow

import * as React from 'react';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import classNames from 'classnames';
import { mapCloneElement } from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';
import createChainedFunction from './utils/createChainedFunction';
import prefix from './utils/prefix';

type Props = {
  pullRight?: boolean,
  onSelect?: Function,
  activeKey?: any,
  className?: string,
  children?: React.ChildrenArray<any>,
}

const addPrefix: Function = prefix('dropdown');

class DorpdownMenu extends React.Component<Props> {

  render() {
    const {
      pullRight,
      children,
      className,
      activeKey,
      onSelect,
      ...props
    } = this.props;

    const classes = classNames(addPrefix('menu'), {
      [addPrefix('menu-right')]: pullRight
    }, className);

    const items = mapCloneElement(children, (item) => {
      let { eventKey, active, onSelect: onItemSelect } = item.props;
      let displayName = get(item, ['type', 'displayName']);
      if (displayName === 'DropdownMenuItem' || displayName === 'NavItem') {
        return {
          onSelect: createChainedFunction(onSelect, onItemSelect),
          active: isNullOrUndefined(activeKey) ? active : isEqual(activeKey, eventKey)
        };
      }
      return null;
    });

    return (
      <ul
        {...props}
        className={classes}
        role="menu"
      >
        {items}
      </ul>
    );
  }

}


export default DorpdownMenu;
