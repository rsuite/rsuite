import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import { findNodeOfTree } from '../utils/treeUtils';
import { getColumnsAndPaths } from '../CascadeTree/utils';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  mergeRefs,
  useClassNames,
  useCustom,
  useUpdateEffect,
  useControlled,
  useEventCallback
} from '../utils';

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
  listPickerPropTypes,
  PickerComponent,
  PickerToggleProps
} from '../internals/Picker';
import { deprecatePropTypeNew } from '../internals/propTypes';
import { useCascadeValue, useColumnData, useFlattenData } from '../MultiCascadeTree/utils';
import TreeView from '../MultiCascadeTree/TreeView';
import SearchView from '../MultiCascadeTree/SearchView';
import useSearch from '../MultiCascadeTree/useSearch';
import { oneOf } from '../internals/propTypes';
import { FormControlPickerProps, ItemDataType } from '../@types/common';

export type ValueType = number | string;
export interface MultiCascaderProps<T = ValueType>
  extends FormControlPickerProps<T[], PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'loading'> {
  /**
   * When set to true, selecting a child node will update the state of the parent node.
   */
  cascade?: boolean;

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
   * Sets the width of the column
   */
  columnWidth?: number;

  /**
   * Sets the height of the column
   */
  columnHeight?: number;

  /**
   * Set the option value for the check box not to be rendered
   */
  uncheckableItemValues?: T[];

  /**
   * Whether dispaly search input box
   */
  searchable?: boolean;

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
    items: readonly ItemDataType[],
    menu: React.ReactNode,
    parentNode?: any,
    layer?: number
  ) => React.ReactNode;

  /**
   * Custom render column
   */
  renderColumn?: (
    childNodes: React.ReactNode,
    column: {
      items: readonly ItemDataType<T>[];
      parentItem?: ItemDataType<T>;
      layer?: number;
    }
  ) => React.ReactNode;

  /**
   * Custom render menu item
   * @deprecated Use renderTreeNode instead
   */
  renderMenuItem?: (node: React.ReactNode, item: ItemDataType<T>) => React.ReactNode;

  /**
   * Custom render tree node
   */
  renderTreeNode?: (node: React.ReactNode, item: ItemDataType<T>) => React.ReactNode;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: T[],
    selectedItems: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * Called when the option is selected
   */
  onSelect?: (
    node: ItemDataType,
    cascadePaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;

  /**
   * Called after the checkbox state changes
   */
  onCheck?: (value: T[], node: ItemDataType, checked: boolean, event: React.SyntheticEvent) => void;

  /**
   * Called when clean
   */
  onClean?: (event: React.SyntheticEvent) => void;

  /**
   * Called when searching
   */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;

  /**
   * Asynchronously load the children of the tree node.
   */
  getChildren?: (node: ItemDataType) => ItemDataType[] | Promise<ItemDataType[]>;
}

const emptyArray = [];

/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
const MultiCascader: PickerComponent<MultiCascaderProps> = React.forwardRef(
  <T extends ValueType>(props: MultiCascaderProps<T>, ref) => {
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
      locale: overrideLocale,
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
      onEnter,
      onExit,
      onExited,
      onClean,
      onSearch,
      onSelect,
      onChange,
      onOpen,
      onClose,
      onCheck,
      menuClassName: DEPRECATED_menuClassName,
      menuStyle: DEPRECATED_menuStyle,
      menuWidth: DEPRECATED_menuWidth,
      menuHeight: DEPRECATED_menuHeight,
      renderMenu: DEPRECATED_renderMenu,
      renderMenuItem: DEPRECATED_renderMenuItem,
      ...rest
    } = props;

    const itemKeys = { childrenKey, labelKey, valueKey };
    const [active, setActive] = useState(false);
    const { flattenData, addFlattenData } = useFlattenData(data, itemKeys);
    const [controlledValue] = useControlled(valueProp, defaultValue);
    const { value, setValue, splitValue } = useCascadeValue<T>(
      {
        ...itemKeys,
        uncheckableItemValues,
        cascade,
        value: controlledValue
      },
      flattenData
    );

    // The columns displayed in the cascading panel.
    const { columnData, setColumnData, addColumn, removeColumnByIndex, enforceUpdateColumnData } =
      useColumnData(flattenData);

    useUpdateEffect(() => {
      enforceUpdateColumnData(data);
    }, [data]);

    // The path after cascading data selection.
    const [selectedPaths, setSelectedPaths] = useState<ItemDataType[]>();
    const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
    const { locale, rtl } = useCustom<PickerLocale>('Picker', overrideLocale);
    const selectedItems = flattenData.filter(item => value.some(v => v === item[valueKey])) || [];

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
      callback: useCallback(
        value => {
          const { columns, path } = getColumnsAndPaths(
            data,
            flattenData.find(item => item[valueKey] === value),
            {
              getParent: () => undefined,
              getChildren: item => item[childrenKey]
            }
          );

          setColumnData(columns);
          setSelectedPaths(path);
        },
        [childrenKey, data, flattenData, setColumnData, valueKey]
      )
    });

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue =
      selectedItems.length > 0 || (Number(valueProp?.length) > 0 && isFunction(renderValue));

    const { prefix, merge } = useClassNames(classPrefix);

    const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
      labelKey,
      valueKey,
      childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues,
      onSearch: (value: string, event: React.SyntheticEvent) => {
        if (value) {
          setLayer(0);
        } else if (selectedPaths?.length) {
          setLayer(selectedPaths.length - 1);
        }
        setKeys([]);

        onSearch?.(value, event);
      }
    });

    const handleEntered = useEventCallback(() => {
      onOpen?.();
      setActive(true);
    });

    const handleExited = useEventCallback(() => {
      setActive(false);
      setSearchKeyword('');
    });

    const handleSelect = useEventCallback(
      (node: ItemDataType, cascadePaths: ItemDataType[], event: React.SyntheticEvent) => {
        setSelectedPaths(cascadePaths);
        onSelect?.(node, cascadePaths, event);

        const columnIndex = cascadePaths.length;

        // Lazy load node's children
        if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
          node.loading = true;

          const children = getChildren(node);
          if (children instanceof Promise) {
            children.then((data: ItemDataType[]) => {
              node.loading = false;
              node[childrenKey] = data;

              if (target.current) {
                addFlattenData(data, node);
                addColumn(data, columnIndex);
              }
            });
          } else {
            node.loading = false;
            node[childrenKey] = children;
            addFlattenData(children, node);
            addColumn(children, columnIndex);
          }
        } else if (node[childrenKey]?.length) {
          addColumn(node[childrenKey], columnIndex);
        } else {
          // Removes subsequent columns of the current column when the clicked node is a leaf node.
          removeColumnByIndex(columnIndex);
        }

        trigger.current?.updatePosition?.();
      }
    );

    const handleCheck = useEventCallback(
      (node: ItemDataType, event: React.SyntheticEvent, checked: boolean) => {
        const nodeValue = node[valueKey];
        let nextValue: T[] = [];

        if (cascade) {
          nextValue = splitValue(node, checked, value).value;
        } else {
          nextValue = [...value];
          if (checked) {
            nextValue.push(nodeValue);
          } else {
            nextValue = nextValue.filter(n => n !== nodeValue);
          }
        }

        setValue(nextValue);
        onChange?.(nextValue, event);
        onCheck?.(nextValue, node, checked, event);
      }
    );

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
        prefix('cascader-menu', 'multi-cascader-menu')
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
              data={items}
              value={value}
              searchKeyword={searchKeyword}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              disabledItemValues={disabledItemValues}
              onCheck={handleCheck}
              onSearch={handleSearch}
            />
          )}

          {searchKeyword === '' && (
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

    if (hasValue && isFunction(renderValue)) {
      selectedElement = renderValue(
        value.length ? value : valueProp ?? [],
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
        onEnter={createChainedFunction(handleEntered, onEnter)}
        onExited={createChainedFunction(handleExited, onExited)}
        onExit={createChainedFunction(onClose, onExit)}
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
            {selectedElement || locale.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
);

MultiCascader.displayName = 'MultiCascader';
MultiCascader.propTypes = {
  ...listPickerPropTypes,
  value: PropTypes.array,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  cascade: PropTypes.bool,
  countable: PropTypes.bool,
  uncheckableItemValues: PropTypes.array,
  searchable: PropTypes.bool,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
  inline: deprecatePropTypeNew(PropTypes.bool, 'Use `<MultiCascadeTree>` instead.'),
  renderMenu: deprecatePropTypeNew(PropTypes.func, 'Use "renderColumn" property instead.'),
  renderMenuItem: deprecatePropTypeNew(PropTypes.func, 'Use "renderTreeNode" property instead.'),
  menuWidth: deprecatePropTypeNew(PropTypes.number, 'Use "columnWidth" property instead.'),
  menuHeight: deprecatePropTypeNew(PropTypes.number, 'Use "columnHeight" property instead.')
};

export default MultiCascader;
