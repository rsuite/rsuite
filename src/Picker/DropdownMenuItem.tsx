import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';

export interface DropdownMenuItemProps {
  classPrefix: string;
  componentClass?: React.ElementType;
  active?: boolean;
  disabled?: boolean;
  value?: any;
  onSelect?: (value: any, event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  focus?: boolean;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  getItemData?: () => any;
}

class DropdownMenuItem extends React.Component<DropdownMenuItemProps> {
  static propTypes = {
    classPrefix: PropTypes.string.isRequired,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onSelect: PropTypes.func,
    onKeyDown: PropTypes.func,
    focus: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    getItemData: PropTypes.func,
    componentClass: PropTypes.elementType
  };
  static defaultProps = {
    componentClass: 'div'
  };

  handleClick = (event: React.MouseEvent) => {
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
      componentClass: Component,
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
      <Component {...unhandled} className={className} role="listitem">
        <a
          className={classes}
          tabIndex={-1}
          onKeyDown={disabled ? null : onKeyDown}
          onClick={this.handleClick}
        >
          {children}
        </a>
      </Component>
    );
  }
}

export default defaultProps<DropdownMenuItemProps>({
  classPrefix: 'dropdown-menu-item'
})(DropdownMenuItem);
