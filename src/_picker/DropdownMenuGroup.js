// @flow

import * as React from 'react';
import classNames from 'classnames';
import { toggleClass } from 'dom-lib';
import { prefix, getUnhandledProps } from '../utils';

type Props = {
  title: React.Node,
  classPrefix: string,
  className?: string,
  children?: React.Node,
  onClick?: (event: SyntheticEvent<*>) => void
};

class DropdownMenuGroup extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'dropdown-menu-group'
  };

  DropdownMenuGroup = null;

  handleClickGroup = (event: SyntheticEvent<*>) => {
    const { onClick, classPrefix } = this.props;
    toggleClass(this.DropdownMenuGroup, `${classPrefix}-closed`);
    onClick && onClick(event);
  };

  render() {
    const { title, children, classPrefix, className, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(DropdownMenuGroup, rest);

    return (
      <li
        {...unhandled}
        className={classes}
        ref={ref => {
          this.DropdownMenuGroup = ref;
        }}
      >
        <div
          className={addPrefix('title')}
          role="menuitem"
          tabIndex={-1}
          onClick={this.handleClickGroup}
        >
          <span>{title}</span>
          <span className={addPrefix('caret')} />
        </div>
        <ul className={addPrefix('children')}>{children}</ul>
      </li>
    );
  }
}

export default DropdownMenuGroup;
