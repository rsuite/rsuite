// @flow

import * as React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
import createChainedFunction from './utils/createChainedFunction';
import prefix, { globalKey } from './utils/prefix';
import DropdownMenuItem from './DropdownMenuItem';
import Icon from './Icon';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';
import getUnhandledProps from './utils/getUnhandledProps';

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
}

class DorpdownMenu extends React.Component<Props> {
  static displayName = 'DropdownMenu';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-menu`
  };

  getMenuItemsAndStatus(children?: React.ChildrenArray<any>): Object {

    let hasActiveItem: boolean;

    const { activeKey, onSelect, classPrefix, openKeys = [] } = this.props;
    const items = React.Children.map(children, (item, index) => {
      let displayName: string = _.get(item, ['type', 'displayName']);
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
        const { icon, open, trigger, pullLeft, eventKey, title } = item.props;
        const expanded = openKeys.some(key => _.isEqual(key, eventKey));


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
              onClick={(event: SyntheticEvent<*>) => {
                this.handleToggleChange(eventKey, event);
              }}
              role="menu"
              tabIndex={-1}
            >
              <span>{title}</span>
              <Icon icon={pullLeft ? 'angle-left' : 'angle-right'} />
            </div>
            {
              this.renderCollapse((
                <ul role="menu" className={classPrefix}>
                  {itemsAndStatus.items}
                </ul>
              ), expanded)
            }
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
  }

  isActive(props: Object, activeKey: any) {
    if (
      props.active ||
      (!isNullOrUndefined(activeKey) && _.isEqual(props.eventKey, activeKey))
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

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name)
  addPrefixs = (names: Array<string>) => names.map(name => this.addPrefix(name))

  renderCollapse(children: React.Node, expanded?: boolean) {
    return this.props.collapsible ? (
      <Collapse
        in={expanded}
        exitedClassName={this.addPrefix('collapse-out')}
        exitingClassName={classNames(this.addPrefixs(['collapse-out', 'collapsing']))}
        enteredClassName={this.addPrefix('collapse-in')}
        enteringClassName={classNames(this.addPrefixs(['collapse-out', 'collapsing']))}
      >
        {children}
      </Collapse>
    ) : children;
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
    const unhandled = getUnhandledProps(DorpdownMenu, props);
    const classes = classNames(classPrefix, {
      [this.addPrefix('active')]: active
    }, className);

    return this.renderCollapse((
      <ul
        {...unhandled}
        className={classes}
        role="menu"
      >
        {items}
      </ul>
    ), expanded);
  }
}

export default DorpdownMenu;
