import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import getWidth from 'dom-lib/getWidth';
import shallowEqual from '../utils/shallowEqual';
import { filterNodesOfTree } from '../utils/treeUtils';
import Plaintext from '../Plaintext';
import {
  createChainedFunction,
  tplTransform,
  useClassNames,
  useCustom,
  useControlled,
  useEventCallback,
  mergeRefs,
  isOneOf,
  KEY_VALUES
} from '../utils';
import { getDataGroupBy } from '../utils/getDataGroupBy';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckItem,
  PickerToggle,
  PickerOverlay,
  PickerToggleTrigger,
  useFocusItemValue,
  usePickerClassName,
  useSearch,
  usePickerRef,
  useToggleKeyDownEvent,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerComponent,
  listPickerPropTypes,
  PickerToggleProps
} from '../Picker';

import Tag from '../Tag';
import InputAutosize from './InputAutosize';
import InputSearch from './InputSearch';
import InputPickerContext from './InputPickerContext';

import type { ItemDataType, FormControlPickerProps } from '../@types/common';
import type { InputPickerLocale } from '../locales';
import type { SelectProps } from '../SelectPicker';

interface InputItemDataType extends ItemDataType {
  create?: boolean;
}

export type ValueType = any;
export interface InputPickerProps<T = ValueType>
  extends FormControlPickerProps<T, InputPickerLocale, InputItemDataType>,
    SelectProps<T>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  tabIndex?: number;

  /** Settings can create new options */
  creatable?: boolean;

  /** Option to cache value when searching asynchronously */
  cacheData?: InputItemDataType[];

  /** The `onBlur` attribute for the `input` element. */
  onBlur?: React.FocusEventHandler;

  /** The `onFocus` attribute for the `input` element. */
  onFocus?: React.FocusEventHandler;

  /** Called when the option is created */
  onCreate?: (value: ValueType, item: ItemDataType, event: React.SyntheticEvent) => void;

  /**
   * Customize whether to display "Create option" action with given textbox value
   *
   * By default, InputPicker hides "Create option" action when textbox value matches any filtered item's [valueKey] property
   *
   * @param searchKeyword Value of the textbox
   * @param filteredData The items filtered by the searchKeyword
   */
  shouldDisplayCreateOption?: (
    searchKeyword: string,
    // FIXME-Doma Use generic type
    filteredData: InputItemDataType[]
  ) => boolean;
}

/**
 * Single item selector with text box input.
 *
 * @see https://rsuitejs.com/components/input-picker
 */
const InputPicker: PickerComponent<InputPickerProps> = React.forwardRef(
  (props: InputPickerProps, ref) => {
    const {
      as: Component = 'div',
      appearance = 'default',
      cleanable = true,
      cacheData = [],
      classPrefix = 'picker',
      data: controlledData = [],
      disabled,
      readOnly,
      plaintext,
      defaultValue,
      defaultOpen = false,
      disabledItemValues = [],
      locale: overrideLocale,
      toggleAs,
      style,
      searchable = true,
      open: controlledOpen,
      placeholder,
      groupBy,
      menuClassName,
      menuStyle,
      menuAutoWidth = true,
      menuMaxHeight = 320,
      creatable,
      shouldDisplayCreateOption,
      value: valueProp,
      valueKey = 'value',
      virtualized,
      labelKey = 'label',
      listProps,
      id,
      tabIndex,
      sort,
      renderMenu,
      renderExtraFooter,
      renderValue,
      renderMenuItem,
      renderMenuGroup,
      onEnter,
      onEntered,
      onExit,
      onExited,
      onChange,
      onClean,
      onCreate,
      onSearch,
      onSelect,
      onOpen,
      onClose,
      onBlur,
      onFocus,
      searchBy,
      placement = 'bottomStart',
      ...rest
    } = props;

    const { multi, tagProps, trigger, disabledOptions, onTagRemove, renderMenuItemCheckbox } =
      useContext(InputPickerContext);

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    const inputRef = useRef<any>();

    const { trigger: triggerRef, root, target, overlay, list } = usePickerRef(ref);
    const { locale } = useCustom<InputPickerLocale>(['Picker', 'InputPicker'], overrideLocale);

    const { prefix, merge } = useClassNames(classPrefix);
    const [uncontrolledData, setData] = useState(controlledData);
    const [maxWidth, setMaxWidth] = useState(100);
    const [newData, setNewData] = useState<InputItemDataType[]>([]);
    const [uncontrolledOpen, setOpen] = useState(defaultOpen);
    const open = isUndefined(controlledOpen) ? uncontrolledOpen : controlledOpen;

    const getAllData = useCallback(
      () => ([] as ItemDataType[]).concat(uncontrolledData, newData),
      [uncontrolledData, newData]
    );
    const getAllDataAndCache = useCallback(
      () => ([] as ItemDataType[]).concat(getAllData(), cacheData),
      [getAllData, cacheData]
    );

    const [value, setValue, isControlled] = useControlled<ValueType>(
      valueProp,
      multi ? defaultValue || [] : defaultValue
    );

    const cloneValue = () => (multi ? clone(value) || [] : value);

    const handleClose = useEventCallback(() => {
      triggerRef?.current?.close();

      // The focus is on the trigger button after closing
      target.current?.focus?.();
    });

    // Used to hover the focuse item  when trigger `onKeydown`
    const { focusItemValue, setFocusItemValue, onKeyDown } = useFocusItemValue(
      multi ? value?.[0] : value,
      {
        data: getAllDataAndCache(),
        valueKey,
        target: () => overlay.current
      }
    );

    const handleSearchCallback = useEventCallback(
      (searchKeyword: string, filteredData: InputItemDataType[], event: React.SyntheticEvent) => {
        // The first option after filtering is the focus.
        setFocusItemValue(
          disabledOptions ? searchKeyword : filteredData?.[0]?.[valueKey] || searchKeyword
        );
        onSearch?.(searchKeyword, event);
      }
    );

    // Use search keywords to filter options.
    const { searchKeyword, resetSearch, checkShouldDisplay, handleSearch } = useSearch(
      getAllData(),
      {
        labelKey,
        searchBy,
        callback: handleSearchCallback
      }
    );

    // Update the state when the data in props changes
    useEffect(() => {
      if (controlledData && !shallowEqual(controlledData, uncontrolledData)) {
        setData(controlledData);
        setNewData([]);
        setFocusItemValue(controlledData?.[0]?.[valueKey]);
      }
    }, [setFocusItemValue, controlledData, uncontrolledData, valueKey]);

    useEffect(() => {
      // In multiple selection, you need to set a maximum width for the input.
      if (triggerRef.current?.root) {
        setMaxWidth(getWidth(triggerRef.current.root));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update the position of the menu when the search keyword and value change
    useEffect(() => {
      triggerRef.current?.updatePosition?.();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword, value]);

    const getDateItem = (value: any) => {
      // Find active `MenuItem` by `value`
      const allData = getAllDataAndCache();
      const activeItem = allData.find(item => shallowEqual(item[valueKey], value));

      let itemNode: React.ReactNode = placeholder;

      if (activeItem?.[labelKey]) {
        itemNode = activeItem?.[labelKey];
      }

      return {
        isValid: !!activeItem,
        activeItem,
        itemNode
      };
    };

    const getInput = () => (multi ? inputRef.current?.input : inputRef.current);

    const focusInput = () => getInput()?.focus();
    const blurInput = () => getInput()?.blur();

    /**
     * Convert the string of the newly created option into an object.
     */
    const createOption = (value: string) => {
      if (groupBy) {
        return {
          create: true,
          [groupBy]: locale?.newItem,
          [valueKey]: value,
          [labelKey]: value
        };
      }

      return {
        create: true,
        [valueKey]: value,
        [labelKey]: value
      };
    };

    const handleChange = useEventCallback((value: any, event: React.SyntheticEvent) => {
      onChange?.(value, event);
    });

    const handleRemoveItemByTag = useEventCallback((tag: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const val = cloneValue();
      remove(val, itemVal => shallowEqual(itemVal, tag));
      setValue(val);
      handleChange(val, event);
      onTagRemove?.(tag, event);
    });

    const handleSelect = useEventCallback(
      (value: string | string[], item: InputItemDataType, event: React.SyntheticEvent) => {
        onSelect?.(value, item, event);

        if (creatable && item.create) {
          delete item.create;
          onCreate?.(value, item, event);
          setNewData(newData.concat(item));
        }
      }
    );

    /**
     * Callback triggered by single selection
     * @param value
     * @param item
     * @param event
     */
    const handleSelectItem = useEventCallback(
      (value: string, item: InputItemDataType, event: React.MouseEvent) => {
        setValue(value);
        setFocusItemValue(value);
        resetSearch();
        handleSelect(value, item, event);
        handleChange(value, event);
        handleClose();
      }
    );

    /**
     * Callback triggered by multiple selection
     * @param nextItemValue
     * @param item
     * @param event
     * @param checked
     */
    const handleCheckTag = useEventCallback(
      (
        nextItemValue: string,
        item: InputItemDataType,
        event: React.MouseEvent,
        checked: boolean
      ) => {
        const val = cloneValue();
        if (checked) {
          val.push(nextItemValue);
        } else {
          remove(val, itemVal => shallowEqual(itemVal, nextItemValue));
        }

        setValue(val);
        resetSearch();
        setFocusItemValue(nextItemValue);
        handleSelect(val, item, event);
        handleChange(val, event);
        focusInput();
      }
    );

    const handleTagKeyPress = useEventCallback((event: React.KeyboardEvent) => {
      // When composing, ignore the keypress event.
      if (event.nativeEvent.isComposing) {
        return;
      }
      const val = cloneValue();
      const data = getAllData();

      if (!focusItemValue || !data) {
        return;
      }

      // If the value is disabled in this option, it is returned.
      if (disabledItemValues?.some(item => item === focusItemValue)) {
        return;
      }

      if (!val.some(v => shallowEqual(v, focusItemValue))) {
        val.push(focusItemValue);
      } else if (!disabledOptions) {
        remove(val, itemVal => shallowEqual(itemVal, focusItemValue));
      }

      let focusItem = data.find(item => shallowEqual(item?.[valueKey], focusItemValue));

      if (!focusItem) {
        focusItem = createOption(focusItemValue);
      }

      setValue(val);
      resetSearch();
      handleSelect(val, focusItem, event);
      handleChange(val, event);
    });

    const handleMenuItemKeyPress = useEventCallback((event: React.KeyboardEvent) => {
      if (!focusItemValue || !controlledData) {
        return;
      }

      // If the value is disabled in this option, it is returned.
      if (disabledItemValues?.some(item => item === focusItemValue)) {
        return;
      }

      // Find active `MenuItem` by `value`
      const allData = getAllData();
      let focusItem = allData.find(item => shallowEqual(item[valueKey], focusItemValue));

      // FIXME Bad state flow
      if (!focusItem && focusItemValue === searchKeyword) {
        focusItem = createOption(searchKeyword);
      }
      setValue(focusItemValue);
      resetSearch();

      if (focusItem) {
        handleSelect(focusItemValue, focusItem, event);
      }
      handleChange(focusItemValue, event);
      handleClose();
    });

    /**
     * Remove the last item, after pressing the back key on the keyboard.
     * @param event
     */
    const removeLastItem = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      const target = event?.target as HTMLInputElement;
      if (target?.tagName !== 'INPUT') {
        focusInput();
        return;
      }
      if (target?.tagName === 'INPUT' && target?.value) {
        return;
      }
      const val = cloneValue();
      val.pop();
      setValue(val);
      handleChange(val, event);
    });

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || searchKeyword !== '') {
        return;
      }
      setValue(null);
      setFocusItemValue(null);
      resetSearch();
      if (multi) {
        handleChange([], event);
      } else {
        handleChange(null, event);
      }
      onClean?.(event);
    });

    const events = {
      onMenuPressBackspace: multi ? removeLastItem : handleClean,
      onMenuKeyDown: onKeyDown,
      onMenuPressEnter: undefined as React.ReactEventHandler | undefined,
      onKeyDown: undefined as React.ReactEventHandler | undefined
    };

    const handleKeyPress = useEventCallback((event: React.KeyboardEvent<any>) => {
      // When typing a space, create a tag.
      if (isOneOf('Space', trigger) && event.key === KEY_VALUES.SPACE) {
        handleTagKeyPress(event);
        event.preventDefault();
      }

      // When typing a comma, create a tag.
      if (isOneOf('Comma', trigger) && event.key === KEY_VALUES.COMMA) {
        handleTagKeyPress(event);
        event.preventDefault();
      }
    });

    if (multi) {
      if (isOneOf('Enter', trigger)) {
        events.onMenuPressEnter = handleTagKeyPress;
      }

      if (creatable) {
        events.onKeyDown = handleKeyPress;
      }
    } else {
      events.onMenuPressEnter = handleMenuItemKeyPress;
    }

    const onPickerKeyDown = useToggleKeyDownEvent({
      trigger: triggerRef,
      target,
      overlay,
      ...events,
      ...rest
    });

    const handleExited = useEventCallback(() => {
      setFocusItemValue(multi ? value?.[0] : value);
      resetSearch();
      onClose?.();
    });

    const handleFocus = useEventCallback(() => {
      if (!readOnly) {
        setOpen(true);
        triggerRef.current?.open();
      }
    });

    const handleEnter = useEventCallback(() => {
      focusInput();
      setOpen(true);
    });

    const handleExit = useEventCallback(() => {
      blurInput();
      setOpen(false);
    });

    const renderDropdownMenuItem = (label: React.ReactNode, item: InputItemDataType) => {
      // 'Create option "{0}"' =>  Create option "xxxxx"
      const newLabel = item.create ? (
        <span>{tplTransform(locale.createOption, label)}</span>
      ) : (
        label
      );
      return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
    };

    const checkValue = () => {
      if (multi) {
        return { isValid: false, itemNode: null };
      }

      const dataItem = getDateItem(value);
      let itemNode = dataItem.itemNode;

      if (!isNil(value) && isFunction(renderValue)) {
        itemNode = renderValue(
          value,
          dataItem.activeItem as ItemDataType<string | number>,
          itemNode
        );
      }

      return { isValid: dataItem.isValid, itemNode };
    };

    const renderMultiValue = () => {
      if (!multi) {
        return null;
      }

      const { closable = true, onClose, ...tagRest } = tagProps;
      const tags = value || [];
      const items: (ItemDataType | undefined)[] = [];

      const tagElements = tags
        .map(tag => {
          const { isValid, itemNode, activeItem } = getDateItem(tag);
          items.push(activeItem);

          if (!isValid) {
            return null;
          }

          return (
            <Tag
              {...tagRest}
              key={tag}
              size={rest.size === 'lg' ? 'lg' : rest.size === 'xs' ? 'sm' : 'md'}
              closable={!disabled && closable && !readOnly && !plaintext}
              title={typeof itemNode === 'string' ? itemNode : undefined}
              onClose={createChainedFunction(handleRemoveItemByTag.bind(null, tag), onClose)}
            >
              {itemNode}
            </Tag>
          );
        })
        .filter(item => item !== null);

      if ((tags.length > 0 || isControlled) && isFunction(renderValue)) {
        return renderValue(value, items, tagElements);
      }

      return tagElements;
    };

    const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const menuClassPrefix = multi ? 'picker-check-menu' : 'picker-select-menu';
      const classes = merge(className, menuClassName, prefix(multi ? 'check-menu' : 'select-menu'));
      const styles = { ...menuStyle, left, top };

      let items: ItemDataType[] = filterNodesOfTree(getAllData(), checkShouldDisplay);

      if (
        creatable &&
        (typeof shouldDisplayCreateOption === 'function'
          ? shouldDisplayCreateOption(searchKeyword, items)
          : searchKeyword && !items.find(item => item[valueKey] === searchKeyword))
      ) {
        items = [...items, createOption(searchKeyword)];
      }

      // Create a tree structure data when set `groupBy`
      if (groupBy) {
        items = getDataGroupBy(items, groupBy, sort);
      } else if (typeof sort === 'function') {
        items = items.sort(sort(false));
      }

      if (disabledOptions) {
        return <PickerOverlay ref={mergeRefs(overlay, speakerRef)} />;
      }

      const menu = items.length ? (
        <DropdownMenu
          listProps={listProps}
          listRef={list}
          disabledItemValues={disabledItemValues}
          valueKey={valueKey}
          labelKey={labelKey}
          classPrefix={menuClassPrefix}
          dropdownMenuItemClassPrefix={multi ? undefined : `${menuClassPrefix}-item`}
          dropdownMenuItemAs={multi ? DropdownMenuCheckItem : DropdownMenuItem}
          dropdownMenuItemProps={{ renderMenuItemCheckbox }}
          activeItemValues={multi ? value : [value]}
          focusItemValue={focusItemValue}
          maxHeight={menuMaxHeight}
          data={items}
          // FIXME-Doma
          // `group` is redundant so long as `groupBy` exists
          group={!isUndefined(groupBy)}
          groupBy={groupBy}
          onSelect={multi ? handleCheckTag : (handleSelectItem as any)} // fixme don't use any
          renderMenuGroup={renderMenuGroup}
          renderMenuItem={renderDropdownMenuItem}
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
          target={triggerRef}
          onKeyDown={onPickerKeyDown}
        >
          {renderMenu ? renderMenu(menu) : menu}
          {renderExtraFooter?.()}
        </PickerOverlay>
      );
    };

    const { isValid, itemNode } = checkValue();
    const tagElements = renderMultiValue();

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     * 3.If renderValue returns null or undefined, hasValue is false.
     */
    const hasSingleValue = !isNil(value) && isFunction(renderValue) && !isNil(itemNode);
    const hasMultiValue =
      isArray(value) && value.length > 0 && isFunction(renderValue) && !isNil(tagElements);
    const hasValue = multi ? !!tagElements?.length || hasMultiValue : isValid || hasSingleValue;

    const [pickerClasses, usedClassNamePropKeys] = usePickerClassName({
      ...props,
      classPrefix,
      appearance,
      hasValue,
      name: 'input',
      cleanable
    });

    const classes = merge(pickerClasses, {
      [prefix`tag`]: multi,
      [prefix`focused`]: open,
      [prefix`disabled-options`]: disabledOptions
    });
    const searching = !!searchKeyword && open;
    const displaySearchInput = searchable && !disabled && !rest.loading;

    const inputProps = multi
      ? { inputStyle: { maxWidth: maxWidth - 63 }, as: InputAutosize }
      : { as: 'input' };

    if (plaintext) {
      const plaintextProps: React.DetailsHTMLAttributes<HTMLDivElement> = {};

      // TagPicker has -6px margin-left on the plaintext wrapper
      // for fixing margin-left on tags from 2nd line on
      if (multi && hasValue) {
        plaintextProps.style = {
          marginLeft: -6
        };
      }

      return (
        <Plaintext localeKey="notSelected" ref={target} {...plaintextProps}>
          {itemNode || (tagElements?.length ? tagElements : null) || placeholder}
        </Plaintext>
      );
    }

    const placeholderNode = placeholder || (disabledOptions ? null : locale?.placeholder);

    return (
      <PickerToggleTrigger
        id={id}
        multiple={multi}
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        trigger="active"
        onEnter={createChainedFunction(handleEnter, onEnter)}
        onEntered={createChainedFunction(onEntered, onOpen)}
        onExit={createChainedFunction(handleExit, onExit)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
        placement={placement}
      >
        <Component
          className={classes}
          style={style}
          onClick={focusInput}
          onKeyDown={onPickerKeyDown}
          ref={root}
        >
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            appearance={appearance}
            readOnly={readOnly}
            plaintext={plaintext}
            ref={target}
            as={toggleAs}
            tabIndex={tabIndex}
            onClean={handleClean}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={open}
            disabled={disabled}
            placement={placement}
            inputValue={value}
            caret={!disabledOptions}
          >
            {searching || (multi && hasValue) ? null : itemNode || placeholderNode}
          </PickerToggle>
          {/* TODO Separate InputPicker and TagPicker implementation */}
          {!(!multi && disabled) && (
            <div className={prefix`tag-wrapper`}>
              {tagElements}
              {displaySearchInput && (
                <InputSearch
                  {...inputProps}
                  tabIndex={-1}
                  readOnly={readOnly}
                  onBlur={onBlur}
                  onFocus={createChainedFunction(handleFocus, onFocus)}
                  inputRef={inputRef}
                  onChange={handleSearch}
                  value={open ? searchKeyword : ''}
                />
              )}
            </div>
          )}
        </Component>
      </PickerToggleTrigger>
    );
  }
);

InputPicker.displayName = 'InputPicker';
InputPicker.propTypes = {
  ...listPickerPropTypes,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  cacheData: PropTypes.array,
  menuAutoWidth: PropTypes.bool,
  menuMaxHeight: PropTypes.number,
  searchable: PropTypes.bool,
  creatable: PropTypes.bool,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onCreate: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func
};

export default InputPicker;
