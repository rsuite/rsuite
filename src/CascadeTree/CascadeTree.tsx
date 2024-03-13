import React, { useState, useMemo } from 'react';
import { useSet } from 'react-use-set';
import { getParentMap, flattenTree } from '../utils/treeUtils';
import { usePaths } from './utils';
import { useControlled, useClassNames, useIsMounted, useEventCallback } from '../utils';
import { ItemDataType, DataProps, WithAsProps } from '../@types/common';
import { useMap } from '../utils/useMap';
import TreeView from './TreeView';
import SearchView from './SearchView';
import useSearch from './useSearch';

export type ValueType = number | string | null;

export interface CascadeTreeProps<T = ValueType> extends WithAsProps, DataProps<ItemDataType<T>> {
  /**
   * Initial value
   */
  defaultValue?: T;

  /**
   * Selected value
   */
  value?: T;

  /**
   * Sets the width of the menu
   */
  columnWidth?: number;

  /**
   * Sets the height of the menu
   */
  columnHeight?: number;

  /**
   * Disabled items
   */
  disabledItemValues?: T[];

  /**
   * Whether dispaly search input box
   */
  searchable?: boolean;

  /**
   * Custom render columns
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
   * Called when the option is selected
   */
  onSelect?: (
    node: {
      itemData: ItemDataType<T>;
      cascadePaths?: ItemDataType<T>[];
      isLeafNode?: boolean;
    },
    event: React.MouseEvent
  ) => void;

  /**
   * Called after the value has been changed
   */
  onChange?: (value: T, event: React.SyntheticEvent) => void;

  /**
   * Called when searching
   */
  onSearch?: (value: string, event: React.SyntheticEvent) => void;

  /**
   * Asynchronously load the children of the tree node.
   */
  getChildren?: (childNodes: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}

export interface CascadeTreeComponent {
  <T>(props: CascadeTreeProps<T> & { ref?: React.Ref<HTMLDivElement> }): JSX.Element | null;
  displayName?: string;
  propTypes?: React.WeakValidationMap<CascadeTreeProps<any>>;
}

/**
 * CascadeTree is a component that displays tree-structured data in columns.
 *
 * @see https://rsuitejs.com/components/cascade-tree
 */
const CascadeTree = React.forwardRef(<T extends ValueType>(props: CascadeTreeProps<T>, ref) => {
  const {
    as: Component = 'div',
    data = [],
    defaultValue,
    className,
    classPrefix = 'cascade-tree',
    childrenKey = 'children',
    valueKey = 'value',
    labelKey = 'label',
    value: valueProp,
    disabledItemValues = [],
    columnWidth,
    columnHeight,
    searchable,
    renderTreeNode,
    renderColumn,
    onSelect,
    onSearch,
    onChange,
    getChildren,
    ...rest
  } = props;

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

  const selectedItem = flattenedData.find(item => item[valueKey] === value);

  // The item that focus is on
  const [activeItem, setActiveItem] = useState<ItemDataType<T> | undefined>(selectedItem);

  const { columns, pathTowardsActiveItem } = usePaths({
    data,
    activeItem,
    selectedItem,
    getParent: item => parentMap.get(item),
    getChildren: item => childrenMap.get(item) ?? item[childrenKey]
  });

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
    labelKey,
    childrenKey,
    parentMap,
    flattenedData,
    onSearch: (value: string, _items: ItemDataType<T>[], event: React.SyntheticEvent) =>
      onSearch?.(value, event)
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
      const { itemData, isLeafNode } = node;

      onSelect?.(node, event);
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
        setValue(nextValue);
        onChange?.(nextValue, event);
      }
    }
  );

  const handleSearchRowSelect = useEventCallback(
    (item: ItemDataType<T>, items: ItemDataType<T>[], event: React.MouseEvent) => {
      const node = {
        itemData: item,
        cascadePaths: items,
        isLeafNode: !item[childrenKey]?.length
      };

      handleSelect(node, event);
      setSearchKeyword('');
    }
  );

  return (
    <Component className={classes} {...rest} ref={ref}>
      {searchable && (
        <SearchView
          data={items}
          searchKeyword={searchKeyword}
          valueKey={valueKey}
          labelKey={labelKey}
          parentMap={parentMap}
          disabledItemValues={disabledItemValues}
          onSelect={handleSearchRowSelect}
          onSearch={handleSearch}
        />
      )}
      {!searchKeyword && (
        <TreeView
          columnWidth={columnWidth}
          columnHeight={columnHeight}
          disabledItemValues={disabledItemValues}
          loadingItemsSet={loadingItemsSet}
          valueKey={valueKey}
          labelKey={labelKey}
          childrenKey={childrenKey}
          classPrefix={classPrefix}
          data={columns}
          cascadePaths={pathTowardsActiveItem}
          activeItemValue={value}
          onSelect={handleSelect}
          renderColumn={renderColumn}
          renderTreeNode={renderTreeNode}
        />
      )}
    </Component>
  );
}) as CascadeTreeComponent;

CascadeTree.displayName = 'CascadeTree';

export default CascadeTree;
