// @flow

import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
import shallowEqual from 'rsuite-utils/lib/utils/shallowEqual';
import setDisplayName from 'recompose/setDisplayName';

import DropdownMenuItem from './DropdownMenuItem';
import Icon from './Icon';
import Ripple from './Ripple';

import {
  createChainedFunction,
  prefix,
  ReactChildren,
  getUnhandledProps,
  defaultProps
} from './utils';

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
  trigger?: Trigger | Array<Trigger>,
  eventKey?: any,
  onToggle?: (eventKey: any, event: SyntheticEvent<*>) => void,
  openKeys?: Array<any>,
  expanded?: boolean,
  collapsible?: boolean
};

class DropdownMenu extends React.Component<Props> {
  getMenuItemsAndStatus(children?: React.ChildrenArray<any>): Object {
    let hasActiveItem: boolean;

    const { activeKey, onSelect, classPrefix, openKeys = [] } = this.props;
    const items = React.Children.map(children, (item, index) => {
      const displayName: string = _.get(item, ['type', 'displayName']);
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
        const itemsAndStatus = this.getMenuItemsAndStatus(item.props.children);
        const { icon, open, trigger, pullLeft, eventKey, title } = item.props;
        const expanded = openKeys.some(key => shallowEqual(key, eventKey));

        return (
          <DropdownMenuItem
            icon={icon}
            open={open}
            trigger={trigger}
            expanded={expanded}
            active={this.isActive(item.props, activeKey)}
            className={this.addPrefix(`pull-${pullLeft ? 'left' : 'right'}`)}
            pullLeft={pullLeft}
            componentClass="div"
            submenu
          >
            <div
              className={this.addPrefix('toggle')}
              onClick={this.handleToggleChange.bind(this, eventKey)}
              role="menu"
              tabIndex={-1}
            >
              <span>{title}</span>
              <Icon icon={pullLeft ? 'angle-left' : 'angle-right'} />
              <Ripple />
            </div>
            {this.renderCollapse(
              <ul role="menu" className={classPrefix}>
                {itemsAndStatus.items}
              </ul>,
              expanded
            )}
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

  handleToggleChange = (eventKey: any, event: SyntheticEvent<*>) => {
    const { onToggle } = this.props;
    onToggle && onToggle(eventKey, event);
  };

  isActive(props: Object, activeKey: any) {
    if (props.active || (!_.isUndefined(activeKey) && shallowEqual(props.eventKey, activeKey))) {
      return true;
    }

    if (ReactChildren.some(props.children, child => this.isActive(child.props, activeKey))) {
      return true;
    }

    return props.active;
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  renderCollapse(children: React.Node, expanded?: boolean) {
    return this.props.collapsible ? (
      <Collapse
        in={expanded}
        exitedClassName={this.addPrefix('collapse-out')}
        exitingClassName={this.addPrefix('collapsing')}
        enteredClassName={this.addPrefix('collapse-in')}
        enteringClassName={this.addPrefix('collapsing')}
      >
        {children}
      </Collapse>
    ) : (
      children
    );
  }

  render() {
    const {
      pullLeft,
      children,
      className,
      onSelect,
      classPrefix,
      activeKey,
      openKeys,
      expanded,
      ...props
    } = this.props;

    const { items, active } = this.getMenuItemsAndStatus(children);
    const unhandled = getUnhandledProps(DropdownMenu, props);
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('active')]: active
    });

    return this.renderCollapse(
      <ul {...unhandled} className={classes} role="menu">
        {items}
      </ul>,
      expanded
    );
  }
}

const EnhancedDropdownMenu = defaultProps({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);

export default setDisplayName('DropdownMenu')(EnhancedDropdownMenu);
