import React, { useCallback } from 'react';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import TreeView from '../MultiCascadeTree/TreeView';
import SearchView from '../MultiCascadeTree/SearchView';
import useActive from '../Cascader/useActive';
import { findNodeOfTree } from '@/internals/Tree/utils';
import { useStyles, useControlled, useEventCallback } from '@/internals/hooks';
import { getColumnsAndPaths } from '../CascadeTree/utils';
import { forwardRef, createChainedFunction, mergeRefs } from '@/internals/utils';
import { useCascadeValue, useSearch, useSelect } from '../MultiCascadeTree/hooks';
import { useCustom } from '../CustomProvider';
import {
  PickerToggle,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  usePickerRef,
  useToggleKeyDownEvent,
  useFocusItemValue,
  triggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import type {
  FormControlPickerProps,
  Option,
  OptionValue,
  DeprecatedMenuProps
} from '@/internals/types';
import type { PickerLocale } from '../locales';
import type { MultiCascadeTreeProps } from '../MultiCascadeTree';

interface DeprecatedProps extends DeprecatedMenuProps {
  /**
   * The panel is displayed directly when the component is initialized
   * @deprecated Use MultiCascadeTree instead
   * @see MultiCascadeTree https://rsuitejs.com/components/multi-cascade-tree
   */
  inline?: boolean;
}
export interface MultiCascaderProps<T = any>
  extends FormControlPickerProps<T[], PickerLocale, Option<T>, T>,
    MultiCascadeTreeProps<T, T[], PickerLocale>,
    DeprecatedProps,
    Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
  /**
   * A picker that can be counted
   */
  countable?: boolean;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: T[],
    selectedItems: Option<T>[],
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
const MultiCascader = forwardRef<'div', MultiCascaderProps>(
  <T extends OptionValue>(props: MultiCascaderProps<T>, ref) => {
    const { propsWithDefaults, rtl } = useCustom('MultiCascader', props);
    const {
      as,
      appearance = 'default',
      block,
      className,
      cleanable = true,
      classPrefix = 'picker',
      columnHeight,
      columnWidth,
      childrenKey = 'children',
      countable = true,
      cascade = true,
      data = emptyArray,
      defaultValue,
      disabled,
      disabledItemValues = emptyArray,
      id,
      labelKey = 'label',
      locale,
      placeholder,
      placement = 'bottomStart',
      popupClassName,
      popupStyle,
      renderColumn,
      renderExtraFooter,
      renderTreeNode,
      renderValue,
      searchable = true,
      style,
      toggleAs,
      uncheckableItemValues = emptyArray,
      value: valueProp,
      valueKey = 'value',
      getChildren,
      onClean,
      onChange,
      onCheck,
      onEntered,
      onExited,
      onSearch,
      onSelect,
      ...rest
    } = propsWithDefaults;

    const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
    const { prefix, merge } = useStyles(classPrefix);

    const onSelectCallback = useCallback(
      (node: Option<T>, cascadePaths: Option<T>[], event: React.SyntheticEvent) => {
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
        items: readonly Option<T>[];
        parentItem?: Option<T>;
        layer?: number;
      }
    ) => {
      if (typeof renderColumn === 'function') {
        return renderColumn(childNodes, column);
      }
      return childNodes;
    };

    const renderCascadeTreeNode = (node: React.ReactNode, itemData: Option<T>) => {
      if (typeof renderTreeNode === 'function') {
        return renderTreeNode(node, itemData);
      }
      return node;
    };

    const renderTreeView = (positionProps?: PositionChildProps, speakerRef?) => {
      const { className } = positionProps || {};
      const classes = merge(className, popupClassName, prefix('popup-multi-cascader'));

      return (
        <PickerPopup
          ref={mergeRefs(overlay, speakerRef)}
          className={classes}
          style={popupStyle}
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
              columnWidth={columnWidth}
              columnHeight={columnHeight}
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

    const triggerProps = {
      ...pick(props, triggerPropKeys),
      onEnter: handleEntered,
      onExited: handleExited
    };

    return (
      <PickerToggleTrigger
        as={as}
        id={id}
        name="multi-cascader"
        block={block}
        disabled={disabled}
        appearance={appearance}
        popupType="tree"
        multiple
        triggerProps={triggerProps}
        ref={trigger}
        placement={placement}
        speaker={renderTreeView}
        rootRef={root}
        style={style}
        classPrefix={classPrefix}
        className={className}
      >
        <PickerToggle
          ref={target}
          as={toggleAs}
          appearance={appearance}
          disabled={disabled}
          onClean={createChainedFunction(handleClean, onClean)}
          onKeyDown={onPickerKeyDown}
          cleanable={cleanable && !disabled}
          countable={countable}
          hasValue={hasValue}
          active={active}
          placement={placement}
          inputValue={value}
          {...rest}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </PickerToggleTrigger>
    );
  }
);

MultiCascader.displayName = 'MultiCascader';

export default MultiCascader;
