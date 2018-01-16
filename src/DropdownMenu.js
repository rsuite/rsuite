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

type Trigger = 'click' | 'hover';
type Props = {
  activeKey?: any,
  className?: string,
  children?: React.ChildrenArray<any>,
  icon?: React.Element<typeof Icon>,
  classPrefix?: string,
  pullLeft?: boolean,
  onSelect?: Function,
  title?: React.Node,
  open?: boolean,
  collapse?: boolean,
  trigger?: Trigger | Array<Trigger>,
}

class DorpdownMenu extends React.Component<Props> {
  static displayName = 'DropdownMenu';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-menu`
  };

  getMenuItemsAndStatus(children?: React.ChildrenArray<any>): Object {

    let hasActiveItem: boolean;

    const { activeKey, onSelect, classPrefix } = this.props;
    const items = React.Children.map(children, (item, index) => {
      let displayName: string = get(item, ['type', 'displayName']);
      let active: boolean;

      if (displayName === 'DropdownMenuItem' || displayName === 'DropdownMenu') {
        active = this.isActive(item.props, activeKey);
        if (active) {
          hasActiveItem = true;
        }
      }

      if (displayName === 'DropdownMenuItem') {
        let { onSelect: onItemSelect } = item.props;
        return React.cloneElement(item, {
          key: index,
          active,
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });

      } else if (displayName === 'DropdownMenu') {

        let itemsAndStatus = this.getMenuItemsAndStatus(item.props.children);
        const { icon, open, collapse, trigger, pullLeft, title } = item.props;
        return (
          <DropdownMenuItem
            icon={icon}
            open={open}
            trigger={trigger}
            collapse={collapse}
            active={this.isActive(item.props, activeKey)}
            className={this.addPrefix(`pull-${pullLeft ? 'left' : 'right'}`)}
            pullLeft={pullLeft}
            componentClass="div"
            submenu
          >
            <div className={this.addPrefix('toggle')}>
              <span>{title}</span>
              <Icon icon={pullLeft ? 'angle-left' : 'angle-right'} />
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
      active: hasActiveItem
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
