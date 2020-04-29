import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Collapse from '../Animation/Collapse';
import shallowEqual from '../utils/shallowEqual';

import DropdownMenuItem from './DropdownMenuItem';
import { DropdownMenuProps } from './DropdownMenu.d';
import Icon from '../Icon';
import Ripple from '../Ripple';
import {
  createChainedFunction,
  prefix,
  ReactChildren,
  getUnhandledProps,
  defaultProps
} from '../utils';
import mergeRefs from '../utils/mergeRefs';

class DropdownMenu extends React.Component<DropdownMenuProps> {
  static displayName = 'DropdownMenu';
  static propTypes = {
    activeKey: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node,
    icon: PropTypes.node,
    classPrefix: PropTypes.string,
    pullLeft: PropTypes.bool,
    onSelect: PropTypes.func,
    title: PropTypes.node,
    open: PropTypes.bool,
    trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
    eventKey: PropTypes.any,
    openKeys: PropTypes.array,
    expanded: PropTypes.bool,
    collapsible: PropTypes.bool,
    onToggle: PropTypes.func
  };
  getMenuItemsAndStatus(children?: React.ReactNode): { items: any[]; active: boolean } {
    let hasActiveItem: boolean;

    const { activeKey, onSelect, classPrefix, openKeys = [] } = this.props;
    const items = React.Children.map(children, (item: any, index: number) => {
      if (!item) {
        return null;
      }

      const displayName: string = item?.type?.displayName;
      let active: boolean;

      if (~displayName?.indexOf('(DropdownMenuItem)') || ~displayName?.indexOf('(DropdownMenu)')) {
        active = this.isActive(item.props, activeKey);
        if (active) {
          hasActiveItem = true;
        }
      }

      if (~displayName?.indexOf('(DropdownMenuItem)')) {
        const { onSelect: onItemSelect } = item.props;
        return React.cloneElement(item, {
          key: index,
          active,
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });
      } else if (~displayName?.indexOf('(DropdownMenu)')) {
        const itemsAndStatus = this.getMenuItemsAndStatus(item.props.children);
        const { icon, open, trigger, pullLeft, eventKey, title, className } = item.props;
        const expanded = openKeys.some(key => shallowEqual(key, eventKey));
        const itemClassName = classNames(
          className,
          this.addPrefix(`pull-${pullLeft ? 'left' : 'right'}`),
          {
            [this.addPrefix('item-focus')]: this.isActive(item.props, activeKey)
          }
        );

        return (
          <DropdownMenuItem
            icon={icon}
            open={open}
            trigger={trigger}
            expanded={expanded}
            className={itemClassName}
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
              <Icon
                className={this.addPrefix('toggle-icon')}
                icon={pullLeft ? 'angle-left' : 'angle-right'}
              />
              <Ripple />
            </div>
            {this.renderCollapse((transitionProps, ref) => {
              const { className, ...transitionRestProps } = transitionProps || {};
              return (
                <ul
                  {...transitionRestProps}
                  ref={ref}
                  role="menu"
                  className={classNames(classPrefix, className)}
                >
                  {itemsAndStatus.items}
                </ul>
              );
            }, expanded)}
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

  handleToggleChange = (eventKey: any, event: React.SyntheticEvent<any>) => {
    this.props.onToggle?.(eventKey, event);
  };

  isActive(props: any, activeKey: any) {
    if (
      props.active ||
      (typeof activeKey !== 'undefined' && shallowEqual(props.eventKey, activeKey))
    ) {
      return true;
    }

    if (ReactChildren.some(props.children, child => this.isActive(child.props, activeKey))) {
      return true;
    }

    return props.active;
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);
  renderCollapse(children: Function, expanded?: boolean) {
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
      children()
    );
  }

  render() {
    const { children, className, classPrefix, expanded, htmlElementRef, ...props } = this.props;
    const { items, active } = this.getMenuItemsAndStatus(children);
    const unhandled = getUnhandledProps(DropdownMenu, props);
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('active')]: active
    });

    return this.renderCollapse((transitionProps, ref) => {
      const { className: transitionClassName, ...transitionRestProps } = transitionProps || {};

      return (
        <ul
          {...unhandled}
          {...transitionRestProps}
          className={classNames(classes, transitionClassName)}
          role="menu"
          ref={mergeRefs(htmlElementRef, ref)}
        >
          {items}
        </ul>
      );
    }, expanded);
  }
}

export default defaultProps<DropdownMenuProps>({
  classPrefix: 'dropdown-menu'
})(DropdownMenu);
