import React, { useState, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import shallowEqual from '../utils/shallowEqual';
import Input, { InputProps } from '../Input';
import { refType, useClassNames } from '../utils';
import { PickerToggleTrigger, onMenuKeyDown } from '../Picker';
import { PLACEMENT } from '../constants';
import { getAnimationPropTypes } from '../Animation/utils';
import { StandardProps, TypeAttributes, ItemDataType } from '../@types/common';
import DropdownMenu from './DropdownMenu';
import { transformData, shouldDisplay } from './utils';

export interface AutoCompleteInstance extends React.HTMLAttributes<HTMLDivElement> {
  root?: HTMLDivElement;
  menu?: HTMLDivElement;
  open?: () => void;
  close?: () => void;
}

export interface AutoCompleteProps extends StandardProps, Omit<InputProps, 'onSelect'> {
  /** The data of component */
  data?: any[];

  /** Custom filter function to determine whether the item will be displayed */
  filterBy?: (value: string, item: ItemDataType) => boolean;

  /** Additional classes for menu */
  menuClassName?: string;

  /** The placement of component */
  placement?: TypeAttributes.Placement;

  /** When set to false, the Enter key selection function is invalid */
  selectOnEnter?: boolean;

  /** Called when a option is selected */
  onSelect?: (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on focus */
  onFocus?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on blur */
  onBlur?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on menu focus */
  onMenuFocus?: (focusItemValue: any, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The callback triggered by keyboard events. */
  onKeyDown?: (event: React.KeyboardEvent) => void;

  /** Called on open */
  onOpen?: () => void;

  /** Called on close */
  onClose?: () => void;

  /** Custom selected option */
  renderItem?: (itemData: ItemDataType) => React.ReactNode;

  /** Open the menu and control it */
  open?: boolean;

  /** Position of ref */
  positionRef?: React.Ref<any>;
}

const AutoComplete = React.forwardRef(
  (props: AutoCompleteProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      disabled,
      className,
      placement = 'bottomStart',
      selectOnEnter = true,
      classPrefix = 'auto-complete',
      defaultValue = '',
      data,
      value,
      open,
      style,
      menuClassName,
      renderItem,
      onSelect,
      filterBy,
      onKeyDown,
      onChange,
      onClose,
      onOpen,
      onFocus,
      onBlur,
      onMenuFocus,
      ...rest
    } = props;

    const datalist = transformData(data);
    const [val, setValue] = useState(value || defaultValue);
    const [focusItemValue, setFocusItemValue] = useState(value || defaultValue);
    const [focus, setFocus] = useState(false);
    const items = datalist?.filter(shouldDisplay(filterBy, val)) || [];
    const hasItems = items.length > 0;
    const menuRef = useRef(null);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!menuRef.current) {
        return;
      }
      onMenuKeyDown(event, {
        down: focusNextMenuItem,
        up: focusPrevMenuItem,
        enter: selectOnEnter ? selectFocusMenuItem : undefined,
        esc: handleClose
      });

      onKeyDown?.(event);
    };

    const selectFocusMenuItem = (event: React.SyntheticEvent<HTMLElement>) => {
      if (!focusItemValue) {
        return;
      }

      const focusItem = datalist.find(item => item?.value === focusItemValue);
      setValue(focusItemValue);
      setFocusItemValue(focusItemValue);

      handleSelect(focusItem, event);
      if (val !== focusItemValue) {
        handleChangeValue(focusItemValue, event);
      }

      handleClose();
    };

    const handleItemSelect = (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => {
      const value = item.value;

      setValue(value);
      setFocusItemValue(value);
      handleSelect(item, event);

      if (val !== value) {
        handleChangeValue(value, event);
      }
      handleClose();
    };

    const handleSelect = (item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => {
      onSelect?.(item, event);
    };

    const handleChangeValue = (value: any, event: React.SyntheticEvent<HTMLElement>) => {
      onChange?.(value, event);
    };

    const handleChange = (value: string, event: React.FormEvent<HTMLInputElement>) => {
      setFocusItemValue('');
      setValue(value);
      setFocus(true);
      handleChangeValue(value, event);
    };

    const handleInputFocus = (event: React.SyntheticEvent<HTMLElement>) => {
      handleOpen();
      onFocus?.(event);
    };

    const handleInputBlur = (event: React.SyntheticEvent<HTMLElement>) => {
      setTimeout(handleClose, 300);
      onBlur?.(event);
    };

    const handleClose = () => {
      setFocus(false);
      onClose?.();
    };
    const handleOpen = () => {
      setFocus(true);
      onOpen?.();
    };

    const findNode = (focus: (items: any[], index: number) => void) => {
      for (let i = 0; i < items.length; i += 1) {
        if (shallowEqual(focusItemValue, items[i].value)) {
          focus(items, i);
          return;
        }
      }
      focus(items, -1);
    };

    const focusNextMenuItem = (event: React.SyntheticEvent<HTMLElement>) => {
      findNode((items: any[], index: number) => {
        const item = items[index + 1];
        if (!isUndefined(item)) {
          setFocusItemValue(item.value);
          onMenuFocus?.(item.value, event);
        }
      });
    };

    const focusPrevMenuItem = (event: React.SyntheticEvent<HTMLElement>) => {
      findNode((items: any[], index: number) => {
        const item = items[index - 1];
        if (!isUndefined(item)) {
          setFocusItemValue(item.value);
          onMenuFocus?.(item.value, event);
        }
      });
    };

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ disabled }));
    const rootRef = useRef(null);

    useImperativeHandle(ref, (): any => ({
      root: rootRef.current,
      get menu() {
        return menuRef.current;
      },
      open: handleOpen,
      close: handleClose
    }));

    return (
      <div ref={rootRef} className={classes} style={style}>
        <PickerToggleTrigger
          placement={placement}
          pickerProps={props}
          trigger={['click', 'focus']}
          open={open || (focus && hasItems)}
          speaker={
            <DropdownMenu
              focusItemValue={focusItemValue}
              ref={menuRef}
              onKeyDown={handleKeyDown}
              onSelect={handleItemSelect}
              renderItem={renderItem}
              data={items}
              className={menuClassName}
            />
          }
        >
          <Input
            {...rest}
            disabled={disabled}
            value={val}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </PickerToggleTrigger>
      </div>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';
AutoComplete.propTypes = {
  ...getAnimationPropTypes(),
  data: PropTypes.array,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  classPrefix: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  placement: PropTypes.oneOf(PLACEMENT),
  onFocus: PropTypes.func,
  onMenuFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  renderItem: PropTypes.func,
  style: PropTypes.object,
  open: PropTypes.bool,
  selectOnEnter: PropTypes.bool,
  filterBy: PropTypes.func,
  positionRef: refType
};

export default AutoComplete;
