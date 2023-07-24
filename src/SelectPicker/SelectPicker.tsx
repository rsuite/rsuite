import React, { useRef, useState, useCallback, Ref } from 'react';
import pick from 'lodash/pick';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  useCustom,
  useClassNames,
  useControlled,
  mergeRefs,
  shallowEqual
} from '../utils';
import { getDataGroupBy } from '../utils/getDataGroupBy';
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
  OverlayTriggerHandle,
  PositionChildProps,
  PickerHandle,
  PickerToggleProps
} from '../Picker';

import { ListProps } from '../Windowing';
import { FormControlPickerProps, ItemDataType } from '../@types/common';
import { ListHandle } from '../Windowing';

export interface SelectProps<T, V> {
  /** Set group condition key in data */
  groupBy?: string;

  /** Whether to display an loading indicator on toggle button */
  loading?: boolean;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /**
   * Virtualized List Props
   */
  listProps?: Partial<ListProps>;

  /** Custom search rules. */
  searchBy?: (keyword: string, label: React.ReactNode, item: T) => boolean;

  /** Sort options */
  sort?: (isGroup: boolean) => (a: any, b: any) => number;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render menuItems */
  renderMenuItem?: (label: React.ReactNode, item: T) => React.ReactNode;

  /** Custom render menu group */
  renderMenuGroup?: (title: React.ReactNode, item: T) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (value: V, item: T | T[], selectedElement: React.ReactNode) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, item: T, event: React.SyntheticEvent) => void;

  /** Called after clicking the group title */
  onGroupTitleClick?: (event: React.SyntheticEvent) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event?: React.SyntheticEvent) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;
}

export interface MultipleSelectProps<T, V> extends Omit<SelectProps<T, V>, 'renderValue'> {
  /** Custom render selected items */
  renderValue?: (value: V[], item: T[], selectedElement: React.ReactNode) => React.ReactNode;
}

export type SelectPickerProps<T, V> =
  | SelectPickerPropsWithFaithfulValue<T>
  | SelectPickerPropsWithDerivedValue<T, V>;

interface SelectPickerPropsWithFaithfulValue<T>
  extends Omit<FormControlPickerProps<T, PickerLocale, T>, 'value' | 'defaultValue' | 'onChange'>,
    SelectProps<T, T>,
    Pick<PickerToggleProps, 'caretAs' | 'label'> {
  data: T[];
  getItemValue?: never | undefined;
  /** Initial value */
  defaultValue?: T;

  /** Current value of the component. Creates a controlled component */
  value?: T | null;

  /** Called after the value has been changed */
  onChange?: (value: T | null, event: React.SyntheticEvent) => void;
}

interface SelectPickerPropsWithDerivedValue<T, V>
  extends Omit<FormControlPickerProps<V, PickerLocale, T>, 'value' | 'defaultValue' | 'onChange'>,
    SelectProps<T, V>,
    Pick<PickerToggleProps, 'caretAs' | 'label'> {
  data: T[];
  getItemValue?: (item: T) => V;
  /** Initial value */
  defaultValue?: V;

  /** Current value of the component. Creates a controlled component */
  value?: V | null;

  /** Called after the value has been changed */
  onChange?: (value: V | null, event: React.SyntheticEvent) => void;
}

const emptyArray = [];

const SelectPicker = React.forwardRef(function SelectPicker<T, V>(
  props: SelectPickerProps<T, V>,
  ref: React.ForwardedRef<PickerHandle>
) {
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
    locale: overrideLocale,
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

  const triggerRef = useRef<OverlayTriggerHandle>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<ListHandle>(null);
  const { locale } = useCustom<PickerLocale>('Picker', overrideLocale);
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
    target: () => overlayRef.current
  });

  // Use search keywords to filter options.
  const { searchKeyword, filteredData, resetSearch, handleSearch } = useSearch(data, {
    labelKey,
    searchBy,
    callback: (searchKeyword, filteredData, event) => {
      // The first option after filtering is the focus.
      setFocusItemValue(filteredData?.[0]?.[valueKey]);
      onSearch?.(searchKeyword, event);
    }
  });

  // Use component active state to support keyboard events.
  const [active, setActive] = useState(false);

  const handleClose = useCallback(() => {
    triggerRef.current?.close?.();
  }, []);

  const handleSelect = useCallback(
    (value: any, item: T, event: React.SyntheticEvent) => {
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
      const focusItem = data.find(item => shallowEqual(item[valueKey], focusItemValue)) as T;

      setValue(focusItemValue);
      handleSelect(focusItemValue, focusItem, event);
      handleChangeValue(focusItemValue, event);
      handleClose();
    },
    [data, focusItemValue, handleChangeValue, handleClose, handleSelect, setValue, valueKey]
  );

  const handleItemSelect = useCallback(
    (value: any, item: T, event: React.SyntheticEvent) => {
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
    resetSearch();
    setActive(false);
    onSearch?.('');
    onClose?.();
  }, [onClose, resetSearch, onSearch]);

  const handleEntered = useCallback(() => {
    setActive(true);
    setFocusItemValue(value);
    onOpen?.();
  }, [onOpen, setFocusItemValue, value]);

  usePublicMethods(ref, { triggerRef, overlayRef, targetRef, listRef });

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
        listRef={listRef}
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
        // FIXME-Doma
        // `group` is redundant so long as `groupBy` exists
        group={!isUndefined(groupBy)}
        groupBy={groupBy}
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
    classPrefix,
    appearance,
    hasValue,
    name: 'select',
    cleanable
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
          appearance={appearance}
          onClean={createChainedFunction(handleClean, onClean)}
          onKeyDown={onPickerKeyDown}
          as={toggleAs}
          disabled={disabled}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          inputValue={value ?? ''}
          active={active}
          placement={placement}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
}) as <T, V>(props: SelectPickerProps<T, V>) => React.ReactElement | null;

SelectPicker.displayName = 'SelectPicker';

export default SelectPicker;
