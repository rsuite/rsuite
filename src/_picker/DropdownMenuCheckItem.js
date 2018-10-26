// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, getUnhandledProps } from '../utils';

type Props = {
  classPrefix: string,
  active?: boolean,
  disabled?: boolean,
  checkable?: boolean,
  value?: any,
  onSelect?: (value: any, event: SyntheticEvent<*>, checked: boolean) => void,
  onCheck?: (value: any, event: SyntheticEvent<*>, checked: boolean) => void,
  onSelectItem?: (value: any, event: SyntheticEvent<*>, checked: boolean) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  title?: string,
  className?: string,
  children: ?React.Node,
  getItemData?: () => any,
  labelComponentClass: React.ElementType
};

class DropdownMenuCheckItem extends React.Component<Props> {
  static defaultProps = {
    checkable: true,
    labelComponentClass: 'label'
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value, disabled, onSelect } = this.props;
    if (!disabled && onSelect) {
      onSelect(value, event, event.target.checked);
    }
  };

  handleCheck = (event: SyntheticEvent<*>) => {
    const { value, disabled, onCheck, active } = this.props;
    if (!disabled && onCheck) {
      onCheck(value, event, !active);
    }
  };

  handleSelectItem = (event: SyntheticEvent<*>) => {
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
