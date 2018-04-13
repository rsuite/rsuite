// @flow

import * as React from 'react';
import classNames from 'classnames';

import { getUnhandledProps, defaultProps, prefix } from './utils';

type Props = {
  classPrefix?: string,
  value: string,
  onSelect?: (value: any, event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  className?: string,
  children?: React.Node,
  renderItem?: (itemValue: string) => React.Node
};

class AutoCompleteItem extends React.Component<Props> {
  handleClick = (event: SyntheticEvent<*>) => {
    const { value, onSelect } = this.props;
    onSelect && onSelect(value, event);
  };

  render() {
    const {
      onKeyDown,
      focus,
      children,
      className,
      classPrefix,
      renderItem,
      value,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('focus')]: focus
    });

    const unhandled = getUnhandledProps(AutoCompleteItem, rest);

    return (
      <li {...unhandled} className={className} role="menuitem">
        <a
          className={classes}
          tabIndex={-1}
          role="button"
          onKeyDown={onKeyDown}
          onClick={this.handleClick}
        >
          {renderItem ? renderItem(value) : children}
        </a>
      </li>
    );
  }
}

export default defaultProps({
  classPrefix: 'auto-complete-item'
})(AutoCompleteItem);
