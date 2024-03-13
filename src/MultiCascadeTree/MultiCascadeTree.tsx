import React, { useState } from 'react';
import TreeView from './TreeView';
import { useCascadeValue, useColumnData, useFlattenData } from './utils';
import {
  useClassNames,
  useUpdateEffect,
  useControlled,
  useEventCallback,
  useIsMounted
} from '../utils';
import { ItemDataType, DataProps, WithAsProps } from '../@types/common';
import SearchView from './SearchView';
import useSearch from './useSearch';

export interface MultiCascadeTreeProps<T> extends WithAsProps, DataProps<ItemDataType<T>> {
  /**
   * Initial value
   */
  defaultValue?: T[];

  /**
   * Selected value
   */
  value?: T[];

  /**
   * When set to true, selecting a child node will update the state of the parent node.
   */
  cascade?: boolean;

  /**
   * Sets the width of the column
   */
  columnWidth?: number;

  /**
   * Sets the height of the column
   */
  columnHeight?: number;

  /**
   * Disabled items
   */
  disabledItemValues?: T[];

  /**
   * Set the option value for the check box not to be rendered
   */
  uncheckableItemValues?: T[];

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
  renderTreeNode?: (label: React.ReactNode, item: any) => React.ReactNode;

  /**
   * Called when the option is selected
   */
  onSelect?: (
    node: ItemDataType,
    cascadePaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;

  /**
   * Called after the checkbox state changes.
   */
  onCheck?: (value: T[], node: ItemDataType, checked: boolean, event: React.SyntheticEvent) => void;

  /**
   * Called after the value has been changed
   */
  onChange?: (value: T[], event: React.SyntheticEvent) => void;

  /**
   * Called when searching
   */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;

  /**
   * Asynchronously load the children of the tree node.
   */
  getChildren?: (node: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}

const emptyArray = [];

/**
 * The `MultiCascadeTree` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascade-tree/
 */
const MultiCascadeTree = React.forwardRef(
  <T extends number | string>(props: MultiCascadeTreeProps<T>, ref) => {
    const {
      as: Component = 'div',
      data = emptyArray,
      defaultValue,
      className,
      classPrefix = 'cascade-tree',
      value: valueProp,
      valueKey = 'value',
      labelKey = 'label',
      childrenKey = 'children',
      disabledItemValues = emptyArray,
      cascade = true,
      columnWidth,
      columnHeight,
      searchable,
      uncheckableItemValues = emptyArray,
      getChildren,
      renderColumn,
      renderTreeNode,
      onSelect,
      onCheck,
      onChange,
      onSearch,
      ...rest
    } = props;

    const isMounted = useIsMounted();
    const itemKeys = { childrenKey, labelKey, valueKey };
    const { flattenData, addFlattenData } = useFlattenData<ItemDataType<T>>(data, itemKeys);
    const [controlledValue] = useControlled(valueProp, defaultValue);
    const { value, setValue, splitValue } = useCascadeValue(
      {
        ...itemKeys,
        uncheckableItemValues,
        cascade,
        value: controlledValue
      },
      flattenData
    );

    // The columns displayed in the cascading panel.
    const { columnData, addColumn, removeColumnByIndex, enforceUpdateColumnData } =
      useColumnData(flattenData);

    useUpdateEffect(() => {
      enforceUpdateColumnData(data);
    }, [data]);

    const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
      labelKey,
      valueKey,
      childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues,
      onSearch
    });

    // The path after cascading data selection.
    const [selectedPaths, setSelectedPaths] = useState<ItemDataType<T>[]>();

    const handleSelect = useEventCallback(
      (node: ItemDataType<T>, cascadePaths: ItemDataType<T>[], event: React.SyntheticEvent) => {
        setSelectedPaths(cascadePaths);
        onSelect?.(node, cascadePaths, event);

        const columnIndex = cascadePaths.length;

        // Lazy load node's children
        if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
          node.loading = true;

          const children = getChildren(node);
          if (children instanceof Promise) {
            children.then(data => {
              node.loading = false;
              node[childrenKey] = data;

              if (isMounted()) {
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

        if (searchKeyword) {
          setSearchKeyword('');
        }
      }
    );

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component ref={ref} className={classes} {...rest}>
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
        {!searchKeyword && (
          <TreeView
            cascade={cascade}
            columnWidth={columnWidth}
            columnHeight={columnHeight}
            uncheckableItemValues={uncheckableItemValues}
            disabledItemValues={disabledItemValues}
            valueKey={valueKey}
            labelKey={labelKey}
            childrenKey={childrenKey}
            classPrefix={classPrefix}
            cascadeData={columnData}
            cascadePaths={selectedPaths}
            value={value}
            onSelect={handleSelect}
            onCheck={handleCheck}
            renderColumn={renderColumn}
            renderTreeNode={renderTreeNode}
          />
        )}
      </Component>
    );
  }
);

MultiCascadeTree.displayName = 'MultiCascadeTree';

export default MultiCascadeTree;
