import React from 'react';
import TreeView from './TreeView';
import { useCascadeValue, useSelect, useSearch } from './hooks';
import { useClassNames, useControlled } from '@/internals/hooks';
import SearchView from './SearchView';
import type { DataItemValue } from '@/internals/types';
import type { MultiCascadeTreeProps } from './types';

const emptyArray = [];

/**
 * The `MultiCascadeTree` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascade-tree/
 */
const MultiCascadeTree = React.forwardRef(
  <T extends DataItemValue>(props: MultiCascadeTreeProps<T>, ref) => {
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

    const itemKeys = { childrenKey, labelKey, valueKey };

    const { selectedPaths, flattenData, columnData, handleSelect } = useSelect({
      data,
      childrenKey,
      labelKey,
      valueKey,
      onSelect,
      getChildren
    });

    const [controlledValue] = useControlled(valueProp, defaultValue);
    const cascadeValueProps = {
      ...itemKeys,
      uncheckableItemValues,
      cascade,
      value: controlledValue,
      onCheck,
      onChange
    };

    const { value, handleCheck } = useCascadeValue(cascadeValueProps, flattenData);
    const { items, searchKeyword, handleSearch } = useSearch({
      labelKey,
      valueKey,
      childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues,
      onSearch
    });

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix('multi'));

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
