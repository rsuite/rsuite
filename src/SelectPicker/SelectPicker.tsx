import React, { useState } from 'react';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import SearchBox from '@/internals/SearchBox';
import { PickerLocale } from '../locales';
import { useStyles, useControlled, useEventCallback } from '@/internals/hooks';
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
  useSearch,
  useToggleKeyDownEvent,
  usePickerRef,
  triggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import { useCustom } from '../CustomProvider';
import type { ListProps } from '@/internals/Windowing';
import type {
  FormControlPickerProps,
  Option,
  ListboxProps,
  PopupProps,
  DeprecatedMenuProps
} from '@/internals/types';

export interface SelectProps<T> extends ListboxProps, PopupProps, DeprecatedMenuProps {
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
  searchBy?: (keyword: string, label: React.ReactNode, item: Option) => boolean;

  /** Sort options */
  sort?: (isGroup: boolean) => (a: any, b: any) => number;

  /** Custom render selected items */
  renderValue?: (value: T, item: Option<T>, selectedElement: React.ReactNode) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, item: Option<T>, event: React.SyntheticEvent) => void;

  /** Called after clicking the group title */
  onGroupTitleClick?: (event: React.SyntheticEvent) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event?: React.SyntheticEvent) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;
}

export interface SelectPickerProps<T = any>
  extends Omit<
      FormControlPickerProps<T, PickerLocale, Option<T>>,
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
  <T>(props: SelectPickerProps<T>): React.ReactElement | null;
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
      appearance = 'default',
      as,
      block,
      className,
      cleanable = true,
      classPrefix = 'picker',
      data = emptyArray,
      defaultValue,
      disabled,
      disabledItemValues = emptyArray,
      groupBy,
      id,
      labelKey = 'label',
      listProps,
      listboxMaxHeight = 320,
      locale,
      placeholder,
      placement = 'bottomStart',
      popupAutoWidth = true,
      popupClassName,
      popupStyle,
      searchable = true,
      style,
      toggleAs,
      value: valueProp,
      valueKey = 'value',
      virtualized,
      sort,
      searchBy,
      renderValue,
      renderListbox,
      renderOptionGroup,
      renderOption,
      renderExtraFooter,
      onGroupTitleClick,
      onEntered,
      onExited,
      onClean,
      onChange,
      onSelect,
      onSearch,
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
      callback: (searchKeyword: string, filteredData: Option[], event: React.SyntheticEvent) => {
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
      (value: any, item: Option<T>, event: React.SyntheticEvent) => {
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
      const focusItem = data.find(item => shallowEqual(item[valueKey], focusItemValue)) as Option;

      setValue(focusItemValue);
      handleSelect(focusItemValue, focusItem, event);
      handleChangeValue(focusItemValue, event);
      handleClose();
    });

    const handleItemSelect = useEventCallback(
      (value: any, item: Option, event: React.SyntheticEvent) => {
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

    const { prefix, merge } = useStyles(classPrefix);

    let selectedElement: React.ReactNode = placeholder;

    if (activeItem?.[labelKey]) {
      selectedElement = activeItem[labelKey];
    }

    if (!isNil(value) && isFunction(renderValue)) {
      selectedElement = renderValue(value, activeItem as Option<T>, selectedElement);
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const renderPopup = (positionProps: PositionChildProps, speakerRef) => {
      const { className } = positionProps;
      const classes = merge(className, popupClassName, prefix('select-menu'));
      let items = filteredData;

      // Create a tree structure data when set `groupBy`
      if (groupBy) {
        items = getDataGroupBy(items, groupBy, sort);
      } else if (typeof sort === 'function') {
        items = items.sort(sort(false));
      }

      const listbox = items.length ? (
        <Listbox
          listProps={listProps}
          listRef={list}
          disabledItemValues={disabledItemValues}
          valueKey={valueKey}
          labelKey={labelKey}
          renderOptionGroup={renderOptionGroup}
          renderOption={renderOption}
          maxHeight={listboxMaxHeight}
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
          autoWidth={popupAutoWidth}
          className={classes}
          style={popupStyle}
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

          {renderListbox ? renderListbox(listbox) : listbox}
          {renderExtraFooter?.()}
        </PickerPopup>
      );
    };

    const triggerProps = {
      ...pick(props, triggerPropKeys),
      onEntered: createChainedFunction(handleEntered, onEntered),
      onExited: createChainedFunction(handleExited, onExited)
    };

    return (
      <PickerToggleTrigger
        as={as}
        id={id}
        name="select"
        block={block}
        disabled={disabled}
        appearance={appearance}
        triggerProps={triggerProps}
        ref={trigger}
        placement={placement}
        speaker={renderPopup}
        rootRef={root}
        style={style}
        classPrefix={classPrefix}
        className={className}
      >
        <PickerToggle
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
          {...rest}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </PickerToggleTrigger>
    );
  }
) as SelectPickerComponent;

SelectPicker.displayName = 'SelectPicker';

export default SelectPicker;
