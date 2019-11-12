import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getUnhandledProps, defaultProps, prefix } from '../utils';

import { AutoCompleteItemProps } from './AutoCompleteItem.d';

class AutoCompleteItem extends React.Component<AutoCompleteItemProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    itemData: PropTypes.object,
    onSelect: PropTypes.func,
    onKeyDown: PropTypes.func,
    focus: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    renderItem: PropTypes.func
  };

  handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
    const { itemData, onSelect } = this.props;
    onSelect?.(itemData, event);
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

export default defaultProps<AutoCompleteItemProps>({
  classPrefix: 'auto-complete-item'
})(AutoCompleteItem);
