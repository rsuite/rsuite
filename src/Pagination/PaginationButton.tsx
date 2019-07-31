import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import { prefix, defaultProps, getUnhandledProps, createChainedFunction } from '../utils';

export interface PaginationButtonProps {
  classPrefix?: string;
  eventKey?: any;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  componentClass: React.ElementType;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onSelect?: (eventKey: any, event: React.MouseEvent) => void;
}

class PaginationButton extends React.Component<PaginationButtonProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    eventKey: PropTypes.any,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
    componentClass: PropTypes.elementType,
    children: PropTypes.node,
    style: PropTypes.object
  };
  handleClick = (event: React.MouseEvent) => {
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

export default defaultProps<PaginationButtonProps>({
  classPrefix: 'pagination-btn',
  componentClass: SafeAnchor
})(PaginationButton);
