// @flow

import * as React from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import prefix, { globalKey } from './utils/prefix';
import DropdownMenuItem from './DropdownMenuItem';
import Icon from './Icon';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';

type Props = {
  activeKey?: any,
  className?: string,
  children?: React.ChildrenArray<any>,
  icon?: React.Element<typeof Icon>,
  classPrefix?: string,
  pullLeft?: boolean,
  onSelect?: Function,
  title?: React.Node
}

class DorpdownMenu extends React.Component<Props> {
  static displayName = 'DropdownMenu';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-menu`
  };

  getMenuItemsAndStatus(children?: React.ChildrenArray<any>): Object {

    let active;

    const { activeKey, onSelect, classPrefix } = this.props;
    const items = React.Children.map(children, (item, index) => {
      let displayName = get(item, ['type', 'displayName']);

      if (displayName === 'DropdownMenuItem' || displayName === 'NavItem') {
        let { onSelect: onItemSelect } = item.props;
        active = this.isActive(item.props, activeKey);
        return React.cloneElement(item, {
          key: index,
          active,
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });
      } else if (displayName === 'DropdownMenu') {

        active = this.isActive(item.props, activeKey);
        let itemsAndStatus = this.getMenuItemsAndStatus(item.props.children);

        return (
          <DropdownMenuItem
            icon={item.props.icon}
            active={this.isActive(item.props, activeKey)}
            componentClass="div"
            className={this.addPrefix(`pull-${item.props.pullLeft ? 'left' : 'right'}`)}
            pullLeft={item.props.pullLeft}
            submenu
          >
            <div className={this.addPrefix('toggle')}>
              <span>{item.props.title}</span>
              <Icon icon={item.props.pullLeft ? 'angle-left' : 'angle-right'} />
            </div>
            <ul role="menu" className={classPrefix}>
              {itemsAndStatus.items}
            </ul>
          </DropdownMenuItem>
        );
      }
      return item;
    });

    return {
      items,
      active
    };
  }

  isActive(props: Object, activeKey: any) {
    if (
      props.active ||
      (!isNullOrUndefined(activeKey) && isEqual(props.eventKey, activeKey))
    ) {
      return true;
    }

    if (ReactChildren.some(props.children, child => (
      this.isActive(child.props, activeKey)
    ))) {
      return true;
    }

    return props.active;
  }

  addPrefix(name: string) {
    const { classPrefix } = this.props;
    return prefix(classPrefix)(name);
  }

  render() {
    const {
      pullLeft,
      children,
      className,
      onSelect,
      classPrefix,
      activeKey,
      ...props
    } = this.props;

    const { items, active } = this.getMenuItemsAndStatus(children);
    const classes = classNames(classPrefix, {
      [this.addPrefix('active')]: active
    }, className);

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
