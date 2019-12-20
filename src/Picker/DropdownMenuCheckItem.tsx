import * as React from 'react';
import PropTypes from 'prop-types';

import { prefix, getUnhandledProps, defaultProps } from '../utils';
import Checkbox from '../Checkbox';
import classNames from 'classnames';

export interface DropdownMenuCheckItemProps {
  classPrefix?: string;
  active?: boolean;
  disabled?: boolean;
  checkable?: boolean;
  indeterminate?: boolean;
  value?: any;
  onSelect?: (value: any, event: React.SyntheticEvent<HTMLElement>, checked: boolean) => void;
  onCheck?: (value: any, event: React.SyntheticEvent<HTMLElement>, checked: boolean) => void;
  onSelectItem?: (value: any, event: React.SyntheticEvent<HTMLElement>, checked: boolean) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  focus?: boolean;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  getItemData?: () => any;
  componentClass?: React.ElementType;
  checkboxComponentClass?: React.ElementType;
}

class DropdownMenuCheckItem extends React.Component<DropdownMenuCheckItemProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    checkable: PropTypes.bool,
    indeterminate: PropTypes.bool,
    value: PropTypes.any,
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
    onSelectItem: PropTypes.func,
    onKeyDown: PropTypes.func,
    focus: PropTypes.bool,
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    getItemData: PropTypes.func,
    componentClass: PropTypes.elementType,
    checkboxComponentClass: PropTypes.elementType
  };
  static defaultProps = {
    checkable: true,
    componentClass: 'div',
    checkboxComponentClass: Checkbox
  };

  handleChange = (value: any, checked: boolean, event: React.SyntheticEvent<HTMLElement>) => {
    this.props.onSelect?.(value, event, checked);
  };

  handleCheck = (event: React.SyntheticEvent<HTMLElement>) => {
    const { value, disabled, onCheck, active } = this.props;
    if (!disabled) {
      onCheck?.(value, event, !active);
    }
  };

  handleSelectItem = (event: React.SyntheticEvent<HTMLElement>) => {
    const { value, disabled, onSelectItem, active } = this.props;
    if (!disabled) {
      onSelectItem?.(value, event, !active);
    }
  };

  render() {
    const {
      value,
      active,
      onKeyDown,
      disabled,
      focus,
      children,
      className,
      classPrefix,
      checkable,
      indeterminate,
      componentClass: Component,
      checkboxComponentClass: CheckboxItem,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(DropdownMenuCheckItem, rest);
    const checkboxItemClasses = classNames(classPrefix, {
      [addPrefix('focus')]: focus
    });

    return (
      <Component {...unhandled} className={className} role="menuitem" tabIndex={-1}>
        <CheckboxItem
          value={value}
          role="presentation"
          disabled={disabled}
          checked={active}
          checkable={checkable}
          indeterminate={indeterminate}
          className={checkboxItemClasses}
          onKeyDown={disabled ? null : onKeyDown}
          onChange={this.handleChange}
          onClick={this.handleSelectItem}
          onCheckboxClick={this.handleCheck}
        >
          {children}
        </CheckboxItem>
      </Component>
    );
  }
}

export default defaultProps<DropdownMenuCheckItemProps>({
  classPrefix: 'check-item'
})(DropdownMenuCheckItem);
