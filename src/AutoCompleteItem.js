// @flow

import * as React from 'react';
import classNames from 'classnames';

import { getUnhandledProps, defaultProps, prefix } from './utils';

type ItemDataType = {
  label: any,
  value: any
};

type Props = {
  classPrefix?: string,
  itemData: ItemDataType,
  onSelect?: (itemData: ItemDataType, event: SyntheticEvent<*>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<*>) => void,
  focus?: boolean,
  className?: string,
  children?: React.Node,
  renderItem?: (itemValue: ItemDataType) => React.Node
};

class AutoCompleteItem extends React.Component<Props> {
  handleClick = (event: SyntheticEvent<*>) => {
    const { itemData, onSelect } = this.props;
    onSelect && onSelect(itemData, event);
  };

  render() {
    const {
      onKeyDown,
      focus,
      children,
      className,
      classPrefix,
      renderItem,
      itemData,
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
          {renderItem ? renderItem(itemData) : children}
        </a>
      </li>
    );
  }
}

export default defaultProps({
  classPrefix: 'auto-complete-item'
})(AutoCompleteItem);
