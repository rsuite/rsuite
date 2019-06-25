import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { prefix, getUnhandledProps } from '../utils';

export interface DropdownMenuCheckItemProps {
  classPrefix: string;
  active?: boolean;
  disabled?: boolean;
  checkable?: boolean;
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
  labelComponentClass: React.ElementType;
}

class DropdownMenuCheckItem extends React.Component<DropdownMenuCheckItemProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    checkable: PropTypes.bool,
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
    labelComponentClass: PropTypes.elementType
  };
  static defaultProps = {
    checkable: true,
    labelComponentClass: 'label'
  };

  handleChange = (event: React.SyntheticEvent<HTMLElement>) => {
    const { value, disabled, onSelect } = this.props;
    if (!disabled && onSelect) {
      onSelect(value, event, _.get(event, 'target.checked'));
    }
  };

  handleCheck = (event: React.SyntheticEvent<HTMLElement>) => {
    const { value, disabled, onCheck, active } = this.props;
    if (!disabled && onCheck) {
      onCheck(value, event, !active);
    }
  };

  handleSelectItem = (event: React.SyntheticEvent<HTMLElement>) => {
    const { value, disabled, onSelectItem, active } = this.props;
    if (!disabled && onSelectItem) {
      onSelectItem(value, event, !active);
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
      checkable,
      labelComponentClass: Label,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('focus')]: focus,
      [addPrefix('disabled')]: disabled
    });

    const unhandled = getUnhandledProps(DropdownMenuCheckItem, rest);
    const input = (
      <span className={addPrefix('wrapper')} onClick={this.handleCheck}>
        <input checked={active} type="checkbox" disabled={disabled} onChange={this.handleChange} />
        <span className={addPrefix('inner')} />
      </span>
    );

    return (
      <li {...unhandled} className={className} role="menuitem">
        <div className={addPrefix('checker')}>
          <Label
            className={classes}
            tabIndex={-1}
            role="presentation"
            onKeyDown={disabled ? null : onKeyDown}
            onClick={this.handleSelectItem}
          >
            {checkable ? input : null}
            {children}
          </Label>
        </div>
      </li>
    );
  }
}

export default DropdownMenuCheckItem;
