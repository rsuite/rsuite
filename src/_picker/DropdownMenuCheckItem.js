// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, getUnhandledProps } from '../utils';

type Props = {
  classPrefix: string,
  active?: boolean,
  disabled?: boolean,
  value?: any,
  onSelect?: (value: any, checked: boolean, event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  title?: string,
  className?: string,
  children: ?React.Node,
  getItemData?: () => any
};

class DropdownMenuCheckItem extends React.Component<Props> {
  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value, disabled, onSelect } = this.props;
    if (!disabled && onSelect) {
      onSelect(value, event.target.checked, event);
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
      <span className={addPrefix('wrapper')}>
        <input checked={active} type="checkbox" disabled={disabled} onChange={this.handleChange} />
        <span className={addPrefix('inner')} />
      </span>
    );

    return (
      <li {...unhandled} className={className} role="menuitem">
        <div className={addPrefix('checker')}>
          <label
            className={classes}
            tabIndex={-1}
            role="presentation"
            onKeyDown={disabled ? null : onKeyDown}
          >
            {input}
            {children}
          </label>
        </div>
      </li>
    );
  }
}

export default DropdownMenuCheckItem;
