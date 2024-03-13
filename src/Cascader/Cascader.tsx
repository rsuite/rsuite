import React, { useState, useCallback, useMemo } from 'react';
import { useSet } from 'react-use-set';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import shallowEqual from '../utils/shallowEqual';
import TreeView from '../CascadeTree/TreeView';
import SearchView from '../CascadeTree/SearchView';
import useSearch from '../CascadeTree/useSearch';
import { usePaths } from '../CascadeTree/utils';
import { getParentMap, findNodeOfTree, flattenTree } from '../utils/treeUtils';
import { deprecatePropTypeNew } from '../internals/propTypes';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  mergeRefs,
  useControlled,
  useCustom,
  useClassNames,
  useIsMounted,
  useEventCallback
} from '../utils';

import {
  PickerToggle,
  PickerPopup,
  PickerToggleTrigger,
  usePickerClassName,
  usePickerRef,
  useToggleKeyDownEvent,
  useFocusItemValue,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  listPickerPropTypes,
  PickerHandle,
  PickerToggleProps
} from '../internals/Picker';

import { ItemDataType, FormControlPickerProps } from '../@types/common';
import { useMap } from '../utils/useMap';
import { oneOf } from '../internals/propTypes';

export type ValueType = number | string;
export interface CascaderProps<T = ValueType>
  extends FormControlPickerProps<T | null, PickerLocale, ItemDataType<T>>,
    Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
  /**
   * Whether dispaly search input box
   */
  searchable?: boolean;

  /**
   * The panel is displayed directly when the component is initialized
   * @deprecated Use CascadeTree instead
   * @see CascadeTree https://rsuitejs.com/components/cascade-tree
   */
  inline?: boolean;

  /**
   * When true, make the parent node selectable
   */
  parentSelectable?: boolean;

  /**
   * Custom menu class name
   * @deprecated Use popupClassName instead
   */
  menuClassName?: string;

  /**
   * Custom popup style
   */
  popupClassName?: string;

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
   * Sets the width of the menu.
   *
   * @deprecated Use columnWidth instead
   */
  menuWidth?: number;

  /**
   * Sets the height of the menu
   * @deprecated Use columnHeight instead
   */
  menuHeight?: number | string;

  /**
   * Sets the width of the column
   */
  columnWidth?: number;

  /**
   * Sets the height of the column
   */
  columnHeight?: number;

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
   * Custom render menu item
   * @deprecated Use renderTreeNode instead
   */
  renderMenuItem?: (node: React.ReactNode, item: ItemDataType) => React.ReactNode;

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
   * Custom render tree node
   */
  renderTreeNode?: (node: React.ReactNode, itemData: ItemDataType<T>) => React.ReactNode;

  /**
   * Custom render search items
   */
  renderSearchItem?: (node: React.ReactNode, items: ItemDataType[]) => React.ReactNode;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: T,
    selectedPaths: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * Called when the option is selected
   */
  onSelect?: (
    value: ItemDataType,
    selectedPaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;

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
  getChildren?: (node: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}

export interface CascaderComponent {
  <T>(
    props: CascaderProps<T> & {
      ref?: React.Ref<PickerHandle>;
    }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: React.WeakValidationMap<CascaderProps<any>>;
}

const emptyArray = [];

/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
const Cascader = React.forwardRef(<T extends number | string>(props: CascaderProps<T>, ref) => {
  const {
    as: Component = 'div',
    data = emptyArray,
    classPrefix = 'picker',
    childrenKey = 'children',
    valueKey = 'value',
    labelKey = 'label',
    defaultValue,
    placeholder,
    disabled,
    disabledItemValues = emptyArray,
    appearance = 'default',
    cleanable = true,
    locale: overrideLocale,
    toggleAs,
    style,
    value: valueProp,
    popupClassName,
    popupStyle,
    columnHeight,
    columnWidth,
    searchable = true,
    parentSelectable,
    placement = 'bottomStart',
    id,
    renderColumn,
    renderTreeNode,
    renderSearchItem,
    renderValue,
    renderExtraFooter,
    onEnter,
    onExited,
    onClean,
    onChange,
    onSelect,
    onSearch,
    onClose,
    onOpen,
    getChildren,
    menuClassName: DEPRECATED_menuClassName,
    menuStyle: DEPRECATED_menuStyle,
    menuWidth: DEPRECATED_menuWidth,
    menuHeight: DEPRECATED_menuHeight,
    renderMenuItem: DEPRECATED_renderMenuItem,
    renderMenu: DEPRECATED_renderMenu,
    ...rest
  } = props;

  // Use component active state to support keyboard events.
  const [active, setActive] = useState(false);

  const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
  const [value, setValue] = useControlled(valueProp, defaultValue) as [
    T | null | undefined,
    (value: React.SetStateAction<T | null>) => void,
    boolean
  ];

  const isMounted = useIsMounted();
  const loadingItemsSet = useSet();
  const childrenMap = useMap<ItemDataType<T>, readonly ItemDataType<T>[]>();
  const parentMap = useMemo(
    () => getParentMap(data, item => childrenMap.get(item) ?? item[childrenKey]),
    [childrenMap, childrenKey, data]
  );

  const flattenedData = useMemo(
    () => flattenTree(data, item => childrenMap.get(item) ?? item[childrenKey]),
    [childrenMap, childrenKey, data]
  );

  // The item that focus is on
  const [activeItem, setActiveItem] = useState<ItemDataType<T> | undefined>();

  const { columns, pathTowardsActiveItem, pathTowardsSelectedItem } = usePaths({
    data,
    activeItem,
    selectedItem: flattenedData.find(item => item[valueKey] === value),
    getParent: item => parentMap.get(item),
    getChildren: item =>
      childrenMap.get(item) ?? (item[childrenKey] as readonly ItemDataType<T>[] | undefined)
  });

  const { locale, rtl } = useCustom<PickerLocale>('Picker', overrideLocale);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValue = pathTowardsSelectedItem.length > 0 || (!isNil(value) && isFunction(renderValue));

  const { prefix, merge } = useClassNames(classPrefix);

  // Used to hover the focuse item  when trigger `onKeydown`
  const {
    focusItemValue,
    setFocusItemValue,
    setLayer,
    setKeys,
    onKeyDown: onFocusItem
  } = useFocusItemValue(value, {
    rtl,
    data: flattenedData,
    valueKey,
    defaultLayer: pathTowardsSelectedItem?.length ? pathTowardsSelectedItem.length - 1 : 0,
    target: () => overlay.current,
    getParent: item => parentMap.get(item),
    callback: useCallback(
      value => {
        setActiveItem(flattenedData.find(item => item[valueKey] === value));
      },
      [flattenedData, setActiveItem, valueKey]
    )
  });

  const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
    labelKey,
    childrenKey,
    parentMap,
    flattenedData,
    parentSelectable,
    onSearch: (value: string, items: ItemDataType<T>[], event: React.SyntheticEvent) => {
      onSearch?.(value, event);

      if (!value || items.length === 0) {
        setFocusItemValue(undefined);
        return;
      }

      if (items.length > 0) {
        setFocusItemValue(items[0][valueKey]);
        setLayer(0);
        setKeys([]);
      }
    }
  });

  const handleEntered = useEventCallback(() => {
    if (!target.current) {
      return;
    }

    onOpen?.();
    setActive(true);
  });

  const handleExited = useEventCallback(() => {
    if (!target.current) {
      return;
    }

    onClose?.();
    setActive(false);
    setSearchKeyword('');
  });

  const handleClose = useEventCallback(() => {
    trigger.current?.close();

    // The focus is on the trigger button after closing
    target.current?.focus?.();
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    if (disabled || !target.current) {
      return;
    }

    setValue(null);
    onChange?.(null, event);
  });

  const handleMenuPressEnter = useEventCallback((event: React.SyntheticEvent) => {
    const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
    const isLeafNode = focusItem && !focusItem[childrenKey];

    if (isLeafNode) {
      setValue(focusItemValue as T | null);
      if (pathTowardsActiveItem.length) {
        setLayer(pathTowardsActiveItem.length - 1);
      }

      if (!shallowEqual(value, focusItemValue)) {
        onSelect?.(focusItem as ItemDataType<T>, pathTowardsActiveItem, event);
        onChange?.(focusItemValue ?? null, event);
      }
      handleClose();
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

  const handleSelect = useEventCallback(
    (
      node: {
        itemData: ItemDataType<T>;
        cascadePaths: ItemDataType<T>[];
        isLeafNode: boolean;
      },
      event: React.MouseEvent
    ) => {
      const { itemData, cascadePaths, isLeafNode } = node;

      onSelect?.(itemData, cascadePaths, event);
      setActiveItem(itemData);

      const nextValue = itemData[valueKey];

      // Lazy load node's children
      if (
        typeof getChildren === 'function' &&
        itemData[childrenKey]?.length === 0 &&
        !childrenMap.has(itemData)
      ) {
        loadingItemsSet.add(itemData);

        const children = getChildren(itemData);

        if (children instanceof Promise) {
          children.then((data: readonly ItemDataType<T>[]) => {
            if (isMounted()) {
              loadingItemsSet.delete(itemData);
              childrenMap.set(itemData, data);
            }
          });
        } else {
          loadingItemsSet.delete(itemData);
          childrenMap.set(itemData, children);
        }
      }

      if (isLeafNode) {
        // Determines whether the option is a leaf node, and if so, closes the picker.
        handleClose();

        setValue(nextValue);

        if (!shallowEqual(value, nextValue)) {
          onChange?.(nextValue, event);
        }

        return;
      }

      /** When the parent is optional, the value and the displayed path are updated. */
      if (parentSelectable && !shallowEqual(value, nextValue)) {
        setValue(nextValue);
        onChange?.(nextValue, event);
      }

      // Update menu position
      trigger.current?.updatePosition();
    }
  );

  /**
   * The search structure option is processed after being selected.
   */
  const handleSearchRowSelect = useEventCallback(
    (itemData: ItemDataType, nodes: ItemDataType<T>[], event: React.SyntheticEvent) => {
      const nextValue = itemData[valueKey];

      handleClose();
      setSearchKeyword('');
      setValue(nextValue);

      onSelect?.(itemData, nodes, event);
      onChange?.(nextValue, event);
    }
  );

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
      prefix('cascader-menu')
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
            searchKeyword={searchKeyword}
            valueKey={valueKey}
            labelKey={labelKey}
            parentMap={parentMap}
            disabledItemValues={disabledItemValues}
            focusItemValue={focusItemValue}
            inputRef={searchInput}
            renderSearchItem={renderSearchItem}
            onSelect={handleSearchRowSelect}
            onSearch={handleSearch}
          />
        )}

        {searchKeyword === '' && (
          <TreeView
            columnWidth={columnWidth ?? DEPRECATED_menuWidth}
            columnHeight={columnHeight ?? DEPRECATED_menuHeight}
            disabledItemValues={disabledItemValues}
            loadingItemsSet={loadingItemsSet}
            valueKey={valueKey}
            labelKey={labelKey}
            childrenKey={childrenKey}
            classPrefix={'cascade-tree'}
            data={columns}
            cascadePaths={pathTowardsActiveItem}
            activeItemValue={value}
            onSelect={handleSelect}
            renderColumn={renderCascadeColumn}
            renderTreeNode={renderCascadeTreeNode}
          />
        )}
        {renderExtraFooter?.()}
      </PickerPopup>
    );
  };

  let selectedElement: any = placeholder;

  if (pathTowardsSelectedItem.length > 0) {
    selectedElement = [];

    pathTowardsSelectedItem.forEach((item, index) => {
      const key = item[valueKey] || item[labelKey];
      selectedElement.push(<span key={key}>{item[labelKey]}</span>);
      if (index < pathTowardsSelectedItem.length - 1) {
        selectedElement.push(
          <span className="separator" key={`${key}-separator`}>
            {' / '}
          </span>
        );
      }
    });
  }

  if (!isNil(value) && isFunction(renderValue)) {
    selectedElement = renderValue(value, pathTowardsSelectedItem, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }

  const [classes, usedClassNamePropKeys] = usePickerClassName({
    ...props,
    classPrefix,
    hasValue,
    name: 'cascader',
    appearance,
    cleanable
  });

  return (
    <PickerToggleTrigger
      id={id}
      popupType="tree"
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={trigger}
      placement={placement}
      onEntered={createChainedFunction(handleEntered, onEnter)}
      onExited={createChainedFunction(handleExited, onExited)}
      speaker={renderTreeView}
    >
      <Component className={classes} style={style} ref={root}>
        <PickerToggle
          {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
          ref={target}
          as={toggleAs}
          appearance={appearance}
          disabled={disabled}
          onClean={createChainedFunction(handleClean, onClean)}
          onKeyDown={onPickerKeyDown}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={active}
          placement={placement}
          inputValue={value ?? ''}
          focusItemValue={focusItemValue}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
}) as CascaderComponent;

Cascader.displayName = 'Cascader';
Cascader.propTypes = {
  ...listPickerPropTypes,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  cleanable: PropTypes.bool,
  renderColumn: PropTypes.func,
  renderTreeNode: PropTypes.func,
  renderSearchItem: PropTypes.func,
  columnWidth: PropTypes.number,
  columnHeight: PropTypes.number,
  searchable: PropTypes.bool,
  parentSelectable: PropTypes.bool,
  inline: deprecatePropTypeNew(PropTypes.bool, 'Use `<CascadeTree>` instead.'),
  renderMenu: deprecatePropTypeNew(PropTypes.func, 'Use "renderColumn" property instead.'),
  renderMenuItem: deprecatePropTypeNew(PropTypes.func, 'Use "renderTreeNode" property instead.'),
  menuWidth: deprecatePropTypeNew(PropTypes.number, 'Use "columnWidth" property instead.'),
  menuHeight: deprecatePropTypeNew(PropTypes.number, 'Use "columnHeight" property instead.')
};

export default Cascader;
