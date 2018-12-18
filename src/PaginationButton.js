// @flow

import * as React from 'react';
import classNames from 'classnames';

import SafeAnchor from './SafeAnchor';
import Ripple from './Ripple';
import { prefix, defaultProps, getUnhandledProps, createChainedFunction } from './utils';

type Props = {
  classPrefix?: string,
  eventKey?: any,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  disabled?: boolean,
  active?: boolean,
  className?: string,
  componentClass: React.ElementType,
  children?: React.Node,
  style?: Object
};

class PaginationButton extends React.Component<Props> {
  handleClick = (event: SyntheticEvent<*>) => {
    const { disabled, onSelect, eventKey } = this.props;
    if (disabled) {
      return;
    }

    onSelect && onSelect(eventKey, event);
  };

  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      classPrefix,
      style,
      componentClass: Component,
      children,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PaginationButton, rest);
    const classes = classNames(classPrefix, className, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled
    });

    return (
      <li className={classes} style={style}>
        <Component
          {...unhandled}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        >
          {children}
          <Ripple />
        </Component>
      </li>
    );
  }
}

export default defaultProps({
  classPrefix: 'pagination-btn',
  componentClass: SafeAnchor
})(PaginationButton);
