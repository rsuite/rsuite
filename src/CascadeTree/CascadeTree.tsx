import React, { useCallback, useMemo } from 'react';
import TreeView from './TreeView';
import SearchView from './SearchView';
import { forwardRef } from '@/internals/utils';
import { getParentMap } from '@/internals/Tree/utils';
import { flattenTree } from '../Tree/utils';
import { useMap, useControlled, useClassNames, useEventCallback } from '@/internals/hooks';
import { useSearch, useSelect, usePaths } from './hooks';
import { useCustom } from '../CustomProvider';
import type { ItemDataType, DataItemValue } from '@/internals/types';
import type { CascadeTreeProps } from './types';
import type { SelectNode } from './types';

export interface CascadeTreeComponent {
  <T>(props: CascadeTreeProps<T>): JSX.Element | null;
  displayName?: string;
}

/**
 * CascadeTree is a component that displays tree-structured data in columns.
 *
 * @see https://rsuitejs.com/components/cascade-tree
 */
const CascadeTree = forwardRef<'div', CascadeTreeProps>(
  <T extends DataItemValue>(props: CascadeTreeProps<T>, ref) => {
    const { propsWithDefaults } = useCustom('CascadeTree', props);
    const {
      as: Component = 'div',
      data = [],
      defaultValue,
      className,
      classPrefix = 'cascade-tree',
      childrenKey = 'children',
      valueKey = 'value',
      labelKey = 'label',
      locale,
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
    } = propsWithDefaults;

    const [value, setValue] = useControlled(valueProp, defaultValue) as [
      T | null | undefined,
      (value: React.SetStateAction<T | null>) => void,
      boolean
    ];

    // Store the children of each node
    const childrenMap = useMap<ItemDataType<T>, readonly ItemDataType<T>[]>();

    // Store the parent of each node
    const parentMap = useMemo(
      () => getParentMap(data, item => childrenMap.get(item) ?? item[childrenKey]),
      [childrenMap, childrenKey, data]
    );

    // Flatten the tree data
    const flattenedData = useMemo(
      () => flattenTree(data, item => childrenMap.get(item) ?? item[childrenKey]),
      [childrenMap, childrenKey, data]
    );

    // The selected item
    const selectedItem = flattenedData.find(item => item[valueKey] === value);

    // Callback function after selecting the node
    const onSelectCallback = (node: SelectNode<T>, event: React.SyntheticEvent) => {
      const { isLeafNode, cascadePaths, itemData } = node;

      onSelect?.(itemData, cascadePaths, event);

      if (isLeafNode) {
        const nextValue = itemData[valueKey];
        setValue(nextValue);
      }
    };

    const { activeItem, loadingItemsSet, handleSelect } = useSelect<T>({
      value,
      valueKey,
      childrenKey,
      childrenMap,
      selectedItem,
      getChildren,
      onChange,
      onSelect: onSelectCallback
    });

    const { columns, pathTowardsActiveItem } = usePaths({
      data,
      activeItem,
      selectedItem,
      getParent: item => parentMap.get(item),
      getChildren: item => childrenMap.get(item) ?? item[childrenKey]
    });

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    const onSearchCallback = useCallback(
      (value: string, _items: ItemDataType<T>[], event: React.SyntheticEvent) =>
        onSearch?.(value, event),
      [onSearch]
    );

    const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
      labelKey,
      childrenKey,
      parentMap,
      flattenedData,
      onSearch: onSearchCallback
    });

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
            locale={locale}
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
  }
) as CascadeTreeComponent;

CascadeTree.displayName = 'CascadeTree';

export default CascadeTree;
