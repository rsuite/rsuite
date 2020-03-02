import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import SafeAnchor from '../SafeAnchor';
import { prefix, isOneOf, createChainedFunction, defaultProps, getUnhandledProps } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { DropdownMenuItemProps } from './DropdownMenuItem.d';

interface DropdownMenuItemState {
  open?: boolean;
}

class DropdownMenuItem extends React.Component<DropdownMenuItemProps, DropdownMenuItemState> {
  static displayName = 'DropdownMenuItem';
  static contextType = SidenavContext;
  static propTypes = {
    divider: PropTypes.bool,
    panel: PropTypes.bool,
    trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
    open: PropTypes.bool,
    expanded: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    pullLeft: PropTypes.bool,
    submenu: PropTypes.bool,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    icon: PropTypes.node,
    eventKey: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    classPrefix: PropTypes.string,
    tabIndex: PropTypes.number,
    componentClass: PropTypes.elementType,
    renderItem: PropTypes.func
  };
  static defaultProps = {
    tabIndex: -1,
    trigger: 'hover'
  };

  constructor(props: DropdownMenuItemProps) {
    super(props);
    this.state = {
      open: props.open
    };
  }

  getOpen() {
    const { open } = this.props;
    if (_.isUndefined(open)) {
      return this.state.open;
    }
    return open;
  }

  toggle = (_event: React.SyntheticEvent<any>, isOpen?: boolean) => {
    const open = _.isUndefined(isOpen) ? !this.getOpen() : isOpen;
    this.setState({ open });
  };

  handleClick = (event: React.SyntheticEvent<any>) => {
    const { onSelect, eventKey, disabled, onClick } = this.props;

    if (disabled) {
      event.preventDefault();
      return;
    }

    onSelect?.(eventKey, event);
    onClick?.(event);
  };

  handleMouseOver = (event: React.SyntheticEvent<any>) => {
    this.toggle(event, true);
  };

  handleMouseOut = (event: React.SyntheticEvent<any>) => {
    this.toggle(event, false);
  };

  render() {
    const {
      children,
      divider,
      panel,
      active,
      disabled,
      className,
      submenu,
      style,
      classPrefix,
      tabIndex,
      pullLeft,
      icon,
      trigger,
      expanded,
      componentClass: Component,
      renderItem,
      ...rest
    } = this.props;

    const unhandled = getUnhandledProps(DropdownMenuItem, rest);
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix(expanded ? 'expand' : 'collapse')]: submenu && _.get(this.context, 'sidenav'),
      [addPrefix('submenu')]: submenu,
      [addPrefix('open')]: this.getOpen(),
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
      [addPrefix(`pull-${pullLeft ? 'left' : 'right'}`)]: pullLeft,
      [addPrefix('with-icon')]: icon
    });

    const itemProps: any = {};
    const itemToggleProps: any = {
      onClick: this.handleClick
    };

    if (isOneOf('hover', trigger) && submenu && !_.get(this.context, 'expanded')) {
      itemProps.onMouseOver = this.handleMouseOver;
      itemProps.onMouseOut = this.handleMouseOut;
    }

    if (isOneOf('click', trigger) && submenu) {
      itemToggleProps.onClick = createChainedFunction(this.handleClick, this.toggle);
    }

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
        <li style={style} className={classNames(addPrefix('panel'), className)}>
          {children}
        </li>
      );
    }

    const item = (
      <Component
        {...unhandled}
        {...itemToggleProps}
        className={addPrefix('content')}
        tabIndex={tabIndex}
      >
        {icon && React.cloneElement(icon, { className: addPrefix('menu-icon') })}
        {children}
      </Component>
    );

    return (
      <li {...itemProps} style={style} className={classes}>
        {renderItem ? renderItem(item) : item}
      </li>
    );
  }
}

export default defaultProps<DropdownMenuItemProps>({
  classPrefix: 'dropdown-item',
  componentClass: SafeAnchor
})(DropdownMenuItem);
