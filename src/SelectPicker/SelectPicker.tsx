import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  getDataGroupBy,
  useCustom,
  useClassNames,
  useControlled,
  mergeRefs,
  shallowEqual
} from '../utils';
import {
  DropdownMenu,
  DropdownMenuItem,
  PickerToggle,
  PickerToggleTrigger,
  PickerOverlay,
  SearchBar,
  useFocusItemValue,
  usePickerClassName,
  useSearch,
  usePublicMethods,
  useToggleKeyDownEvent,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  OverlayTriggerInstance,
  PositionChildProps,
  listPickerPropTypes,
  PickerComponent
} from '../Picker';

import { TypeAttributes, FormControlPickerProps, ItemDataType } from '../@types/common';
import { ListProps } from 'react-virtualized/dist/commonjs/List';

export type ValueType = number | string;
export interface SelectProps<T = ValueType> {
  /** Set group condition key in data */
  groupBy?: string;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /**
   * List-related properties in `react-virtualized`
   * https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
   */
  listProps?: ListProps;

  /** A picker can have different sizes */
  size?: TypeAttributes.Size;

  /** Custom search rules. */
  searchBy?: (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean;

  /** Sort options */
  sort?: (isGroup: boolean) => (a: any, b: any) => number;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render menuItems */
  renderMenuItem?: (label: React.ReactNode, item: ItemDataType) => React.ReactNode;

  /** Custom render menu group */
  renderMenuGroup?: (title: React.ReactNode, item: ItemDataType) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: T,
    item: ItemDataType | ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, item: ItemDataType, event: React.SyntheticEvent) => void;

  /** Called after clicking the group title */
  onGroupTitleClick?: (event: React.SyntheticEvent) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;
}

export interface SelectPickerProps<T = ValueType>
  extends FormControlPickerProps<T, PickerLocale, ItemDataType>,
    SelectProps<T> {}

const defaultProps: Partial<SelectPickerProps> = {
  as: 'div',
  appearance: 'default',
  classPrefix: 'picker',
  searchable: true,
  cleanable: true,
  data: [],
  disabledItemValues: [],
  valueKey: 'value',
  labelKey: 'label',
  placement: 'bottomStart',
  menuAutoWidth: true,
  menuMaxHeight: 320
};

const SelectPicker: PickerComponent<SelectPickerProps> = React.forwardRef(
  (props: SelectPickerProps, ref) => {
    const {
      as: Component,
      data,
      valueKey,
      labelKey,
      value: valueProp,
      classPrefix,
      placeholder,
      defaultValue,
      disabled,
      cleanable,
      placement,
      menuClassName,
      menuAutoWidth,
      menuMaxHeight,
      menuStyle,
      groupBy,
      locale: overrideLocale,
      toggleAs,
      style,
      searchable,
      disabledItemValues,
      virtualized,
      listProps,
      id,
      onGroupTitleClick,
      searchBy,
      onEntered,
      onExited,
      onClean,
      onChange,
      onSelect,
      onSearch,
      onClose,
      onOpen,
      sort,
      renderValue,
      renderMenu,
      renderMenuGroup,
      renderMenuItem,
      renderExtraFooter,
      ...rest
    } = props;

    const triggerRef = useRef<OverlayTriggerInstance>();
    const targetRef = useRef<HTMLButtonElement>();
    const overlayRef = useRef<HTMLDivElement>();
    const searchInputRef = useRef<HTMLInputElement>();
    const { locale } = useCustom<PickerLocale>('Picker', overrideLocale);
    const [value, setValue] = useControlled<ValueType>(valueProp, defaultValue);

    // Used to hover the focus item  when trigger `onKeydown`
    const { focusItemValue, setFocusItemValue, onKeyDown: onFocusItem } = useFocusItemValue(value, {
      data,
      valueKey,
      target: () => overlayRef.current
    });

    // Use search keywords to filter options.
    const {
      searchKeyword,
      filteredData,
      updateFilteredData,
      setSearchKeyword,
      handleSearch
    } = useSearch({
      labelKey,
      data,
      searchBy,
      callback: (
        searchKeyword: string,
        filteredData: ItemDataType[],
        event: React.SyntheticEvent
      ) => {
        // The first option after filtering is the focus.
        setFocusItemValue(filteredData?.[0]?.[valueKey]);
        onSearch?.(searchKeyword, event);
      }
    });

    useEffect(() => {
      updateFilteredData(data);
    }, [data, updateFilteredData]);

    // Use component active state to support keyboard events.
    const [active, setActive] = useState(false);

    const handleClose = useCallback(() => {
      triggerRef.current?.close?.();
    }, []);

    const handleSelect = useCallback(
      (value: any, item: ItemDataType, event: React.SyntheticEvent) => {
        onSelect?.(value, item, event);
        targetRef.current?.focus();
      },
      [onSelect]
    );

    const handleChangeValue = useCallback(
      (value: any, event: React.SyntheticEvent) => {
        onChange?.(value, event);
      },
      [onChange]
    );

    const handleMenuPressEnter = useCallback(
      (event: React.SyntheticEvent) => {
        if (!focusItemValue) {
          return;
        }

        // Find active `MenuItem` by `value`
        const focusItem = data.find(item => shallowEqual(item[valueKey], focusItemValue));

        setValue(focusItemValue);
        handleSelect(focusItemValue, focusItem, event);
        handleChangeValue(focusItemValue, event);
        handleClose();
      },
      [data, focusItemValue, handleChangeValue, handleClose, handleSelect, setValue, valueKey]
    );

    const handleItemSelect = useCallback(
      (value: any, item: ItemDataType, event: React.SyntheticEvent) => {
        setValue(value);
        setFocusItemValue(value);

        handleSelect(value, item, event);
        handleChangeValue(value, event);
        handleClose();
      },
      [setValue, setFocusItemValue, handleSelect, handleChangeValue, handleClose]
    );

    const handleClean = useCallback(
      (event: React.SyntheticEvent) => {
        if (disabled || !cleanable) {
          return;
        }
        setValue(null);
        setFocusItemValue(value);
        handleChangeValue(null, event);
      },
      [value, disabled, cleanable, setValue, handleChangeValue, setFocusItemValue]
    );

    const onPickerKeyDown = useToggleKeyDownEvent({
      toggle: !focusItemValue || !active,
      triggerRef,
      targetRef,
      overlayRef,
      searchInputRef,
      active,
      onExit: handleClean,
      onMenuKeyDown: onFocusItem,
      onMenuPressEnter: handleMenuPressEnter,
      onClose: () => {
        setFocusItemValue(null);
      },
      ...rest
    });

    const handleExited = useCallback(() => {
      setSearchKeyword('');
      setActive(false);
      onClose?.();
    }, [onClose, setSearchKeyword]);

    const handleEntered = useCallback(() => {
      setActive(true);
      setFocusItemValue(value);
      onOpen?.();
    }, [onOpen, setFocusItemValue, value]);

    usePublicMethods(ref, { triggerRef, overlayRef, targetRef });

    // Find active `MenuItem` by `value`
    const activeItem = data.find(item => shallowEqual(item[valueKey], value));

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue = !!activeItem || (!isNil(value) && isFunction(renderValue));

    const { prefix, merge } = useClassNames(classPrefix);

    let selectedElement: React.ReactNode = placeholder;

    if (activeItem?.[labelKey]) {
      selectedElement = activeItem[labelKey];
    }

    if (!isNil(value) && isFunction(renderValue)) {
      selectedElement = renderValue(value, activeItem, selectedElement);
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = merge(className, menuClassName, prefix('select-menu'));
      const styles = { ...menuStyle, left, top };
      let items = filteredData;

      // Create a tree structure data when set `groupBy`
      if (groupBy) {
        items = getDataGroupBy(items, groupBy, sort);
      } else if (typeof sort === 'function') {
        items = items.sort(sort(false));
      }

      const menu = items.length ? (
        <DropdownMenu
          id={id ? `${id}-listbox` : undefined}
          listProps={listProps}
          disabledItemValues={disabledItemValues}
          valueKey={valueKey}
          labelKey={labelKey}
          renderMenuGroup={renderMenuGroup}
          renderMenuItem={renderMenuItem}
          maxHeight={menuMaxHeight}
          classPrefix={'picker-select-menu'}
          dropdownMenuItemClassPrefix={'picker-select-menu-item'}
          dropdownMenuItemAs={DropdownMenuItem}
          activeItemValues={[value]}
          focusItemValue={focusItemValue}
          data={items}
          group={!isUndefined(groupBy)}
          onSelect={handleItemSelect}
          onGroupTitleClick={onGroupTitleClick}
          virtualized={virtualized}
        />
      ) : (
        <div className={prefix`none`}>{locale?.noResultsText}</div>
      );

      return (
        <PickerOverlay
          ref={mergeRefs(overlayRef, speakerRef)}
          autoWidth={menuAutoWidth}
          className={classes}
          style={styles}
          onKeyDown={onPickerKeyDown}
          target={triggerRef}
        >
          {searchable && (
            <SearchBar
              placeholder={locale?.searchPlaceholder}
              onChange={handleSearch}
              value={searchKeyword}
              inputRef={searchInputRef}
            />
          )}

          {renderMenu ? renderMenu(menu) : menu}
          {renderExtraFooter?.()}
        </PickerOverlay>
      );
    };

    const [classes, usedClassNamePropKeys] = usePickerClassName({
      ...props,
      hasValue,
      name: 'select'
    });

    return (
      <PickerToggleTrigger
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        placement={placement}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component className={classes} style={style}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            id={id}
            ref={targetRef}
            onClean={createChainedFunction(handleClean, onClean)}
            onKeyDown={onPickerKeyDown}
            as={toggleAs}
            disabled={disabled}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            inputValue={value}
            active={active}
            placement={placement}
          >
            {selectedElement || locale?.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
);

SelectPicker.displayName = 'SelectPicker';
SelectPicker.defaultProps = defaultProps;
SelectPicker.propTypes = {
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
  /**
   * group by key in `data`
   */
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  searchable: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
};

export default SelectPicker;
