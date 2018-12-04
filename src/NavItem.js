// @flow

import * as React from 'react';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';

import SafeAnchor from './SafeAnchor';
import Icon from './Icon';
import Tooltip from './Tooltip';
import Whisper from './Whisper';
import Ripple from './Ripple';

import { createChainedFunction, defaultProps, prefix } from './utils';

type Props = {
  active?: boolean,
  disabled?: boolean,
  className?: string,
  classPrefix?: string,
  divider?: boolean,
  panel?: boolean,
  onClick?: (event: SyntheticEvent<*>) => void,
  style?: Object,
  icon?: React.Element<typeof Icon>,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  children?: React.Node,
  eventKey?: any,
  tabIndex?: number,
  hasTooltip?: boolean,
  componentClass: React.ElementType
};

const addTooltip = (children, tip) => (
  <Whisper speaker={<Tooltip>{tip}</Tooltip>} placement="right">
    {children}
  </Whisper>
);

class NavItem extends React.Component<Props> {
  static defaultProps = {
    tabIndex: 0
  };

  handleClick = (event: SyntheticEvent<*>) => {
    const { onSelect, disabled, eventKey } = this.props;
    if (onSelect && !disabled) {
      onSelect(eventKey, event);
    }
  };

  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      classPrefix,
      style,
      eventKey,
      children,
      icon,
      tabIndex,
      hasTooltip,
      divider,
      panel,
      componentClass: Component,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled
    });

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
        {...props}
        role="button"
        tabIndex={tabIndex}
        className={addPrefix('content')}
        disabled={disabled}
        onClick={createChainedFunction(onClick, this.handleClick)}
      >
        {icon}
        <span className={addPrefix('text')}>{children}</span>
        <Ripple />
      </Component>
    );

    return (
      <li role="presentation" className={classes} style={style}>
        {hasTooltip ? addTooltip(item, children) : item}
      </li>
    );
  }
}

const EnhancedNavItem = defaultProps({
  classPrefix: 'nav-item',
  componentClass: SafeAnchor
})(NavItem);

const Component: EnhancedNavItem = setDisplayName('NavItem')(EnhancedNavItem);

export default Component;
