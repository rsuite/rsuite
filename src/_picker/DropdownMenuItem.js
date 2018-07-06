// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, getUnhandledProps } from '../utils';

type Props = {
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean,
  value?: any,
  onSelect?: (value: any, event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  title?: string,
  className?: string,
  children?: React.Node,
  getItemData?: () => any
};

class DropdownMenuItem extends React.Component<Props> {
  handleClick = (event: SyntheticEvent<*>) => {
    const { value, disabled, onSelect } = this.props;
    event.preventDefault();
    if (!disabled && onSelect) {
      onSelect(value, event);
    }
  };

  render() {
    const {
      active,
      onKeyDown,
      disabled,
      focus,
      children,
      className,
      classPrefix,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('focus')]: focus,
      [addPrefix('disabled')]: disabled
    });

    const unhandled = getUnhandledProps(DropdownMenuItem, rest);

    return (
      <li {...unhandled} className={className} role="menuitem">
        <a
          className={classes}
          tabIndex={-1}
          role="presentation"
          onKeyDown={disabled ? null : onKeyDown}
          onClick={this.handleClick}
        >
          {children}
        </a>
      </li>
    );
  }
}

export default DropdownMenuItem;
