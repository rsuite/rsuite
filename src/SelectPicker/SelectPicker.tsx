import React, { useState } from 'react';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import SearchBox from '@/internals/SearchBox';
import { PickerLocale } from '../locales';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import {
  forwardRef,
  createChainedFunction,
  mergeRefs,
  shallowEqual,
  getDataGroupBy
} from '@/internals/utils';
import {
  Listbox,
  ListItem,
  PickerToggle,
  PickerToggleTrigger,
  PickerPopup,
  useFocusItemValue,
  usePickerClassName,
  useSearch,
  useToggleKeyDownEvent,
  usePickerRef,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import { useCustom } from '../CustomProvider';
import type { ListProps } from '@/internals/Windowing';
import type { FormControlPickerProps, ItemDataType } from '@/internals/types';

export interface SelectProps<T> {
  /** Set group condition key in data */
  groupBy?: string;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /**
   * Virtualized List Props
   */
  listProps?: Partial<ListProps>;

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
  onSearch?: (searchKeyword: string, event?: React.SyntheticEvent) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;
}

export interface MultipleSelectProps<T> extends Omit<SelectProps<T>, 'renderValue'> {
  /** Custom render selected items */
  renderValue?: (
    value: T[],
    item: ItemDataType<T>[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

export interface SelectPickerProps<T = any>
  extends Omit<
      FormControlPickerProps<T, PickerLocale, ItemDataType<T>>,
      'value' | 'defaultValue' | 'onChange'
    >,
    SelectProps<T>,
    Pick<PickerToggleProps, 'caretAs' | 'label' | 'loading'> {
  /** Initial value */
  defaultValue?: T;

  /** Current value of the component. Creates a controlled component */
  value?: T | null;

  /** Called after the value has been changed */
  onChange?: (value: T | null, event: React.SyntheticEvent) => void;
}

const emptyArray = [];

export interface SelectPickerComponent {
  <T>(props: SelectPickerProps<T>): JSX.Element | null;
  displayName?: string;
}

/**
 * The `SelectPicker` component is used to select an item from a list of data.
 * @see https://rsuitejs.com/components/select-picker/
 */
const SelectPicker = forwardRef<'div', SelectPickerProps>(
  <T extends number | string>(props: SelectPickerProps<T>, ref) => {
    const { propsWithDefaults } = useCustom('SelectPicker', props);
    const {
      as: Component = 'div',
      appearance = 'default',
      data = emptyArray,
      valueKey = 'value',
      labelKey = 'label',
      value: valueProp,
      classPrefix = 'picker',
      placeholder,
      defaultValue,
      disabled,
      cleanable = true,
      placement = 'bottomStart',
      menuClassName,
      menuAutoWidth = true,
      menuMaxHeight = 320,
      menuStyle,
      groupBy,
      locale,
      toggleAs,
      style,
      searchable = true,
      disabledItemValues = emptyArray,
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
      sort,
      renderValue,
      renderMenu,
      renderMenuGroup,
      renderMenuItem,
      renderExtraFooter,
      ...rest
    } = propsWithDefaults;

    const { trigger, root, target, overlay, list, searchInput } = usePickerRef(ref);
    const [value, setValue] = useControlled(valueProp, defaultValue) as [
      T | null | undefined,
      (value: React.SetStateAction<T | null>) => void,
      boolean
    ];

    // Used to hover the focus item  when trigger `onKeydown`
    const {
      focusItemValue,
      setFocusItemValue,
      onKeyDown: onFocusItem
    } = useFocusItemValue(value, {
      data,
      valueKey,
      target: () => overlay.current
    });

    // Use search keywords to filter options.
    const { searchKeyword, filteredData, resetSearch, handleSearch } = useSearch(data, {
      labelKey,
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

    // Use component active state to support keyboard events.
    const [active, setActive] = useState(false);

    const handleClose = useEventCallback(() => {
      trigger.current?.close?.();
    });

    const handleSelect = useEventCallback(
      (value: any, item: ItemDataType, event: React.SyntheticEvent) => {
        onSelect?.(value, item, event);
        target.current?.focus();
      }
    );

    const handleChangeValue = useEventCallback((value: any, event: React.SyntheticEvent) => {
      onChange?.(value, event);
    });

    const handleMenuPressEnter = useEventCallback((event: React.SyntheticEvent) => {
      if (!focusItemValue) {
        return;
      }

      // Find active `MenuItem` by `value`
      const focusItem = data.find(item =>
        shallowEqual(item[valueKey], focusItemValue)
      ) as ItemDataType;

      setValue(focusItemValue);
      handleSelect(focusItemValue, focusItem, event);
      handleChangeValue(focusItemValue, event);
      handleClose();
    });

    const handleItemSelect = useEventCallback(
      (value: any, item: ItemDataType, event: React.SyntheticEvent) => {
        setValue(value);
        setFocusItemValue(value);

        handleSelect(value, item, event);
        handleChangeValue(value, event);
        handleClose();
      }
    );

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || !cleanable) {
        return;
      }
      setValue(null);
      setFocusItemValue(value);
      handleChangeValue(null, event);
    });

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
      ...rest
    });

    const handleExited = useEventCallback(() => {
      resetSearch();
      setActive(false);
      onSearch?.('');
      setFocusItemValue(null);
    });

    const handleEntered = useEventCallback(() => {
      setActive(true);
      setFocusItemValue(value);
    });

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
      selectedElement = renderValue(value, activeItem as ItemDataType, selectedElement);
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const renderPopup = (positionProps: PositionChildProps, speakerRef) => {
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
        <Listbox
          listProps={listProps}
          listRef={list}
          disabledItemValues={disabledItemValues}
          valueKey={valueKey}
          labelKey={labelKey}
          renderMenuGroup={renderMenuGroup}
          renderMenuItem={renderMenuItem}
          maxHeight={menuMaxHeight}
          classPrefix={'picker-select-menu'}
          listItemClassPrefix={'picker-select-menu-item'}
          listItemAs={ListItem}
          activeItemValues={[value]}
          focusItemValue={focusItemValue}
          data={items}
          query={searchKeyword}
          groupBy={groupBy}
          onSelect={handleItemSelect}
          onGroupTitleClick={onGroupTitleClick}
          virtualized={virtualized}
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
      classPrefix,
      appearance,
      hasValue,
      name: 'select',
      cleanable
    });

    return (
      <PickerToggleTrigger
        id={id}
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={trigger}
        placement={placement}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderPopup}
      >
        <Component className={classes} style={style} ref={root}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            ref={target}
            appearance={appearance}
            onClean={createChainedFunction(handleClean, onClean)}
            onKeyDown={onPickerKeyDown}
            as={toggleAs}
            disabled={disabled}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            inputValue={value ?? ''}
            focusItemValue={focusItemValue}
            active={active}
            placement={placement}
          >
            {selectedElement || locale?.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
) as SelectPickerComponent;

SelectPicker.displayName = 'SelectPicker';

export default SelectPicker;
