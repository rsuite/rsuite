// @flow

import * as React from 'react';
import get from 'lodash/get';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import prefix, { globalKey } from './utils/prefix';
import DropdownMenuItem from './DropdownMenuItem';
import Icon from './Icon';

type Props = {
  pullRight?: boolean,
  onSelect?: Function,
  className?: string,
  children?: React.ChildrenArray<any>,
  classPrefix?: string
}

class DorpdownMenu extends React.Component<Props> {
  static displayName = 'DropdownMenu';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-menu`
  }

  render() {
    const {
      pullRight,
      children,
      className,
      onSelect,
      classPrefix,
      ...props
    } = this.props;

    const addPrefix: Function = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('right')]: pullRight
    }, className);

    const items = React.Children.map(children, (item, index) => {
      let displayName = get(item, ['type', 'displayName']);
      if (displayName === 'DropdownMenuItem' || displayName === 'NavItem') {
        let { onSelect: onItemSelect } = item.props;
        return React.cloneElement(item, {
          key: index,
          onSelect: createChainedFunction(onSelect, onItemSelect)
        });
      } else if (displayName === 'DropdownMenu') {
        return (
          <DropdownMenuItem
            componentClass="div"
            submenu
          >
            {item.props.title} <Icon icon="angle-right" />
            {item}
          </DropdownMenuItem>
        );
      }

      return item;
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
