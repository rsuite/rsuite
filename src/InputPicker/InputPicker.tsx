import React, { useState, useRef, useImperativeHandle, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import remove from 'lodash/remove';
import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { getWidth } from 'dom-lib';
import shallowEqual from '../utils/shallowEqual';
import { findNodeOfTree, filterNodesOfTree } from '../utils/treeUtils';
import {
  createChainedFunction,
  tplTransform,
  getDataGroupBy,
  useClassNames,
  useCustom,
  useControlled
} from '../utils';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckItem,
  onMenuKeyDown,
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger,
  useFocusItemValue,
  usePickerClassName,
  useSearch
} from '../Picker';
import { PickerComponent, PickerLocaleType } from '../Picker/types';
import { pickerToggleTriggerProps } from '../Picker/PickerToggleTrigger';
import Tag, { TagProps } from '../Tag';
import { ItemDataType, FormControlPickerProps } from '../@types/common';
import { listPickerPropTypes } from '../Picker/propTypes';
import { SelectProps } from '../SelectPicker';
import InputAutosize from './InputAutosize';
import InputSearch from './InputSearch';

interface InputItemDataType extends ItemDataType {
  create?: boolean;
}

export interface InputPickerLocaleType extends PickerLocaleType {
  newItem?: string;
  createOption?: string;
}

export type ValueType = any;
export interface InputPickerProps<T = ValueType>
  extends FormControlPickerProps<T, InputPickerLocaleType, InputItemDataType>,
    SelectProps<T> {
  multi?: boolean;

  /** Settings can create new options */
  creatable?: boolean;

  /**  Tag related props. */
  tagProps?: TagProps;

  /** Option to cache value when searching asynchronously */
  cacheData?: any[];

  /** The `onBlur` attribute for the `input` element. */
  onBlur?: React.FocusEventHandler;

  /** The `onFocus` attribute for the `input` element. */
  onFocus?: React.FocusEventHandler;
}

const defaultProps: Partial<InputPickerProps> = {
  as: 'div',
  appearance: 'default',
  cleanable: true,
  cacheData: [],
  classPrefix: 'picker',
  data: [],
  disabledItemValues: [],
  valueKey: 'value',
  labelKey: 'label',
  placement: 'bottomStart',
  searchable: true,
  virtualized: true,
  menuAutoWidth: true,
  menuMaxHeight: 320,
  tagProps: {}
};

const InputPicker: PickerComponent<InputPickerProps> = React.forwardRef(
  (props: InputPickerProps, ref) => {
    const {
      as: Component,
      cleanable,
      cacheData,
      classPrefix,
      data: controlledData,
      disabled,
      defaultValue,
      defaultOpen,
      disabledItemValues,
      locale: overrideLocale,
      toggleAs,
      style,
      searchable,
      multi,
      open: controlledOpen,
      placeholder,
      tagProps,
      groupBy,
      menuClassName,
      menuStyle,
      menuAutoWidth,
      menuMaxHeight,
      creatable,
      value: valueProp,
      valueKey,
      virtualized,
      labelKey,
      listProps,
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
      onSearch,
      onSelect,
      onOpen,
      onClose,
      onBlur,
      onFocus,
      searchBy,
      ...rest
    } = props;

    if (groupBy === valueKey || groupBy === labelKey) {
      throw Error('`groupBy` can not be equal to `valueKey` and `labelKey`');
    }

    const rootRef = useRef<HTMLDivElement>();
    const menuRef = useRef<HTMLDivElement>();
    const positionRef = useRef<any>();
    const toggleRef = useRef<HTMLButtonElement>();
    const triggerRef = useRef<any>();
    const inputRef = useRef<any>();
    const { locale } = useCustom<InputPickerLocaleType>(['Picker', 'InputPicker'], overrideLocale);

    const { prefix, merge } = useClassNames(classPrefix);
    const [uncontrolledData, setData] = useState(controlledData);
    const [maxWidth, setMaxWidth] = useState(100);
    const [newData, setNewData] = useState([]);
    const [uncontrolledOpen, setOpen] = useState(defaultOpen);
    const open = isUndefined(controlledOpen) ? uncontrolledOpen : controlledOpen;

    const getAllData = useCallback(() => [].concat(uncontrolledData, newData), [
      uncontrolledData,
      newData
    ]);
    const getAllDataAndCache = useCallback(() => [].concat(getAllData(), cacheData), [
      getAllData,
      cacheData
    ]);

    const [value, setValue] = useControlled<ValueType>(
      valueProp,
      multi ? defaultValue || [] : defaultValue
    );

    const cloneValue = useCallback(() => (multi ? clone(value) || [] : value), [multi, value]);

    const handleClose = useCallback(() => {
      triggerRef?.current?.hide?.();
    }, [triggerRef]);

    const handleOpen = useCallback(() => {
      triggerRef.current?.show?.();
    }, [triggerRef]);

    // Used to hover the focuse item  when trigger `onKeydown`
    const { focusItemValue, setFocusItemValue, onKeyDown } = useFocusItemValue(
      multi ? value?.[0] : value,
      {
        data: getAllDataAndCache(),
        valueKey,
        target: () => menuRef.current
      }
    );

    const handleSearchCallback = useCallback(
      (
        searchKeyword: string,
        filteredData: InputItemDataType[],
        event: React.SyntheticEvent<any>
      ) => {
        // The first option after filtering is the focus.
        setFocusItemValue(filteredData?.[0]?.[valueKey] || searchKeyword);
        onSearch?.(searchKeyword, event);
      },
      [setFocusItemValue, onSearch, valueKey]
    );

    // Use search keywords to filter options.
    const { searchKeyword, setSearchKeyword, checkShouldDisplay, handleSearch } = useSearch({
      labelKey,
      data: getAllData(),
      searchBy,
      callback: handleSearchCallback
    });

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
      setMaxWidth(getWidth(toggleRef.current));
    }, []);

    // Update the position of the menu when the search keyword and value change
    useEffect(() => {
      positionRef.current?.updatePosition?.(true);
    }, [searchKeyword, value]);

    const getDateItem = (value: any) => {
      // Find active `MenuItem` by `value`
      const activeItem = findNodeOfTree(getAllDataAndCache(), item =>
        shallowEqual(item[valueKey], value)
      );
      let displayElement: React.ReactNode = placeholder;

      if (activeItem?.[labelKey]) {
        displayElement = activeItem?.[labelKey];
      }

      return {
        isValid: !!activeItem,
        activeItem,
        displayElement
      };
    };

    const getInput = useCallback(() => (multi ? inputRef.current?.input : inputRef.current), [
      inputRef,
      multi
    ]);
    const focusInput = useCallback(() => getInput()?.focus(), [getInput]);
    const blurInput = useCallback(() => getInput()?.blur(), [getInput]);

    /**
     * Convert the string of the newly created option into an object.
     */
    const createOption = useCallback(
      (value: string) => {
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
      },
      [groupBy, valueKey, labelKey, locale]
    );

    const handleChange = useCallback(
      (value: any, event: React.SyntheticEvent<any>) => {
        onChange?.(value, event);
      },
      [onChange]
    );

    const handleRemoveItemByTag = useCallback(
      (tag: string, event: React.MouseEvent) => {
        event.stopPropagation();
        const val = cloneValue();
        remove(val, itemVal => shallowEqual(itemVal, tag));
        setValue(val);
        handleChange(val, event);
      },
      [setValue, cloneValue, handleChange]
    );

    const handleSelect = useCallback(
      (value: string, item: InputItemDataType, event: React.SyntheticEvent<any>) => {
        onSelect?.(value, item, event);

        if (creatable && item.create) {
          delete item.create;
          setNewData(newData.concat(item));
        }
      },
      [creatable, newData, onSelect]
    );

    const handleItemSelect = (value: string, item: InputItemDataType, event: React.MouseEvent) => {
      setValue(value);
      setFocusItemValue(value);
      setSearchKeyword('');
      handleSelect(value, item, event);
      handleChange(value, event);
      handleClose();
    };

    const handleCheckItemSelect = (
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
      setSearchKeyword('');
      setFocusItemValue(nextItemValue);
      handleSelect(val, item, event);
      handleChange(val, event);
      focusInput();
    };

    const selectFocusMenuCheckItem = useCallback(
      (event: React.KeyboardEvent) => {
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
        } else {
          remove(val, itemVal => shallowEqual(itemVal, focusItemValue));
        }

        let focusItem = data.find(item => shallowEqual(item?.[valueKey], focusItemValue));

        if (!focusItem) {
          focusItem = createOption(focusItemValue);
        }

        setValue(val);
        setSearchKeyword('');
        handleSelect(val, focusItem, event);
        handleChange(val, event);
      },
      [
        setValue,
        cloneValue,
        getAllData,
        handleChange,
        handleSelect,
        createOption,
        setSearchKeyword,
        disabledItemValues,
        focusItemValue,
        valueKey
      ]
    );

    const selectFocusMenuItem = useCallback(
      (event: React.KeyboardEvent) => {
        if (!focusItemValue || !controlledData) {
          return;
        }

        // If the value is disabled in this option, it is returned.
        if (disabledItemValues?.some(item => item === focusItemValue)) {
          return;
        }

        // Find active `MenuItem` by `value`
        let focusItem = findNodeOfTree(getAllData(), item =>
          shallowEqual(item[valueKey], focusItemValue)
        );

        if (!focusItem && focusItemValue === searchKeyword) {
          focusItem = createOption(searchKeyword);
        }
        setValue(focusItemValue);
        setSearchKeyword('');

        handleSelect(focusItemValue, focusItem, event);
        handleChange(focusItemValue, event);
        handleClose();
      },
      [
        setValue,
        disabledItemValues,
        controlledData,
        focusItemValue,
        valueKey,
        searchKeyword,
        handleClose,
        setSearchKeyword,
        createOption,
        getAllData,
        handleChange,
        handleSelect
      ]
    );

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

    /**
     * Remove the last item, after pressing the back key on the keyboard.
     * @param event
     */
    const removeLastItem = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      },
      [setValue, focusInput, handleChange, cloneValue]
    );

    const handleClean = useCallback(
      (event: React.SyntheticEvent<any>) => {
        if (disabled || searchKeyword !== '') {
          return;
        }
        setValue(null);
        setFocusItemValue(null);
        setSearchKeyword('');
        handleChange(null, event);
        onClean?.(event);
      },
      [
        disabled,
        searchKeyword,
        onClean,
        handleChange,
        setValue,
        setFocusItemValue,
        setSearchKeyword
      ]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (!menuRef.current) {
          return;
        }

        onKeyDown(event);
        onMenuKeyDown(event, {
          enter: multi ? selectFocusMenuCheckItem : selectFocusMenuItem,
          esc: handleClose,
          del: multi ? removeLastItem : handleClean
        });
      },
      [
        onKeyDown,
        handleClose,
        handleClean,
        removeLastItem,
        selectFocusMenuCheckItem,
        selectFocusMenuItem,
        multi,
        menuRef
      ]
    );

    const handleExited = useCallback(() => {
      setFocusItemValue(multi ? value?.[0] : value);

      if (multi) {
        // In the case of multiple selection, when the `searchKeyword` is too long,it will cause the content to wrap when in the `focus`.
        // The reason for clearing the `searchKeyword` is that the `Menu` is in the correct position when expanded.
        setSearchKeyword('');
      }

      onClose?.();
    }, [setFocusItemValue, setSearchKeyword, onClose, value, multi]);

    const handleEnter = useCallback(() => {
      focusInput();
      setOpen(true);
    }, [focusInput]);

    const handleExit = useCallback(() => {
      blurInput();
      setOpen(false);
    }, [blurInput]);

    const renderDropdownMenuItem = (label: React.ReactNode, item: InputItemDataType) => {
      // 'Create option "{0}"' =>  Create option "xxxxx"
      const newLabel = item.create ? (
        <span>{tplTransform(locale?.createOption, label)}</span>
      ) : (
        label
      );
      return renderMenuItem ? renderMenuItem(newLabel, item) : newLabel;
    };

    const renderSingleValue = () => {
      if (multi) {
        return { isValid: false, displayElement: placeholder };
      }
      const dataItem = getDateItem(value);
      let displayElement = dataItem.displayElement;

      if (!isNil(value) && isFunction(renderValue)) {
        displayElement = renderValue(value, dataItem.activeItem, displayElement);
      }

      return { isValid: dataItem.isValid, displayElement };
    };

    const renderMultiValue = () => {
      if (!multi) {
        return null;
      }

      const { closable = true, onClose, ...tagRest } = tagProps;
      const tags = value || [];
      const items = [];

      const tagElements = tags
        .map(tag => {
          const { isValid, displayElement, activeItem } = getDateItem(tag);
          items.push(activeItem);

          if (!isValid) {
            return null;
          }

          return (
            <Tag
              {...tagRest}
              key={tag}
              closable={!disabled && closable}
              title={typeof displayElement === 'string' ? displayElement : undefined}
              onClose={createChainedFunction(handleRemoveItemByTag.bind(null, tag), onClose)}
            >
              {displayElement}
            </Tag>
          );
        })
        .filter(item => item !== null);

      if (tags.length > 0 && isFunction(renderValue)) {
        return renderValue(value, items, tagElements);
      }

      return tagElements;
    };

    const renderDropdownMenu = () => {
      const menuClassPrefix = multi ? 'picker-check-menu' : 'picker-select-menu';
      const classes = merge(prefix(menuClassPrefix), menuClassName);

      let items = filterNodesOfTree(getAllData(), checkShouldDisplay);

      if (
        creatable &&
        searchKeyword &&
        !findNodeOfTree(items, item => item[valueKey] === searchKeyword)
      ) {
        items = [...items, createOption(searchKeyword)];
      }

      // Create a tree structure data when set `groupBy`
      if (groupBy) {
        items = getDataGroupBy(items, groupBy, sort);
      } else if (typeof sort === 'function') {
        items = items.sort(sort(false));
      }

      const menu = items.length ? (
        <DropdownMenu
          listProps={listProps}
          disabledItemValues={disabledItemValues}
          valueKey={valueKey}
          labelKey={labelKey}
          classPrefix={menuClassPrefix}
          dropdownMenuItemClassPrefix={multi ? undefined : `${menuClassPrefix}-item`}
          dropdownMenuItemAs={multi ? DropdownMenuCheckItem : DropdownMenuItem}
          activeItemValues={multi ? value : [value]}
          focusItemValue={focusItemValue}
          maxHeight={menuMaxHeight}
          data={items}
          group={!isUndefined(groupBy)}
          onSelect={multi ? handleCheckItemSelect : handleItemSelect}
          renderMenuGroup={renderMenuGroup}
          renderMenuItem={renderDropdownMenuItem}
          virtualized={virtualized}
        />
      ) : (
        <div className={prefix`none`}>{locale?.noResultsText}</div>
      );

      return (
        <MenuWrapper
          ref={menuRef}
          autoWidth={menuAutoWidth}
          className={classes}
          style={menuStyle}
          getToggleInstance={() => toggleRef.current}
          getPositionInstance={() => positionRef.current}
          onKeyDown={handleKeyDown}
        >
          {renderMenu ? renderMenu(menu) : menu}
          {renderExtraFooter?.()}
        </MenuWrapper>
      );
    };

    const { isValid, displayElement } = renderSingleValue();
    const tagElements = renderMultiValue();

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    const hasSingleValue = !isNil(value) && isFunction(renderValue);
    const hasMultiValue = isArray(value) && value.length > 0 && isFunction(renderValue);
    const hasValue = multi ? !!tagElements?.length || hasMultiValue : isValid || hasSingleValue;

    const [pickerClasses, usedClassNameProps] = usePickerClassName({
      ...props,
      hasValue,
      name: 'input'
    });

    const classes = merge(pickerClasses, {
      [prefix`tag`]: multi,
      [prefix`focused`]: open
    });
    const searching = !!searchKeyword && open;
    const displaySearchInput = searchable && !disabled;

    const inputProps = multi
      ? { inputStyle: { maxWidth: maxWidth - 63 }, as: InputAutosize }
      : { as: 'input' };

    return (
      <PickerToggleTrigger
        pickerProps={pick(props, pickerToggleTriggerProps)}
        ref={triggerRef}
        positionRef={positionRef}
        trigger="active"
        onEnter={createChainedFunction(handleEnter, onEnter)}
        onEntered={createChainedFunction(onEntered, onOpen)}
        onExit={createChainedFunction(handleExit, onExit)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu()}
      >
        <Component
          ref={rootRef}
          className={classes}
          style={style}
          onClick={focusInput}
          onKeyDown={handleKeyDown}
        >
          <PickerToggle
            {...omit(rest, [...pickerToggleTriggerProps, ...usedClassNameProps])}
            ref={toggleRef}
            as={toggleAs}
            tabIndex={null}
            onClean={handleClean}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
          >
            {searching || (multi && hasValue) ? null : displayElement || locale?.placeholder}
          </PickerToggle>
          <div className={prefix`tag-wrapper`}>
            {tagElements}
            {displaySearchInput && (
              <InputSearch
                {...inputProps}
                onBlur={onBlur}
                onFocus={onFocus}
                inputRef={inputRef}
                onChange={handleSearch}
                value={open ? searchKeyword : ''}
              />
            )}
          </div>
        </Component>
      </PickerToggleTrigger>
    );
  }
);

InputPicker.displayName = 'InputPicker';
InputPicker.defaultProps = defaultProps;
InputPicker.propTypes = {
  ...listPickerPropTypes,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  cacheData: PropTypes.array,
  menuAutoWidth: PropTypes.bool,
  menuMaxHeight: PropTypes.number,
  searchable: PropTypes.bool,
  creatable: PropTypes.bool,
  multi: PropTypes.bool,
  groupBy: PropTypes.any,
  sort: PropTypes.func,
  renderMenu: PropTypes.func,
  renderMenuItem: PropTypes.func,
  renderMenuGroup: PropTypes.func,
  onSelect: PropTypes.func,
  onGroupTitleClick: PropTypes.func,
  onSearch: PropTypes.func,
  virtualized: PropTypes.bool,
  searchBy: PropTypes.func,
  tagProps: PropTypes.object
};

export default InputPicker;
