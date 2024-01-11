import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  useEventCallback,
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
  useToggleKeyDownEvent,
  usePickerRef,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  listPickerPropTypes,
  PickerHandle,
  PickerToggleProps
} from '../Picker';

import { ListProps } from '../Windowing';
import { FormControlPickerProps, ItemDataType } from '../@types/common';

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

export interface SelectPickerProps<T>
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
  <T>(
    props: SelectPickerProps<T> & {
      ref?: React.Ref<PickerHandle>;
    }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: React.WeakValidationMap<SelectPickerProps<any>>;
}

/**
 * The `SelectPicker` component is used to select an item from a list of data.
 * @see https://rsuitejs.com/components/select-picker/
 */
const SelectPicker = React.forwardRef(
  <T extends number | string>(props: SelectPickerProps<T>, ref: React.Ref<PickerHandle>) => {
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

    const { trigger, root, target, overlay, list, searchInput } = usePickerRef(ref);
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
      onClose: () => {
        setFocusItemValue(null);
      },
      ...rest
    });

    const handleExited = useEventCallback(() => {
      resetSearch();
      setActive(false);
      onSearch?.('');
      onClose?.();
    });

    const handleEntered = useEventCallback(() => {
      setActive(true);
      setFocusItemValue(value);
      onOpen?.();
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
          listRef={list}
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
          ref={mergeRefs(overlay, speakerRef)}
          autoWidth={menuAutoWidth}
          className={classes}
          style={styles}
          onKeyDown={onPickerKeyDown}
          target={trigger}
        >
          {searchable && (
            <SearchBar
              placeholder={locale?.searchPlaceholder}
              onChange={handleSearch}
              value={searchKeyword}
              inputRef={searchInput}
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
        ref={trigger}
        placement={placement}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component className={classes} style={style} root={root}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            id={id}
            ref={target}
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
  }
) as SelectPickerComponent;

SelectPicker.displayName = 'SelectPicker';
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
