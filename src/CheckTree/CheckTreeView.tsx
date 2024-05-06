import React, { useEffect, useMemo } from 'react';
import { isNil, cloneDeep, isUndefined } from 'lodash';
import { List, AutoSizer, ListChildComponentProps, defaultItemSize } from '../internals/Windowing';
import CheckTreeNode from '../CheckTree/CheckTreeNode';
import { indentTreeNode } from '../Tree/utils';
import { useCustom, useClassNames, useEventCallback } from '../utils';
import { getPathTowardsItem, getKeyParentMap } from '../internals/Tree/utils';
import { onMenuKeyDown } from '../internals/Picker';
import { TreeView } from '../internals/Tree';
import { highlightLabel } from '../internals/utils';
import SearchBox from '../internals/SearchBox';
import {
  isEveryChildChecked,
  hasGrandchild,
  isAllSiblingNodeUncheckable,
  isEveryFirstLevelNodeUncheckable,
  getFormattedTree,
  getDisabledState,
  isNodeUncheckable
} from './utils';

import {
  formatVirtualizedTreeData,
  hasVisibleChildren,
  getActiveItem,
  isExpand
} from '../Tree/utils';
import useTreeSearch from '../Tree/hooks/useTreeSearch';
import useExpandTree from '../Tree/hooks/useExpandTree';
import useFocusTree from '../Tree/hooks/useFocusTree';
import useForceUpdate from '../Tree/hooks/useForceUpdate';
import useSerializeList from './hooks/useSerializeList';
import type { ItemDataType, RsRefForwardingComponent, ToArray, DataProps } from '../@types/common';
import type { TreeNode, TreeNodeMap, TreeBaseProps } from '../Tree/types';

/**
 * Props for the CheckTreeView component.
 */
export interface CheckTreeViewProps<V = (string | number)[]>
  extends TreeBaseProps<V>,
    DataProps<TreeNode> {
  /**
   * Selected value.
   */
  value?: V;

  /**
   * Whether using virtualized list.
   */
  virtualized?: boolean;

  /**
   * Virtualized list ref object.
   */
  listRef?: React.RefObject<any>;

  /**
   * Searchbox input ref object.
   */
  searchInputRef?: React.RefObject<HTMLInputElement>;

  /**
   * Whether display search input box.
   */
  searchable?: boolean;

  /**
   * Tree node cascade.
   */
  cascade?: boolean;

  /**
   * Set the option value for the check box not to be rendered.
   */
  uncheckableItemValues?: V;

  /**
   * Disabled tree node.
   */
  disabledItemValues?: ToArray<NonNullable<V>>;

  /**
   * Called when scrolling.
   */
  onScroll?: (event: React.SyntheticEvent) => void;

  /**
   * Called after the value has been changed.
   */
  onChange?: (value: V, event: React.SyntheticEvent) => void;
}

interface CheckTreeViewInnerProps<V = (string | number)[]> extends CheckTreeViewProps<V> {
  /**
   * Loading node values.
   */
  loadingNodeValues?: V;

  /**
   * Flattened nodes.
   */
  flattenedNodes?: TreeNodeMap;

  /**
   * Append child function.
   */
  appendChild: (
    node: TreeNode,
    getChildren: (node: TreeNode) => TreeNode[] | Promise<TreeNode[]>
  ) => void;

  /**
   * Callback function triggered when an item is focused.
   */
  onFocusItem?: (value?: TreeNode['value']) => void;
}

const CheckTreeView: RsRefForwardingComponent<'div', CheckTreeViewInnerProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'check-tree',
      childrenKey = 'children',
      cascade = true,
      data = [],
      defaultExpandAll = false,
      disabledItemValues = [],
      expandItemValues: controlledExpandItemValues,
      defaultExpandItemValues = [],
      height = 360,
      locale: overrideLocale,
      listProps,
      listRef,
      labelKey = 'label',
      style,
      searchKeyword,
      showIndentLine,
      searchable,
      searchInputRef,
      uncheckableItemValues = [],
      valueKey = 'value',
      virtualized = false,
      value,
      loadingNodeValues = [],
      flattenedNodes = {},
      appendChild,
      searchBy,
      getChildren,
      renderTreeIcon,
      renderTreeNode,
      onChange,
      onSearch,
      onSelect,
      onSelectItem,
      onScroll,
      onExpand,
      onFocusItem,
      ...rest
    } = props;

    const { rtl, locale } = useCustom('Picker', overrideLocale);
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const forceUpdate = useForceUpdate();
    const itemDataKeys = { childrenKey, labelKey, valueKey };

    const { expandItemValues, handleExpandTreeNode } = useExpandTree(data, {
      ...itemDataKeys,
      defaultExpandAll,
      defaultExpandItemValues,
      controlledExpandItemValues,
      onExpand,
      getChildren,
      appendChild
    });

    const { serializeListOnlyParent, unserializeList } = useSerializeList({
      cascade,
      valueKey,
      uncheckableItemValues
    });

    const handleSearchCallback = (value: string, _data, event: React.SyntheticEvent) => {
      onSearch?.(value, event);
    };

    const { filteredData, keyword, setFilteredData, handleSearch } = useTreeSearch<TreeNode>({
      ...itemDataKeys,
      callback: handleSearchCallback,
      data,
      searchKeyword,
      searchBy
    });

    const { focusItemValue, setFocusItemValue, onTreeKeydown, saveTreeNodeRef } = useFocusTree({
      ...itemDataKeys,
      rtl,
      filteredData,
      disabledItemValues,
      expandItemValues,
      searchKeyword: keyword,
      flattenedNodes,
      onFocused: onFocusItem,
      onExpand: handleExpandTreeNode
    });

    /**
     * Get formatted nodes for render tree
     * @params render - renderNode function. only used when virtualized setting false
     */
    const getFormattedNodes = (render?: any) => {
      if (virtualized) {
        return formatVirtualizedTreeData(flattenedNodes, filteredData, expandItemValues, {
          ...itemDataKeys,
          cascade,
          searchKeyword: keyword
        }).filter(item => item.visible);
      }

      return getFormattedTree(flattenedNodes, filteredData, { childrenKey, cascade })
        .map(node => render?.(node, 1))
        .filter(item => item);
    };

    const getTreeNodeProps = (nodeData: any, layer: number) => {
      const { expand, visible, checkState } = nodeData;
      const value = nodeData[valueKey];
      const allUncheckable = isAllSiblingNodeUncheckable(
        nodeData,
        flattenedNodes,
        uncheckableItemValues,
        valueKey
      );

      const label = keyword
        ? highlightLabel(nodeData[labelKey], { searchKeyword: keyword })
        : nodeData[labelKey];
      const disabled = getDisabledState(flattenedNodes, nodeData, { disabledItemValues, valueKey });
      const uncheckable = isNodeUncheckable(nodeData, { uncheckableItemValues, valueKey });
      const loading = loadingNodeValues.some(item => item === nodeData[valueKey]);
      const focus = focusItemValue === value;

      return {
        rtl,
        value,
        layer,
        label,
        expand,
        visible,
        loading,
        disabled,
        nodeData,
        checkState,
        uncheckable,
        allUncheckable,
        focus,
        renderTreeNode,
        renderTreeIcon,
        onSelect: handleSelect,
        onExpand: handleExpandTreeNode
      };
    };

    useEffect(() => {
      setFilteredData(data, keyword);
    }, [data, keyword, setFilteredData]);

    useEffect(() => {
      unserializeList(flattenedNodes, { key: 'check', value });
      forceUpdate();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cascade, value, flattenedNodes, forceUpdate]);

    const toggleUpChecked = useEventCallback(
      (nodes: TreeNodeMap, node: TreeNode, checked: boolean) => {
        const currentNode = node.refKey ? nodes[node.refKey] : null;
        if (cascade && currentNode) {
          if (!checked) {
            currentNode.check = checked;
            currentNode.checkAll = checked;
          } else {
            if (isEveryChildChecked(currentNode, { nodes, childrenKey })) {
              currentNode.check = true;
              currentNode.checkAll = true;
            } else {
              currentNode.check = false;
              currentNode.checkAll = false;
            }
          }
          if (currentNode.parent) {
            toggleUpChecked(nodes, currentNode.parent, checked);
          }
        }
      }
    );

    const toggleDownChecked = useEventCallback(
      (nodes: TreeNodeMap, node: TreeNode, isChecked: boolean) => {
        const currentNode = node.refKey ? nodes[node.refKey] : null;

        if (!currentNode) {
          return;
        }

        currentNode.check = isChecked;

        if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
          currentNode.checkAll = false;
        } else {
          currentNode.checkAll = isChecked;
          currentNode[childrenKey].forEach(child => {
            toggleDownChecked(nodes, child, isChecked);
          });
        }
      }
    );

    const toggleChecked = useEventCallback((node: TreeNode, isChecked: boolean) => {
      const nodes = cloneDeep(flattenedNodes);

      toggleDownChecked(nodes, node, isChecked);

      if (node.parent) {
        toggleUpChecked(nodes, node.parent, isChecked);
      }

      const values = serializeListOnlyParent(nodes, 'check');

      // filter uncheckableItemValues
      return values.filter(v => !uncheckableItemValues.includes(v));
    });

    // TODO-Doma
    // Replace `getKeyParentMap` with `getParentMap`
    const itemParentMap = useMemo(
      () =>
        getKeyParentMap(
          data,
          node => node[valueKey],
          node => node[childrenKey]
        ),
      [childrenKey, data, valueKey]
    );

    const handleSelect = useEventCallback((node: TreeNode, event: React.SyntheticEvent) => {
      const currentNode = node.refKey ? flattenedNodes[node.refKey] : null;

      if (!node || !currentNode) {
        return;
      }

      const selectedValues = toggleChecked(node, !currentNode.check);
      const path = getPathTowardsItem(node, item => itemParentMap.get(item[valueKey]));

      setFocusItemValue(node[valueKey]);

      onChange?.(selectedValues, event);
      onSelect?.(node as ItemDataType, selectedValues, event);
      onSelectItem?.(node, path);
    });

    const selectActiveItem = (event: React.KeyboardEvent<any>) => {
      if (isNil(focusItemValue)) return;
      const activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
      if (
        !isNodeUncheckable(activeItem, { uncheckableItemValues, valueKey }) &&
        activeItem !== null
      ) {
        handleSelect(activeItem, event);
      }
    };

    const handleTreeKeyDown = useEventCallback((event: React.KeyboardEvent<any>) => {
      onTreeKeydown(event);
      onMenuKeyDown(event, { enter: selectActiveItem });
    });

    const renderNode = (node: TreeNode, layer: number) => {
      const { visible, refKey, parent } = node;

      // when searching, all nodes should be expand
      const expand = isExpand(keyword, expandItemValues.includes(node[valueKey]));

      if (!visible) {
        return null;
      }

      const children = node[childrenKey];
      const hasChildren =
        isUndefined(keyword) || keyword.length === 0
          ? !!children
          : hasVisibleChildren(node, childrenKey);
      const nodeProps = {
        ...getTreeNodeProps(
          {
            ...node,
            /**
             * spread operator don't copy unenumerable properties
             * so we need to copy them manually
             */
            parent,
            expand
          },
          layer
        ),
        hasChildren
      };

      if (nodeProps.hasChildren) {
        layer += 1;

        const openClass = prefix('open');
        const childrenClass = merge(prefix('node-children'), {
          [openClass]: expand && hasChildren
        });

        const nodes = children || [];

        return (
          <div className={childrenClass} key={node[valueKey]}>
            <CheckTreeNode {...nodeProps} treeItemRef={ref => saveTreeNodeRef(ref, refKey)} />
            <div className={prefix('group')} role="group">
              {nodes.map(child => renderNode(child, layer))}
              {showIndentLine && (
                <span
                  className={prefix('indent-line')}
                  style={indentTreeNode(rtl, layer - 1, true)}
                />
              )}
            </div>
          </div>
        );
      }

      return (
        <CheckTreeNode
          key={node[valueKey]}
          treeItemRef={ref => saveTreeNodeRef(ref, refKey)}
          {...nodeProps}
        />
      );
    };

    const renderVirtualListNode = ({ index, style, data }: ListChildComponentProps) => {
      const node = data[index];
      const { layer, refKey, visible, hasChildren, parent } = node;
      const expand = isExpand(keyword, expandItemValues.includes(node[valueKey]));

      const nodeProps = {
        ...getTreeNodeProps(
          {
            ...node,
            /**
             * spread operator don't copy unenumerable properties
             * so we need to copy them manually
             */
            parent,
            expand
          },
          layer
        ),
        hasChildren
      };

      return (
        visible && (
          <CheckTreeNode style={style} ref={ref => saveTreeNodeRef(ref, refKey)} {...nodeProps} />
        )
      );
    };

    const classes = merge(
      className,
      withClassPrefix({
        'without-children': !hasGrandchild(data, childrenKey),
        virtualized
      })
    );

    const formattedNodes = getFormattedNodes(renderNode);

    const treeNodesClass = merge(prefix('root'), {
      [prefix('all-uncheckable')]: isEveryFirstLevelNodeUncheckable(
        flattenedNodes,
        uncheckableItemValues,
        valueKey
      )
    });

    return (
      <Component ref={ref} className={classes} style={{ height, ...style }}>
        {searchable ? (
          <SearchBox
            placeholder={locale.searchPlaceholder}
            onChange={handleSearch}
            value={keyword}
            inputRef={searchInputRef}
          />
        ) : null}

        {keyword && formattedNodes.length === 0 ? (
          <div className={prefix('empty')}>{locale.noResultsText}</div>
        ) : null}

        <TreeView
          {...rest}
          multiselectable
          treeRootClassName={treeNodesClass}
          onScroll={onScroll}
          onKeyDown={handleTreeKeyDown}
        >
          {virtualized ? (
            <AutoSizer defaultHeight={height} style={{ width: 'auto', height: 'auto' }}>
              {({ height }) => (
                <List
                  ref={listRef}
                  height={height}
                  itemSize={defaultItemSize}
                  itemCount={formattedNodes.length}
                  itemData={formattedNodes}
                  {...listProps}
                >
                  {renderVirtualListNode}
                </List>
              )}
            </AutoSizer>
          ) : (
            formattedNodes
          )}
        </TreeView>
      </Component>
    );
  }
);

CheckTreeView.displayName = 'CheckTreeView';

export default CheckTreeView;
