import React, { useState } from 'react';
import clone from 'lodash/clone';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import SearchBox from '@/internals/SearchBox';
import { filterNodesOfTree } from '@/internals/Tree/utils';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import {
  forwardRef,
  createChainedFunction,
  shallowEqual,
  mergeRefs,
  getDataGroupBy
} from '@/internals/utils';
import {
  Listbox,
  ListCheckItem,
  PickerToggle,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  useFocusItemValue,
  usePickerClassName,
  useSearch,
  useToggleKeyDownEvent,
  usePickerRef,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerHandle,
  PickerToggleProps
} from '@/internals/Picker';
import type { PickerLocale } from '../locales';
import type { ItemDataType, FormControlPickerProps } from '@/internals/types';
import type { MultipleSelectProps } from '../SelectPicker';

export type ValueType = (number | string)[];
export interface CheckPickerProps<T = any>
  extends FormControlPickerProps<T[], PickerLocale, ItemDataType<T>>,
    MultipleSelectProps<T>,
    Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
  /** Top the selected option in the options */
  sticky?: boolean;

  /** A picker that can be counted */
  countable?: boolean;
}

const emptyArray = [];

export interface CheckPickerComponent {
  <T>(props: CheckPickerProps<T>): JSX.Element | null;
  displayName?: string;
}

/**
 * A component for selecting checkable items in a dropdown list.
 * @see https://rsuitejs.com/components/check-picker
 */
const CheckPicker = forwardRef<'div', CheckPickerProps>(
  <T extends number | string>(props: CheckPickerProps<T>, ref: React.Ref<PickerHandle>) => {
    const { propsWithDefaults } = useCustom('CheckPicker', props);
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
      locale,
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
      ...rest
    } = propsWithDefaults;

    const { trigger, root, target, overlay, list, searchInput } = usePickerRef(ref);
    const [value, setValue] = useControlled(valueProp, defaultValue || []);

    // Used to hover the focuse item  when trigger `onKeydown`
    const {
      focusItemValue,
      setFocusItemValue,
      onKeyDown: onFocusItem
    } = useFocusItemValue(value?.[0], {
      data,
      valueKey,
      target: () => overlay.current
    });

    const handleSearchCallback = useEventCallback(
      (searchKeyword: string, filteredData: ItemDataType[], event: React.SyntheticEvent) => {
        // The first option after filtering is the focus.
        setFocusItemValue(filteredData?.[0]?.[valueKey]);
        onSearch?.(searchKeyword, event);
      }
    );

    // Use search keywords to filter options.
    const { searchKeyword, filteredData, handleSearch, resetSearch, checkShouldDisplay } =
      useSearch(data, {
        labelKey,
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

    const handleChangeValue = useEventCallback((value: T[], event: React.SyntheticEvent) => {
      onChange?.(value, event);
    });

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || !cleanable) {
        return;
      }

      setValue([]);
      onClean?.(event);
      handleChangeValue([], event);
    });

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
      trigger,
      target,
      overlay,
      searchInput,
      active,
      onExit: handleClean,
      onMenuKeyDown: onFocusItem,
      onMenuPressEnter: handleMenuPressEnter,
      onMenuPressBackspace: handleClean,
      ...rest
    });

    const handleSelect = useEventCallback(
      (nextItemValue: any, item: ItemDataType, event: React.SyntheticEvent) => {
        onSelect?.(nextItemValue, item, event);
      }
    );

    const handleItemSelect = useEventCallback(
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
      }
    );

    const handleEntered = useEventCallback(() => {
      setActive(true);
    });

    const handleExited = useEventCallback(() => {
      resetSearch();
      setFocusItemValue(null);
      setActive(false);
    });

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

    const renderPopup = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = merge(className, menuClassName, prefix('check-menu'));
      const styles = { ...menuStyle, left, top };
      let items = filteredData;
      let filteredStickyItems: ItemDataType[] = [];

      if (stickyItems) {
        filteredStickyItems = filterNodesOfTree(stickyItems as typeof data, item =>
          checkShouldDisplay(item)
        );
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
          <Listbox<true>
            listProps={listProps}
            listRef={list}
            disabledItemValues={disabledItemValues}
            valueKey={valueKey}
            labelKey={labelKey}
            renderMenuGroup={renderMenuGroup}
            renderMenuItem={renderMenuItem}
            maxHeight={menuMaxHeight}
            classPrefix={'picker-check-menu'}
            listItemAs={ListCheckItem}
            activeItemValues={value}
            focusItemValue={focusItemValue}
            data={[...filteredStickyItems, ...items]}
            groupBy={groupBy}
            onSelect={handleItemSelect}
            onGroupTitleClick={onGroupTitleClick}
            virtualized={virtualized}
            query={searchKeyword}
          />
        ) : (
          <div className={prefix`none`}>{locale?.noResultsText}</div>
        );

      return (
        <PickerPopup
          ref={mergeRefs(overlay, speakerRef)}
          autoWidth={menuAutoWidth}
          className={classes}
          style={styles}
          onKeyDown={onPickerKeyDown}
          target={trigger}
        >
          {searchable && (
            <SearchBox
              placeholder={locale?.searchPlaceholder}
              onChange={handleSearch}
              value={searchKeyword}
              inputRef={searchInput}
            />
          )}
          {renderMenu ? renderMenu(menu) : menu}
          {renderExtraFooter?.()}
        </PickerPopup>
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
        id={id}
        multiple
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={trigger}
        placement={placement}
        onEnter={createChainedFunction(initStickyItems, onEnter)}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderPopup}
      >
        <Component className={classes} style={style} ref={root}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            ref={target}
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
            focusItemValue={focusItemValue}
          >
            {selectedElement || locale?.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
) as CheckPickerComponent;

CheckPicker.displayName = 'CheckPicker';

export default CheckPicker;
