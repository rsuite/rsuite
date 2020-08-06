import React, { useState, useImperativeHandle, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import Input, { InputProps } from '../Input';
import { refType, useClassNames } from '../utils';
import {
  PickerToggleTrigger,
  onMenuKeyDown,
  DropdownMenu,
  DropdownMenuItem,
  MenuWrapper,
  useFocusItemValue
} from '../Picker';
import { pickerToggleTriggerProps } from '../Picker/PickerToggleTrigger';
import { PLACEMENT } from '../constants';
import { getAnimationPropTypes } from '../Animation/utils';
import { StandardProps, TypeAttributes, ItemDataType } from '../@types/common';
import { transformData, shouldDisplay } from './utils';

export interface AutoCompleteInstance {
  root?: HTMLDivElement;
  menu?: HTMLDivElement;
  open?: () => void;
  close?: () => void;
}

export interface AutoCompleteProps extends StandardProps, Omit<InputProps, 'onSelect'> {
  /** The data of component */
  data?: string[] | ItemDataType[];

  /** Custom filter function to determine whether the item will be displayed */
  filterBy?: (value: string, item: ItemDataType) => boolean;

  /** Additional classes for menu */
  menuClassName?: string;

  /** The placement of component */
  placement?: TypeAttributes.Placement;

  /** When set to false, the Enter key selection function is invalid */
  selectOnEnter?: boolean;

  /** Called when a option is selected */
  onSelect?: (value: any, item: ItemDataType, event: React.SyntheticEvent) => void;

  /** Called on focus */
  onFocus?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on blur */
  onBlur?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called on menu focus */
  onMenuFocus?: (focusItemValue: any, event: React.KeyboardEvent) => void;

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

const defaultProps: Partial<AutoCompleteProps> = {
  classPrefix: 'auto-complete',
  defaultValue: '',
  placement: 'bottomStart',
  selectOnEnter: true
};

const AutoComplete = React.forwardRef(
  (props: AutoCompleteProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      disabled,
      className,
      placement,
      selectOnEnter,
      classPrefix,
      defaultValue,
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
    const [focus, setFocus] = useState(false);
    const items = datalist?.filter(shouldDisplay(filterBy, val)) || [];
    const hasItems = items.length > 0;
    const menuRef = useRef<HTMLDivElement>(null);

    // Used to hover the focuse item  when trigger `onKeydown`
    const [focusItemValue, setFocusItemValue, onKeyDownFocus] = useFocusItemValue(
      value || defaultValue,
      () => menuRef.current,
      { data: datalist, callback: onMenuFocus }
    );

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!menuRef.current) {
        return;
      }
      onMenuKeyDown(event, {
        enter: selectOnEnter ? selectFocusMenuItem : undefined,
        esc: handleClose
      });
      onKeyDownFocus(event);
      onKeyDown?.(event);
    };

    const selectFocusMenuItem = (event: React.KeyboardEvent<HTMLDivElement>) => {
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

    const handleSelect = useCallback(
      (item: ItemDataType, event: React.SyntheticEvent) => {
        onSelect?.(item.value, item, event);
      },
      [onSelect]
    );

    const handleChangeValue = useCallback(
      (value: any, event: React.SyntheticEvent<any>) => {
        onChange?.(value, event);
      },
      [onChange]
    );

    const handleChange = (value: string, event: React.FormEvent<HTMLInputElement>) => {
      setFocusItemValue('');
      setValue(value);
      setFocus(true);
      handleChangeValue(value, event);
    };

    const handleClose = useCallback(() => {
      setFocus(false);
      onClose?.();
    }, [onClose]);

    const handleOpen = useCallback(() => {
      setFocus(true);
      onOpen?.();
    }, [onOpen]);

    const handleItemSelect = useCallback(
      (nextItemValue: string | number, item: ItemDataType, event: React.SyntheticEvent) => {
        setValue(nextItemValue);
        setFocusItemValue(nextItemValue);
        handleSelect(item, event);

        if (val !== nextItemValue) {
          handleChangeValue(nextItemValue, event);
        }
        handleClose();
      },
      [handleSelect, handleChangeValue, handleClose, setFocusItemValue, val]
    );

    const handleInputFocus = useCallback(
      (event: React.SyntheticEvent<HTMLElement>) => {
        handleOpen();
        onFocus?.(event);
      },
      [onFocus, handleOpen]
    );

    const handleInputBlur = useCallback(
      (event: React.SyntheticEvent<HTMLElement>) => {
        setTimeout(handleClose, 300);
        onBlur?.(event);
      },
      [onBlur, handleClose]
    );

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
          pickerProps={pick(props, pickerToggleTriggerProps)}
          trigger={['click', 'focus']}
          open={open || (focus && hasItems)}
          speaker={
            <MenuWrapper ref={menuRef} onKeyDown={handleKeyDown}>
              <DropdownMenu
                classPrefix="auto-complete-menu"
                dropdownMenuItemClassPrefix="auto-complete-item"
                dropdownMenuItemAs={DropdownMenuItem}
                focusItemValue={focusItemValue}
                ref={menuRef}
                onSelect={handleItemSelect}
                renderMenuItem={renderItem}
                data={items}
                className={menuClassName}
              />
            </MenuWrapper>
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
AutoComplete.defaultProps = defaultProps;
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
