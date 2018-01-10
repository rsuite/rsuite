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

type Props = {
  activeKey?: any,
  className?: string,
  children?: React.ChildrenArray<any>,
  classPrefix?: string,
  pullLeft?: boolean,
  onSelect?: Function,
  title?: React.Node
}

class DorpdownMenu extends React.Component<Props> {
  static displayName = 'DropdownMenu';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-menu`
  }

  addPrefix(name: string) {
    const { classPrefix } = this.props;
    return prefix(classPrefix)(name);
  }
  isActive(props: Object, activeKey: any) {
    if (
      props.active ||
      (activeKey !== null && isEqual(props.eventKey, activeKey))
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

  renderMenuItems(children?: React.ChildrenArray<any>): React.ChildrenArray<any> {

    const { activeKey, onSelect } = this.props;
    const items = React.Children.map(children, (item, index) => {
      let displayName = get(item, ['type', 'displayName']);

      if (displayName === 'DropdownMenuItem' || displayName === 'NavItem') {
        let { onSelect: onItemSelect } = item.props;
        return React.cloneElement(item, {
          key: index,
          active: this.isActive(item.props, activeKey),
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });
      } else if (displayName === 'DropdownMenu') {

        return (
          <DropdownMenuItem
            active={this.isActive(item.props, activeKey)}
            componentClass="div"
            className={this.addPrefix(`pull-${item.props.pullLeft ? 'left' : 'right'}`)}
            submenu
          >
            <div className={this.addPrefix('toggle')}>
              <span>{item.props.title}</span>
              <Icon icon="angle-right" />
            </div>
            <ul role="menu">
              {this.renderMenuItems(item.props.children)}
            </ul>
          </DropdownMenuItem>
        );
      }
      return item;
    });

    return items;
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

    const classes = classNames(classPrefix, className);
    const items = this.renderMenuItems(children);

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
