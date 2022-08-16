import React, { useRef, useState, useCallback, Ref } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash/clone';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import { filterNodesOfTree } from '../utils/treeUtils';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  getDataGroupBy,
  useClassNames,
  shallowEqual,
  useCustom,
  useControlled,
  mergeRefs
} from '../utils';

import {
  DropdownMenu,
  DropdownMenuCheckItem as DropdownMenuItem,
  PickerToggle,
  PickerOverlay,
  SearchBar,
  SelectedElement,
  PickerToggleTrigger,
  useFocusItemValue,
  usePickerClassName,
  useSearch,
  usePublicMethods,
  useToggleKeyDownEvent,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  OverlayTriggerHandle,
  PositionChildProps,
  listPickerPropTypes,
  PickerHandle,
  PickerToggleProps
} from '../Picker';

import { ItemDataType, FormControlPickerProps } from '../@types/common';
import type { MultipleSelectProps } from '../SelectPicker';
import { TreeNodeType } from '../CheckTreePicker/utils';
import { ListHandle } from '../Windowing';

export type ValueType = (number | string)[];
export interface CheckPickerProps<T>
  extends FormControlPickerProps<T[], PickerLocale, ItemDataType<T>>,
    MultipleSelectProps<T>,
    Pick<PickerToggleProps, 'label' | 'caretAs'> {
  /** Top the selected option in the options */
  sticky?: boolean;

  /** A picker that can be counted */
  countable?: boolean;
}

const emptyArray = [];

export interface CheckPickerComponent {
  <T>(
    props: CheckPickerProps<T> & {
      ref?: Ref<PickerHandle>;
    }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: React.WeakValidationMap<CheckPickerProps<any>>;
}

const CheckPicker = React.forwardRef(
  <T extends number | string>(props: CheckPickerProps<T>, ref: React.Ref<PickerHandle>) => {
    const {
      as: Component = 'div',
      appearance = 'default',
      classPrefix = 'picker',
      countable = true,
      data = emptyArray,
      disabledItemValues = emptyArray,
      valueKey = 'value',
      labelKey = 'label',
      searchable = true,
      virtualized,
      cleanable = true,
      placement = 'bottomStart',
      menuAutoWidth = true,
      menuMaxHeight = 320,
      menuClassName,
      menuStyle,
      locale: overrideLocale,
      placeholder,
      disabled,
      toggleAs,
      style,
      sticky,
      value: valueProp,
      defaultValue,
      groupBy,
      listProps,
      id,
      sort,
      searchBy,
      renderMenuItem,
      renderMenuGroup,
      renderValue,
      renderExtraFooter,
      renderMenu,
      onGroupTitleClick,
      onSearch,
      onEnter,
      onEntered,
      onExited,
      onClean,
      onChange,
      onSelect,
      onClose,
      onOpen,
      ...rest
    } = props;

    const triggerRef = useRef<OverlayTriggerHandle>(null);
    const targetRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<ListHandle>(null);
    const { locale } = useCustom<PickerLocale>('Picker', overrideLocale);
    const [value, setValue] = useControlled(valueProp, defaultValue || []);

    // Used to hover the focuse item  when trigger `onKeydown`
    const {
      focusItemValue,
      setFocusItemValue,
      onKeyDown: onFocusItem
    } = useFocusItemValue(value?.[0], {
      data,
      valueKey,
      target: () => overlayRef.current
    });

    const handleSearchCallback = useCallback(
      (searchKeyword: string, filteredData: ItemDataType[], event: React.SyntheticEvent) => {
        // The first option after filtering is the focus.
        setFocusItemValue(filteredData?.[0]?.[valueKey]);
        onSearch?.(searchKeyword, event);
      },
      [setFocusItemValue, onSearch, valueKey]
    );

    // Use search keywords to filter options.
    const { searchKeyword, filteredData, setSearchKeyword, handleSearch, checkShouldDisplay } =
      useSearch({
        labelKey,
        data,
        searchBy,
        callback: handleSearchCallback
      });

    // Use component active state to support keyboard events.
    const [active, setActive] = useState(false);

    // A list of shortcut options.
    // when opened again, the selected options are displayed at the top.
    const [stickyItems, setStickyItems] = useState<ItemDataType[]>([]);

    const initStickyItems = () => {
      if (!sticky) {
        return;
      }

      let nextStickyItems: ItemDataType[] = [];
      if (data && value.length) {
        nextStickyItems = data.filter(item => {
          return value.some(v => v === item[valueKey]);
        });
      }

      setStickyItems(nextStickyItems);
    };

    const handleChangeValue = useCallback(
      (value: T[], event: React.SyntheticEvent) => {
        onChange?.(value, event);
      },
      [onChange]
    );

    const handleClean = useCallback(
      (event: React.SyntheticEvent) => {
        if (disabled || !cleanable) {
          return;
        }

        setValue([]);
        onClean?.(event);
        handleChangeValue([], event);
      },
      [disabled, cleanable, setValue, onClean, handleChangeValue]
    );

    const handleMenuPressEnter = (event: React.KeyboardEvent<HTMLElement>) => {
      const nextValue = clone(value);

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
      onMenuPressBackspace: handleClean,
      onClose: () => {
        setFocusItemValue(null);
      },
      ...rest
    });

    const handleSelect = useCallback(
      (nextItemValue: any, item: ItemDataType, event: React.SyntheticEvent) => {
        onSelect?.(nextItemValue, item, event);
      },
      [onSelect]
    );

    const handleItemSelect = useCallback(
      (nextItemValue: any, item: ItemDataType, event: React.SyntheticEvent, checked: boolean) => {
        const nextValue = clone(value);

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
      [value, setValue, handleSelect, handleChangeValue, setFocusItemValue]
    );

    const handleEntered = useCallback(() => {
      setActive(true);
      onOpen?.();
    }, [onOpen]);

    const handleExited = useCallback(() => {
      setSearchKeyword('');
      setFocusItemValue(null);
      setActive(false);
      onClose?.();
    }, [onClose, setFocusItemValue, setSearchKeyword]);

    usePublicMethods(ref, { triggerRef, overlayRef, targetRef, listRef });

    const selectedItems =
      data.filter(item => value?.some(val => shallowEqual(item[valueKey], val))) || [];

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue = selectedItems.length > 0 || (value?.length > 0 && isFunction(renderValue));

    const { prefix, merge } = useClassNames(classPrefix);

    let selectedElement = placeholder;

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

    if (value?.length > 0 && isFunction(renderValue)) {
      selectedElement = renderValue(value, selectedItems, selectedElement);
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = merge(className, menuClassName, prefix('check-menu'));
      const styles = { ...menuStyle, left, top };
      let items = filteredData;
      let filteredStickyItems: TreeNodeType[] = [];

      if (stickyItems) {
        filteredStickyItems = filterNodesOfTree(stickyItems, item => checkShouldDisplay(item));
        items = filterNodesOfTree(data, item => {
          return checkShouldDisplay(item) && !stickyItems.some(v => v[valueKey] === item[valueKey]);
        });
      }

      // Create a tree structure data when set `groupBy`
      if (groupBy) {
        items = getDataGroupBy(items, groupBy, sort);
      } else if (typeof sort === 'function') {
        items = items.sort(sort(false));
      }

      const menu =
        items.length || filteredStickyItems.length ? (
          <DropdownMenu<true>
            id={id ? `${id}-listbox` : undefined}
            listProps={listProps}
            listRef={listRef}
            disabledItemValues={disabledItemValues}
            valueKey={valueKey}
            labelKey={labelKey}
            renderMenuGroup={renderMenuGroup}
            renderMenuItem={renderMenuItem}
            maxHeight={menuMaxHeight}
            classPrefix={'picker-check-menu'}
            dropdownMenuItemAs={DropdownMenuItem}
            activeItemValues={value}
            focusItemValue={focusItemValue}
            data={[...filteredStickyItems, ...items]}
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
      appearance,
      classPrefix,
      cleanable,
      countable,
      hasValue,
      name: 'check'
    });

    return (
      <PickerToggleTrigger
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        placement={placement}
        onEnter={createChainedFunction(initStickyItems, onEnter)}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component className={classes} style={style}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            id={id}
            ref={targetRef}
            appearance={appearance}
            disabled={disabled}
            onClean={handleClean}
            onKeyDown={onPickerKeyDown}
            as={toggleAs}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={active}
            placement={placement}
            inputValue={value}
          >
            {selectedElement || locale?.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
) as CheckPickerComponent;

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

export default CheckPicker;
