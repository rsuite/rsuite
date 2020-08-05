import React, { useRef, useState, useCallback, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash/clone';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { filterNodesOfTree } from '../utils/treeUtils';
import {
  createChainedFunction,
  getDataGroupBy,
  useClassNames,
  shallowEqual,
  useCustom
} from '../utils';
import {
  DropdownMenu,
  DropdownMenuCheckItem as DropdownMenuItem,
  PickerToggle,
  getToggleWrapperClassName,
  onMenuKeyDown,
  MenuWrapper,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  shouldDisplay,
  useFocusItemValue
} from '../Picker';
import { pickerToggleTriggerProps } from '../Picker/PickerToggleTrigger';
import { ItemDataType, FormControlPickerProps } from '../@types/common';
import { listPickerPropTypes } from '../Picker/propTypes';
import { SelectProps } from '../SelectPicker/SelectPicker.d';
import { KEY_CODE } from '../constants';

export interface CheckPickerProps<T = (number | string)[]>
  extends FormControlPickerProps<T>,
    SelectProps<T> {
  /** Top the selected option in the options */
  sticky?: boolean;

  /** A picker that can be counted */
  countable?: boolean;
}

export interface CheckPickerInstance extends React.HTMLAttributes<HTMLDivElement> {
  root?: HTMLDivElement;
  menu?: HTMLDivElement;
  toggle?: HTMLButtonElement;
  open?: () => void;
  close?: () => void;
}

interface Locale {
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
}

const defaultProps: CheckPickerProps = {
  appearance: 'default',
  classPrefix: 'picker',
  childrenKey: 'children',
  countable: true,
  searchable: true,
  virtualized: true,
  cleanable: true,
  data: [],
  disabledItemValues: [],
  valueKey: 'value',
  labelKey: 'label',
  placement: 'bottomStart',
  menuAutoWidth: true,
  menuMaxHeight: 320
};

const CheckPicker = React.forwardRef((props: CheckPickerProps, ref) => {
  const {
    classPrefix,
    countable,
    data,
    disabledItemValues,
    valueKey,
    labelKey,
    searchable,
    virtualized,
    cleanable,
    placement,
    menuAutoWidth,
    menuMaxHeight,
    menuClassName,
    menuStyle,
    locale: overrideLocale,
    placeholder,
    disabled,
    toggleAs,
    style,
    sticky,
    value,
    defaultValue,
    groupBy,
    listProps,
    renderMenuItem,
    renderMenuGroup,
    onSearch,
    onEnter,
    onEntered,
    onExited,
    onClean,
    onChange,
    onSelect,
    onClose,
    onOpen,
    onGroupTitleClick,
    renderValue,
    renderExtraFooter,
    renderMenu,
    sort,
    searchBy,
    ...rest
  } = props;

  const rootRef = useRef<HTMLDivElement>();
  const triggerRef = useRef<any>();
  const positionRef = useRef();
  const toggleRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLDivElement>();
  const menuWrapperRef = useRef<HTMLDivElement>();
  const { locale } = useCustom<Locale>('Picker', overrideLocale);

  const [valueState, setValue] = useState(clone(defaultValue) || []);
  const val = isUndefined(value) ? valueState : value;
  const [stickyItems, setStickyItems] = useState([]);

  // Used to hover the focuse item  when trigger `onKeydown`
  const [focusItemValue, setFocusItemValue] = useFocusItemValue(
    val?.[0],
    [() => toggleRef.current, () => menuWrapperRef.current],
    { data, valueKey }
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [active, setActive] = useState(false);
  const { prefix, merge } = useClassNames(classPrefix);
  const initStickyItems = () => {
    if (!sticky) {
      return;
    }

    let nextStickyItems = [];
    if (data && val.length) {
      nextStickyItems = data.filter(item => {
        return val.some(v => v === item[valueKey]);
      });
    }

    setStickyItems(nextStickyItems);
  };

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  const checkShouldDisplay = useCallback(
    (item: ItemDataType, keyword?: string) => {
      const label = item?.[labelKey];
      const _keyword = isUndefined(keyword) ? searchKeyword : keyword;

      if (typeof searchBy === 'function') {
        return searchBy(_keyword, label, item);
      }
      return shouldDisplay(label, _keyword);
    },
    [searchBy, labelKey, searchKeyword]
  );

  const handleClose = useCallback(() => {
    triggerRef.current?.hide?.();
    setFocusItemValue(val ? val[0] : undefined);
  }, [triggerRef, setFocusItemValue, val]);

  const handleOpen = useCallback(() => {
    triggerRef.current?.show?.();
  }, [triggerRef]);

  const handleToggleDropdown = () => {
    if (active) {
      handleClose();
      return;
    }
    handleOpen();
  };

  const handleChangeValue = useCallback(
    (value: any, event: React.SyntheticEvent<HTMLElement>) => {
      onChange?.(value, event);
    },
    [onChange]
  );

  const handleClean = useCallback(
    (event: React.SyntheticEvent<any>) => {
      if (disabled || !cleanable) {
        return;
      }
      setValue([]);
      handleChangeValue([], event);
    },
    [disabled, cleanable, handleChangeValue]
  );

  const handleSearch = useCallback(
    (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => {
      const filteredData = filterNodesOfTree(data, item => checkShouldDisplay(item, searchKeyword));
      setSearchKeyword(searchKeyword);
      setFocusItemValue(filteredData?.[0]?.[valueKey]);
      onSearch?.(searchKeyword, event);
    },
    [data, valueKey, onSearch, checkShouldDisplay, setFocusItemValue]
  );

  const selectFocusMenuItem = (event: React.KeyboardEvent<HTMLElement>) => {
    const nextValue = clone(val);

    if (!focusItemValue) {
      return;
    }

    if (!nextValue.some(v => shallowEqual(v, focusItemValue))) {
      nextValue.push(focusItemValue);
    } else {
      remove(nextValue, itemVal => shallowEqual(itemVal, focusItemValue));
    }

    const focusItem: any = data.find(item => shallowEqual(item?.[valueKey], focusItemValue));
    setValue(nextValue);
    handleSelect(nextValue, focusItem, event);
    handleChangeValue(nextValue, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<any>) => {
    // enter
    if ((!focusItemValue || !active) && event.keyCode === KEY_CODE.ENTER) {
      handleToggleDropdown();
    }

    // delete
    if (event.keyCode === KEY_CODE.BACKSPACE && event.target === toggleRef?.current) {
      handleClean(event);
    }

    if (!menuRef.current) {
      return;
    }

    onMenuKeyDown(event, {
      enter: selectFocusMenuItem,
      esc: handleClose
    });
  };

  const handleSelect = useCallback(
    (nextItemValue: any, item: ItemDataType, event: React.SyntheticEvent<HTMLElement>) => {
      onSelect?.(nextItemValue, item, event);
    },
    [onSelect]
  );

  const handleItemSelect = useCallback(
    (nextItemValue: any, item: ItemDataType, event: React.MouseEvent<any>, checked: boolean) => {
      const nextValue = clone(val);

      if (checked) {
        nextValue.push(nextItemValue);
      } else {
        remove(nextValue, itemVal => shallowEqual(itemVal, nextItemValue));
      }

      setValue(nextValue);
      setFocusItemValue(nextItemValue);

      handleSelect(nextValue, item, event);
      handleChangeValue(nextValue, event);
    },
    [val, handleSelect, handleChangeValue, setFocusItemValue]
  );

  const handleExited = useCallback(() => {
    setSearchKeyword('');
    setFocusItemValue(null);
    setActive(false);
    onClose?.();
  }, [onClose, setFocusItemValue]);

  const handleEntered = useCallback(() => {
    setActive(true);
    onOpen?.();
  }, [onOpen]);

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    get menu() {
      return menuRef.current;
    },
    get toggle() {
      return toggleRef.current;
    },
    open: handleOpen,
    close: handleClose
  }));

  const selectedItems: any[] =
    data.filter(item => val.some(val => shallowEqual(item[valueKey], val))) || [];

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  const hasValue = selectedItems.length > 0 || (val?.length > 0 && isFunction(renderValue));

  let selectedElement: React.ReactNode = placeholder;

  if (selectedItems.length > 0) {
    selectedElement = (
      <SelectedElement
        selectedItems={selectedItems}
        countable={countable}
        valueKey={valueKey}
        labelKey={labelKey}
        prefix={prefix}
      />
    );
  }

  if (val?.length > 0 && isFunction(renderValue)) {
    selectedElement = renderValue(val, selectedItems, selectedElement);
  }

  const classes = getToggleWrapperClassName('check', prefix, props, hasValue);

  const renderDropdownMenu = () => {
    const classes = merge(prefix('check-menu'), menuClassName);
    let filteredData = [];
    let filteredStickyItems = [];

    if (stickyItems) {
      filteredStickyItems = filterNodesOfTree(stickyItems, item => checkShouldDisplay(item));
      filteredData = filterNodesOfTree(data, item => {
        return checkShouldDisplay(item) && !stickyItems.some(v => v[valueKey] === item[valueKey]);
      });
    } else {
      filteredData = filterNodesOfTree(data, item => checkShouldDisplay(item));
    }

    // Create a tree structure data when set `groupBy`
    if (groupBy) {
      filteredData = getDataGroupBy(filteredData, groupBy, sort);
    } else if (typeof sort === 'function') {
      filteredData = filteredData.sort(sort(false));
    }

    const menu =
      filteredData.length || filteredStickyItems.length ? (
        <DropdownMenu
          ref={menuRef}
          listProps={listProps}
          disabledItemValues={disabledItemValues}
          valueKey={valueKey}
          labelKey={labelKey}
          renderMenuGroup={renderMenuGroup}
          renderMenuItem={renderMenuItem}
          maxHeight={menuMaxHeight}
          classPrefix={'picker-check-menu'}
          dropdownMenuItemAs={DropdownMenuItem}
          activeItemValues={val}
          focusItemValue={focusItemValue}
          data={[...filteredStickyItems, ...filteredData]}
          group={!isUndefined(groupBy)}
          onSelect={handleItemSelect}
          onGroupTitleClick={onGroupTitleClick}
          virtualized={virtualized}
        />
      ) : (
        <div className={prefix`none`}>{locale?.noResultsText}</div>
      );

    return (
      <MenuWrapper
        ref={menuWrapperRef}
        autoWidth={menuAutoWidth}
        className={classes}
        style={menuStyle}
        onKeyDown={handleKeyDown}
        getToggleInstance={() => toggleRef.current}
        getPositionInstance={() => positionRef.current}
      >
        {searchable && (
          <SearchBar
            placeholder={locale?.searchPlaceholder}
            onChange={handleSearch}
            value={searchKeyword}
          />
        )}
        {renderMenu ? renderMenu(menu) : menu}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  };

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickerToggleTriggerProps)}
      ref={triggerRef}
      positionRef={positionRef}
      placement={placement}
      onEnter={createChainedFunction(initStickyItems, onEnter)}
      onEntered={createChainedFunction(handleEntered, onEntered)}
      onExited={createChainedFunction(handleExited, onExited)}
      speaker={renderDropdownMenu()}
    >
      <div ref={rootRef} className={classes} style={style}>
        <PickerToggle
          {...omit(rest, pickerToggleTriggerProps)}
          ref={toggleRef}
          onClean={createChainedFunction(handleClean, onClean)}
          onKeyDown={handleKeyDown}
          as={toggleAs}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={active}
        >
          {selectedElement || locale.placeholder}
        </PickerToggle>
      </div>
    </PickerToggleTrigger>
  );
});

CheckPicker.displayName = 'CheckPicker';
CheckPicker.propTypes = {
  ...listPickerPropTypes,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  menuAutoWidth: PropTypes.bool,
  menuMaxHeight: PropTypes.number,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  searchable: PropTypes.bool,
  countable: PropTypes.bool,
  sticky: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
};

CheckPicker.defaultProps = defaultProps;

export default CheckPicker;
