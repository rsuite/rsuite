// @flow

import * as React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import { contains, getWidth, addStyle } from 'dom-lib';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';
import SafeAnchor from './SafeAnchor';
import Icon from './Icon';

type Props = {
  divider?: boolean,
  panel?: boolean,
  active?: boolean,
  disabled?: boolean,
  pullLeft?: boolean,
  submenu?: boolean,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  icon?: React.Element<typeof Icon>,
  eventKey?: any,
  className?: string,
  style?: Object,
  children?: React.Node,
  classPrefix?: string,
  tabIndex?: number,
}

type States = {
  open?: boolean
}

const Component = createComponent(SafeAnchor);

class DropdownMenuItem extends React.Component<Props, States> {

  static displayName = 'DropdownMenuItem';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-item`,
    tabIndex: -1,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = (event: SyntheticEvent<*>) => {
    let { onSelect, eventKey, disabled, onClick } = this.props;
    if (disabled) {
      event.preventDefault();
      return;
    }

    onSelect && onSelect(eventKey, event);
    onClick && onClick(event);
  }

  handleMouseEnter = (event: SyntheticEvent<*>) => {

    const { pullLeft } = this.props;
    const menu = event.currentTarget.querySelector(`.${globalKey}dropdown-menu`);

    this.setState({ open: true }, () => {
      if (pullLeft && menu) {
        let width = getWidth(menu);
        addStyle(menu, 'left', `${-width}px`);
      }
    });
  }

  handleMouseLeave = () => {
    this.setState({ open: false });
  }

  render() {

    const {
      children,
      divider,
      panel,
      onSelect,
      active,
      disabled,
      className,
      eventKey,
      submenu,
      style,
      classPrefix,
      tabIndex,
      pullLeft,
      icon,
      ...props
    } = this.props;

    const { open } = this.state;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('submenu')]: submenu,
      [addPrefix('open')]: open,
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled
    }, className);

    if (divider) {
      return (
        <li
          role="separator"
          style={style}
          className={classNames(addPrefix('divider'), className)}
        />
      );
    }

    if (panel) {
      return (
        <li
          style={style}
          className={classNames(addPrefix('panel'), className)}
        >
          {children}
        </li>
      );
    }

    return (
      <li
        style={style}
        role="presentation"
        className={classes}
        onMouseOver={submenu ? this.handleMouseEnter : null}
        onMouseOut={submenu ? this.handleMouseLeave : null}
      >
        <Component
          {...props}
          className={addPrefix('content')}
          tabIndex={tabIndex}
          onClick={this.handleClick}
        >
          {icon}
          {children}
        </Component>
      </li>
    );
  }
}

export default DropdownMenuItem;
