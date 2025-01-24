import React, { useCallback } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import TreeView from '../MultiCascadeTree/TreeView';
import SearchView from '../MultiCascadeTree/SearchView';
import useActive from '../Cascader/useActive';
import { findNodeOfTree } from '@/internals/Tree/utils';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { getColumnsAndPaths } from '../CascadeTree/utils';
import { forwardRef, createChainedFunction, mergeRefs } from '@/internals/utils';
import { useCascadeValue, useSearch, useSelect } from '../MultiCascadeTree/hooks';
import { useCustom } from '../CustomProvider';
import {
  PickerToggle,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  usePickerClassName,
  usePickerRef,
  useToggleKeyDownEvent,
  useFocusItemValue,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import type { FormControlPickerProps, ItemDataType, DataItemValue } from '@/internals/types';
import type { PickerLocale } from '../locales';
import type { MultiCascadeTreeProps } from '../MultiCascadeTree';

export interface MultiCascaderProps<T extends DataItemValue = any>
  extends FormControlPickerProps<T[], PickerLocale, ItemDataType<T>, T>,
    MultiCascadeTreeProps<T, T[], PickerLocale>,
    Pick<PickerToggleProps, 'loading'> {
  /**
   * A picker that can be counted
   */
  countable?: boolean;

  /**
   * Sets the width of the menu.
   *
   * @deprecated Use columnWidth instead
   */
  menuWidth?: number;

  /**
   * Sets the height of the menu
   * @deprecated Use columnHeight instead
   */
  menuHeight?: number;

  /**
   * Custom menu class name
   * @deprecated Use popupClassName instead
   */
  menuClassName?: string;

  /**
   * Custom menu style
   * @deprecated Use popupStyle instead
   */
  menuStyle?: React.CSSProperties;

  /**
   * Custom popup style
   */
  popupStyle?: React.CSSProperties;

  /**
   * Custom popup style
   */
  popupClassName?: string;

  /**
   * The panel is displayed directly when the component is initialized
   * @deprecated Use MultiCascadeTree instead
   * @see MultiCascadeTree https://rsuitejs.com/components/multi-cascade-tree
   */
  inline?: boolean;

  /**
   * Custom render menu
   * @deprecated Use renderColumn instead
   */
  renderMenu?: (
    items: readonly ItemDataType<T>[],
    menu: React.ReactNode,
    parentNode?: any,
    layer?: number
  ) => React.ReactNode;

  /**
   * Custom render menu item
   * @deprecated Use renderTreeNode instead
   */
  renderMenuItem?: (node: React.ReactNode, item: ItemDataType<T>) => React.ReactNode;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: T[],
    selectedItems: ItemDataType<T>[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * Called when clean
   */
  onClean?: (event: React.SyntheticEvent) => void;
}

const emptyArray = [];

/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
const MultiCascader = forwardRef<'div', MultiCascaderProps<DataItemValue>>(
  <T extends DataItemValue>(props: MultiCascaderProps<T>, ref) => {
    const { propsWithDefaults, rtl } = useCustom('MultiCascader', props);
    const {
      as: Component = 'div',
      appearance = 'default',
      classPrefix = 'picker',
      defaultValue,
      columnHeight,
      columnWidth,
      childrenKey = 'children',
      cleanable = true,
      data = emptyArray,
      disabled,
      disabledItemValues = emptyArray,
      value: valueProp,
      valueKey = 'value',
      labelKey = 'label',
      locale,
      toggleAs,
      style,
      countable = true,
      cascade = true,
      placeholder,
      placement = 'bottomStart',
      popupClassName,
      popupStyle,
      searchable = true,
      uncheckableItemValues = emptyArray,
      id,
      getChildren,
      renderValue,
      renderExtraFooter,
      renderColumn,
      renderTreeNode,
      onEntered,
      onExited,
      onClean,
      onSearch,
      onSelect,
      onChange,
      onCheck,
      menuClassName: DEPRECATED_menuClassName,
      menuStyle: DEPRECATED_menuStyle,
      menuWidth: DEPRECATED_menuWidth,
      menuHeight: DEPRECATED_menuHeight,
      renderMenu: DEPRECATED_renderMenu,
      renderMenuItem: DEPRECATED_renderMenuItem,
      ...rest
    } = propsWithDefaults;

    const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
    const { prefix, merge } = useClassNames(classPrefix);

    const onSelectCallback = useCallback(
      (node: ItemDataType<T>, cascadePaths: ItemDataType<T>[], event: React.SyntheticEvent) => {
        onSelect?.(node, cascadePaths, event);
        trigger.current?.updatePosition?.();
      },
      [onSelect, trigger]
    );

    const {
      selectedPaths,
      flattenData,
      columnData,
      setColumnData,
      setSelectedPaths,
      handleSelect
    } = useSelect({
      data,
      childrenKey,
      labelKey,
      valueKey,
      onSelect: onSelectCallback,
      getChildren
    });

    const [controlledValue] = useControlled(valueProp, defaultValue);
    const itemKeys = { childrenKey, labelKey, valueKey };
    const cascadeValueProps = {
      ...itemKeys,
      uncheckableItemValues,
      cascade,
      value: controlledValue,
      onCheck,
      onChange
    };

    const { value, setValue, handleCheck } = useCascadeValue<T>(cascadeValueProps, flattenData);
    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];

    const onFocusItemCallback = useCallback(
      value => {
        const { columns, path } = getColumnsAndPaths(
          data,
          flattenData.find(item => item[valueKey] === value),
          { getParent: () => undefined, getChildren: item => item[childrenKey] }
        );

        setColumnData(columns);
        setSelectedPaths(path);
      },
      [childrenKey, data, flattenData, setColumnData, setSelectedPaths, valueKey]
    );

    // Used to hover the focuse item  when trigger `onKeydown`
    const {
      focusItemValue,
      setLayer,
      setKeys,
      onKeyDown: onFocusItem
    } = useFocusItemValue(selectedPaths?.[selectedPaths.length - 1]?.[valueKey], {
      rtl,
      data: flattenData,
      valueKey,
      defaultLayer: selectedPaths?.length ? selectedPaths.length - 1 : 0,
      target: () => overlay.current,
      callback: onFocusItemCallback
    });

    const onSearchCallback = (value: string, event: React.SyntheticEvent) => {
      if (value) {
        setLayer(0);
      } else if (selectedPaths?.length) {
        setLayer(selectedPaths.length - 1);
      }
      setKeys([]);

      onSearch?.(value, event);
    };

    const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
      labelKey,
      valueKey,
      childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues,
      onSearch: onSearchCallback
    });

    const { active, handleEntered, handleExited } = useActive({
      onEntered,
      onExited,
      target,
      setSearchKeyword
    });

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || !target.current) {
        return;
      }

      setSelectedPaths([]);
      setValue([]);
      setColumnData([data]);
      onChange?.([], event);
    });

    const handleMenuPressEnter = useEventCallback((event: React.SyntheticEvent) => {
      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const checkbox = overlay.current?.querySelector(
        `[data-key="${focusItemValue}"] [type="checkbox"]`
      );

      if (checkbox) {
        handleCheck(focusItem, event, checkbox?.getAttribute('aria-checked') !== 'true');
      }
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

    const renderCascadeColumn = (
      childNodes: React.ReactNode,
      column: {
        items: readonly ItemDataType<T>[];
        parentItem?: ItemDataType<T>;
        layer?: number;
      }
    ) => {
      const { items, parentItem, layer } = column;

      if (typeof renderColumn === 'function') {
        return renderColumn(childNodes, column);
      } else if (typeof DEPRECATED_renderMenu === 'function') {
        return DEPRECATED_renderMenu(items, childNodes, parentItem, layer);
      }
      return childNodes;
    };

    const renderCascadeTreeNode = (node: React.ReactNode, itemData: ItemDataType<T>) => {
      const render =
        typeof renderTreeNode === 'function' ? renderTreeNode : DEPRECATED_renderMenuItem;

      if (typeof render === 'function') {
        return render(node, itemData);
      }
      return node;
    };

    const renderTreeView = (positionProps?: PositionChildProps, speakerRef?) => {
      const { left, top, className } = positionProps || {};
      const styles = { ...DEPRECATED_menuStyle, ...popupStyle, left, top };

      const classes = merge(
        className,
        DEPRECATED_menuClassName,
        popupClassName,
        prefix('popup-multi-cascader')
      );

      return (
        <PickerPopup
          ref={mergeRefs(overlay, speakerRef)}
          className={classes}
          style={styles}
          target={trigger}
          onKeyDown={onPickerKeyDown}
        >
          {searchable && (
            <SearchView
              locale={locale}
              cascade={cascade}
              data={items}
              value={value}
              searchKeyword={searchKeyword}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              disabledItemValues={disabledItemValues}
              inputRef={searchInput}
              onCheck={handleCheck}
              onSearch={handleSearch}
            />
          )}

          {!searchKeyword && (
            <TreeView
              cascade={cascade}
              columnWidth={columnWidth ?? DEPRECATED_menuWidth}
              columnHeight={columnHeight ?? DEPRECATED_menuHeight}
              classPrefix="cascade-tree"
              uncheckableItemValues={uncheckableItemValues}
              disabledItemValues={disabledItemValues}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              cascadeData={columnData}
              cascadePaths={selectedPaths}
              value={value}
              onSelect={handleSelect}
              onCheck={handleCheck}
              renderColumn={renderCascadeColumn}
              renderTreeNode={renderCascadeTreeNode}
            />
          )}

          {renderExtraFooter?.()}
        </PickerPopup>
      );
    };

    let selectedElement: React.ReactNode = placeholder;

    if (selectedItems.length > 0) {
      selectedElement = (
        <SelectedElement
          selectedItems={selectedItems}
          countable={countable}
          valueKey={valueKey}
          labelKey={labelKey}
          childrenKey={childrenKey}
          prefix={prefix}
          cascade={cascade}
          locale={locale}
        />
      );
    }

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue =
      selectedItems.length > 0 || (Number(valueProp?.length) > 0 && isFunction(renderValue));

    if (hasValue && isFunction(renderValue)) {
      selectedElement = renderValue(
        value.length ? value : (valueProp ?? []),
        selectedItems,
        selectedElement
      );
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const [classes, usedClassNamePropKeys] = usePickerClassName({
      ...props,
      classPrefix,
      hasValue,
      countable,
      name: 'cascader',
      appearance,
      cleanable
    });

    return (
      <PickerToggleTrigger
        id={id}
        popupType="tree"
        multiple
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={trigger}
        placement={placement}
        onEnter={handleEntered}
        onExited={handleExited}
        speaker={renderTreeView}
      >
        <Component className={classes} style={style} ref={root}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            as={toggleAs}
            appearance={appearance}
            disabled={disabled}
            ref={target}
            onClean={createChainedFunction(handleClean, onClean)}
            onKeyDown={onPickerKeyDown}
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
);

MultiCascader.displayName = 'MultiCascader';

export default MultiCascader;
