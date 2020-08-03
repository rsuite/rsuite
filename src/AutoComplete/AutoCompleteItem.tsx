import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps, ItemDataType } from '../@types/common';

export interface AutoCompleteItemProps extends StandardProps {
  /** The current item data. */
  itemData: ItemDataType;

  /** Whether the current item has focus */
  focus?: boolean;

  /** The triggered callback is after clicking the item. */
  onSelect?: (itemData: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The callback triggered by keyboard events. */
  onKeyDown?: (event: React.KeyboardEvent) => void;

  /** Custom rendering item */
  renderItem?: (itemData: ItemDataType) => React.ReactNode;
}

const AutoCompleteItem = React.forwardRef(
  (props: AutoCompleteItemProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      children,
      className,
      classPrefix = 'auto-complete-item',
      focus,
      itemData,
      renderItem,
      onKeyDown,
      onSelect,
      ...rest
    } = props;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        onSelect?.(itemData, event);
      },
      [itemData, onSelect]
    );

    const { withClassPrefix } = useClassNames(classPrefix);
    const classes = withClassPrefix({ focus });

    return (
      <li {...rest} ref={ref} className={className} role="menuitem">
        <a
          className={classes}
          tabIndex={-1}
          role="button"
          onKeyDown={onKeyDown}
          onClick={handleClick}
        >
          {renderItem ? renderItem(itemData) : children}
        </a>
      </li>
    );
  }
);

AutoCompleteItem.displayName = 'AutoCompleteItem';
AutoCompleteItem.propTypes = {
  classPrefix: PropTypes.string,
  itemData: PropTypes.any,
  onSelect: PropTypes.func,
  onKeyDown: PropTypes.func,
  focus: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  renderItem: PropTypes.func
};

export default AutoCompleteItem;
