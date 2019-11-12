import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import { prefix, defaultProps, getUnhandledProps, createChainedFunction } from '../utils';

import { PaginationButtonProps } from './PaginationButton.d';

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
    style: PropTypes.object,
    renderItem: PropTypes.func
  };
  handleClick = (event: React.MouseEvent) => {
    const { disabled, onSelect, eventKey } = this.props;
    if (disabled) {
      return;
    }

    onSelect?.(eventKey, event);
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
      renderItem,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PaginationButton, rest);
    const classes = classNames(classPrefix, className, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled
    });
    const item = (
      <Component
        {...unhandled}
        disabled={disabled}
        onClick={createChainedFunction(onClick, this.handleClick)}
      >
        {children}
        <Ripple />
      </Component>
    );

    return (
      <li className={classes} style={style}>
        {renderItem ? renderItem(item) : item}
      </li>
    );
  }
}

export default defaultProps<PaginationButtonProps>({
  classPrefix: 'pagination-btn',
  componentClass: SafeAnchor
})(PaginationButton);
