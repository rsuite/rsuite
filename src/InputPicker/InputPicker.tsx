import React, { useEffect } from 'react';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';
import Tag from '../Tag';
import TextBox from './TextBox';
import Stack, { StackProps } from '../Stack';
import useInput from './hooks/useInput';
import useData, { InputOption } from './hooks/useData';
import Plaintext, { PlaintextProps } from '@/internals/Plaintext';
import { filterNodesOfTree } from '@/internals/Tree/utils';
import { useStyles, useControlled, useEventCallback } from '@/internals/hooks';
import { KEY_VALUES } from '@/internals/constants';
import { useTagContext } from './InputPickerContext';
import { convertSize } from './utils';
import { useCustom } from '../CustomProvider';
import {
  forwardRef,
  shallowEqual,
  getDataGroupBy,
  createChainedFunction,
  tplTransform,
  mergeRefs,
  isOneOf,
  mergeStyles
} from '@/internals/utils';
import {
  Listbox,
  ListItem,
  ListCheckItem,
  PickerToggle,
  PickerPopup,
  PickerToggleTrigger,
  useFocusItemValue,
  useSearch,
  usePickerRef,
  useToggleKeyDownEvent,
  triggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import { getPositionStyle } from '@/internals/Overlay/Position';
import type { Option, FormControlPickerProps } from '@/internals/types';
import type { InputPickerLocale } from '../locales';
import type { SelectProps } from '../SelectPicker';

export type ValueType = any;
export interface InputPickerProps<V = ValueType>
  extends FormControlPickerProps<V, InputPickerLocale, InputOption>,
    Omit<SelectProps<V>, 'renderValue'>,
    Pick<PickerToggleProps, 'caretAs' | 'loading' | 'label'> {
  tabIndex?: number;

  /** Settings can create new options */
  creatable?: boolean;

  /** Option to cache value when searching asynchronously */
  cacheData?: InputOption<V>[];

  /** The `onBlur` attribute for the `input` element. */
  onBlur?: React.FocusEventHandler;

  /** The `onFocus` attribute for the `input` element. */
  onFocus?: React.FocusEventHandler;

  /** Called when the option is created */
  onCreate?: (value: V, item: Option, event: React.SyntheticEvent) => void;

  /**
   * Customize whether to display "Create option" action with given textbox value
   *
   * By default, InputPicker hides "Create option" action when textbox value matches any filtered item's [valueKey] property
   *
   * @param searchKeyword Value of the textbox
   * @param filteredData The items filtered by the searchKeyword
   */
  shouldDisplayCreateOption?: (searchKeyword: string, filteredData: InputOption<V>[]) => boolean;

  renderValue?: (value: V, item: Option<V>, selectedElement: React.ReactNode) => React.ReactNode;
}

/**
 * Single item selector with text box input.
 *
 * @see https://rsuitejs.com/components/input-picker
 */
const InputPicker = forwardRef<'div', InputPickerProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('InputPicker', props);
  const {
    as,
    appearance = 'default',
    block,
    cleanable = true,
    cacheData = [],
    className,
    classPrefix = 'picker',
    caretAs,
    data: controlledData = [],
    disabled,
    readOnly,
    plaintext,
    defaultValue,
    defaultOpen = false,
    disabledItemValues = [],
    locale,
    toggleAs,
    style,
    size = 'md',
    searchable = true,
    open: controlledOpen,
    placeholder,
    placement = 'bottomStart',
    groupBy,
    popupClassName,
    popupStyle,
    popupAutoWidth = true,
    listboxMaxHeight = 320,
    creatable,
    shouldDisplayCreateOption,
    value: valueProp,
    valueKey = 'value',
    virtualized,
    labelKey = 'label',
    listProps,
    id,
    tabIndex,
    loading,
    label,
    sort,
    renderListbox,
    renderExtraFooter,
    renderValue,
    renderOption,
    renderOptionGroup,
    onEnter,
    onEntered,
    onExit,
    onExited,
    onChange,
    onClean,
    onCreate,
    onSearch,
    onSelect,
    onBlur,
    onFocus,
    searchBy,
    ...rest
  } = propsWithDefaults;

  const { multi, tagProps, trigger, disabledOptions, onTagRemove, renderCheckbox } =
    useTagContext();

  if (groupBy === valueKey || groupBy === labelKey) {
    throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
  }

  const { trigger: triggerRef, root, target, overlay, list } = usePickerRef(ref);
  const { prefix, merge } = useStyles(classPrefix);
  const [open, setOpen] = useControlled(controlledOpen, defaultOpen);
  const { inputRef, inputProps, focus, blur } = useInput({ multi, triggerRef });

  const handleDataChange = (data: Option[]) => {
    setFocusItemValue(data?.[0]?.[valueKey]);
  };

  const { data, dataWithCache, newData, setNewData } = useData({
    controlledData,
    cacheData,
    onChange: handleDataChange
  });

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

  const focusItemValueOptions = { data: dataWithCache, valueKey, target: () => overlay.current };

  // Used to hover the focuse item  when trigger `onKeydown`
  const { focusItemValue, setFocusItemValue, onKeyDown } = useFocusItemValue(
    multi ? value?.[0] : value,
    focusItemValueOptions
  );

  const onSearchCallback = useEventCallback(
    (searchKeyword: string, filteredData: InputOption[], event: React.SyntheticEvent) => {
      if (!disabledOptions) {
        // The first option after filtering is the focus.
        let firstItemValue = filteredData?.[0]?.[valueKey];

        // If there is no value in the option and new options are supported, the search keyword is the first option
        if (!firstItemValue && creatable) {
          firstItemValue = searchKeyword;
        }

        setFocusItemValue(firstItemValue);
      }

      onSearch?.(searchKeyword, event);
    }
  );

  const searchOptions = { labelKey, searchBy, callback: onSearchCallback };

  // Use search keywords to filter options.
  const { searchKeyword, resetSearch, checkShouldDisplay, handleSearch } = useSearch(
    data,
    searchOptions
  );

  // Update the position of the menu when the search keyword and value change
  useEffect(() => {
    triggerRef.current?.updatePosition?.();
  }, [searchKeyword, value]);

  const getDataItem = (value: any) => {
    // Find active `MenuItem` by `value`
    const activeItem = dataWithCache.find(item => shallowEqual(item[valueKey], value));

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

  /**
   * Convert the string of the newly created option into an object.
   */
  const createOption = (value: string) => {
    const option = {
      create: true,
      [valueKey]: value,
      [labelKey]: value
    };

    if (groupBy) {
      return {
        [groupBy]: locale?.newItem,
        ...option
      };
    }

    return option;
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
    (value: string | string[], item: InputOption, event: React.SyntheticEvent) => {
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
    (value: string, item: InputOption, event: React.MouseEvent) => {
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
    (nextItemValue: string, item: InputOption, event: React.MouseEvent, checked: boolean) => {
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
      focus();
    }
  );

  const handleTagKeyPress = useEventCallback((event: React.KeyboardEvent) => {
    // When composing, ignore the keypress event.
    if (event.nativeEvent.isComposing) {
      return;
    }
    const val = cloneValue();
    let newItemValue = focusItemValue || '';

    // In TagInput
    if (multi && disabledOptions) {
      newItemValue = searchKeyword;
    }

    if (!newItemValue || !data) {
      return;
    }

    // If the value is disabled in this option, it is returned.
    if (disabledItemValues?.some(item => item === newItemValue)) {
      return;
    }

    if (!val.some(v => shallowEqual(v, newItemValue))) {
      val.push(newItemValue);
    } else if (!disabledOptions) {
      remove(val, itemVal => shallowEqual(itemVal, newItemValue));
    }

    let focusItem = data.find(item => shallowEqual(item?.[valueKey], newItemValue));

    if (!focusItem) {
      focusItem = createOption(newItemValue);
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
    let focusItem = data.find(item => shallowEqual(item[valueKey], focusItemValue));

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
      focus();
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
    if (disabled) {
      return;
    }

    // When there is a value in the search box and the user presses the delete key on the keyboard,
    // do not trigger clearing
    if (inputRef.current === event.target && searchKeyword !== '') {
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
    loading,
    ...events,
    ...rest
  });

  const handleExited = useEventCallback(() => {
    setFocusItemValue(multi ? value?.[0] : value);
    resetSearch();
  });

  const handleFocus = useEventCallback((event: React.FocusEvent) => {
    if (!readOnly) {
      setOpen(true);
      triggerRef.current?.open();
    }
    onFocus?.(event);
  });

  const handleEnter = useEventCallback(() => {
    focus();
    setOpen(true);
  });

  const handleExit = useEventCallback(() => {
    blur();
    setOpen(false);
  });

  const renderListItem = (label: React.ReactNode, item: InputOption) => {
    // 'Create option "{0}"' =>  Create option "xxxxx"
    const newLabel = item.create ? (
      <span>{tplTransform(locale?.createOption || '', label)}</span>
    ) : (
      label
    );
    return renderOption ? renderOption(newLabel, item) : newLabel;
  };

  const checkValue = () => {
    if (multi) {
      return { isValid: false, itemNode: null };
    }

    const dataItem = getDataItem(value);
    let itemNode = dataItem.itemNode;

    if (!isNil(value) && isFunction(renderValue)) {
      itemNode = renderValue(value, dataItem.activeItem as Option<string | number>, itemNode);
    }

    return { isValid: dataItem.isValid, itemNode };
  };

  const renderMultiValue = () => {
    if (!multi) {
      return null;
    }

    const { closable = true, onClose, ...tagRest } = tagProps;
    const tags = value || [];
    const items: (Option | undefined)[] = [];

    const tagElements = tags
      .map(tag => {
        const { isValid, itemNode, activeItem } = getDataItem(tag);
        items.push(activeItem);

        if (!isValid) {
          return null;
        }

        return (
          <Tag
            role="option"
            {...tagRest}
            key={tag}
            size={convertSize(size)}
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

  const renderPopup = (positionProps: PositionChildProps, speakerRef) => {
    const { className, left, top } = positionProps;
    const menuClassPrefix = multi ? 'picker-check-menu' : 'picker-select-menu';
    const classes = merge(className, popupClassName, prefix(multi ? 'check-menu' : 'select-menu'));
    const mergedPopupStyle = mergeStyles(getPositionStyle(left, top), popupStyle);

    let items: Option[] = filterNodesOfTree(data, checkShouldDisplay);

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
      return <PickerPopup ref={mergeRefs(overlay, speakerRef)} />;
    }

    const listbox = items.length ? (
      <Listbox
        listProps={listProps}
        listRef={list}
        disabledItemValues={disabledItemValues}
        valueKey={valueKey}
        labelKey={labelKey}
        classPrefix={menuClassPrefix}
        listItemClassPrefix={multi ? undefined : `${menuClassPrefix}-item`}
        listItemAs={multi ? ListCheckItem : ListItem}
        listItemProps={{ renderCheckbox }}
        activeItemValues={multi ? value : [value]}
        focusItemValue={focusItemValue}
        maxHeight={listboxMaxHeight}
        data={items}
        query={searchKeyword}
        groupBy={groupBy}
        onSelect={multi ? handleCheckTag : handleSelectItem}
        renderOptionGroup={renderOptionGroup}
        renderOption={renderListItem}
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
        style={mergedPopupStyle}
        target={triggerRef}
        onKeyDown={onPickerKeyDown}
      >
        {renderListbox ? renderListbox(listbox) : listbox}
        {renderExtraFooter?.()}
      </PickerPopup>
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

  const classes = merge(className, {
    [prefix`focused`]: open
  });

  const searching = !!searchKeyword && open;
  const editable = searchable && !disabled && !loading;

  if (plaintext) {
    const plaintextProps: PlaintextProps & StackProps = {};

    // When multiple selection, the tag is displayed in a stack layout.
    if (multi && hasValue) {
      plaintextProps.as = Stack;
      plaintextProps.spacing = 6;
      plaintextProps.wrap = true;
    }

    return (
      <Plaintext localeKey="notSelected" ref={target} {...plaintextProps}>
        {itemNode || (tagElements?.length ? tagElements : null) || placeholder}
      </Plaintext>
    );
  }

  const placeholderNode = placeholder || (disabledOptions ? null : locale?.placeholder);
  const triggerProps = {
    ...pick(props, triggerPropKeys),
    onEnter: createChainedFunction(handleEnter, onEnter),
    onEntered: onEntered,
    onExit: createChainedFunction(handleExit, onExit),
    onExited: createChainedFunction(handleExited, onExited)
  };

  return (
    <PickerToggleTrigger
      id={id}
      multiple={multi}
      name={multi ? 'tag' : 'input'}
      block={block}
      disabled={disabled}
      appearance={appearance}
      as={as}
      triggerProps={triggerProps}
      ref={triggerRef}
      trigger="active"
      speaker={renderPopup}
      placement={placement}
      rootRef={root}
      style={style}
      size={size}
      classPrefix={classPrefix}
      className={classes}
      responsive={false}
      onClick={focus}
      onKeyDown={onPickerKeyDown}
      data-disabled-options={disabledOptions}
      {...rest}
    >
      <PickerToggle
        loading={loading}
        label={label}
        appearance={appearance}
        readOnly={readOnly}
        plaintext={plaintext}
        ref={target}
        as={toggleAs}
        caretAs={caretAs}
        tabIndex={tabIndex}
        onClean={handleClean}
        cleanable={cleanable && !disabled}
        hasValue={hasValue}
        active={open}
        disabled={disabled}
        placement={placement}
        inputValue={value}
        focusItemValue={focusItemValue}
        caret={!disabledOptions}
        size={size}
      >
        {searching || (multi && hasValue) ? null : itemNode || placeholderNode}
      </PickerToggle>
      <TextBox
        showTagList={multi}
        inputRef={inputRef}
        inputValue={open ? searchKeyword : ''}
        inputProps={inputProps}
        tags={tagElements}
        editable={editable}
        readOnly={readOnly}
        disabled={disabled}
        multiple={multi}
        onBlur={onBlur}
        onFocus={handleFocus}
        onChange={handleSearch}
      />
    </PickerToggleTrigger>
  );
});

InputPicker.displayName = 'InputPicker';

export default InputPicker;
