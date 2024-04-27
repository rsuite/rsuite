import React, { useEffect, useMemo } from 'react';
import { isUndefined, isNil } from 'lodash';
import {
  List,
  AutoSizer,
  ListChildComponentProps,
  defaultItemSize,
  type ListHandle
} from '../internals/Windowing';
import TreeViewNode from '../Tree/TreeNode';
import { indentTreeNode } from '../Tree/utils';
import { getPathTowardsItem, getKeyParentMap } from '../internals/Tree/utils';
import { stringifyReactNode } from '../internals/utils';
import {
  useClassNames,
  useCustom,
  useEventCallback,
  TREE_NODE_DROP_POSITION,
  shallowEqual as equal
} from '../utils';

import {
  isExpand,
  hasVisibleChildren,
  getDragNodeKeys,
  calDropNodePosition,
  createDragTreeDataFunction,
  removeDragPreview,
  createDragPreview,
  getActiveItem,
  formatVirtualizedTreeData
} from './utils';
import { onMenuKeyDown } from '../internals/Picker';
import { TreeView as BaseTreeView } from '../internals/Tree';
import useTreeSearch from './hooks/useTreeSearch';
import useTreeDrag from './hooks/useTreeDrag';
import useFocusTree from './hooks/useFocusTree';
import useExpandTree from './hooks/useExpandTree';
import SearchBox from '../internals/SearchBox';
import { RsRefForwardingComponent, DataProps, ToArray } from '../@types/common';
import type { TreeNode, TreeNodeMap, DropData, TreeBaseProps, TreeDragProps } from './types';

export interface TreeViewProps<V = number | string | null>
  extends TreeBaseProps<V, TreeNode>,
    DataProps<TreeNode>,
    TreeDragProps {
  /**
   * Selected value.
   */
  value?: V;

  /**
   * Tree node cascade.
   */
  cascade?: boolean;

  /**
   * Whether display search input box.
   */
  searchable?: boolean;

  /**
   * Whether using virtualized list.
   */
  virtualized?: boolean;

  /**
   * Disabled tree node.
   */
  disabledItemValues?: ToArray<NonNullable<V>>;

  /**
   * Virtualized list ref object.
   */
  listRef?: React.RefObject<ListHandle>;

  /**
   * Searchbox input ref object.
   */
  searchInputRef?: React.RefObject<HTMLInputElement>;

  /**
   * Called when scrolling.
   */
  onScroll?: (event: React.SyntheticEvent) => void;

  /**
   * Called after the value has been changed.
   */
  onChange?: (value: V, event: React.SyntheticEvent) => void;
}

/**
 * Props for the TreeViewInner component.
 */
interface TreeViewInnerProps<V = string | number | null> extends TreeViewProps<V> {
  /**
   * Loading node values.
   */
  loadingNodeValues?: V[];

  /**
   * Flattened nodes.
   */
  flattenedNodes?: TreeNodeMap;

  /**
   * Append child function.
   *
   * @param node - The node to append child to.
   * @param getChildren - A function that returns the children of the node.
   */
  appendChild: (
    node: TreeNode,
    getChildren: (node: TreeNode) => TreeNode[] | Promise<TreeNode[]>
  ) => void;

  /**
   * Callback function triggered when an item is focused.
   */
  onFocusItem?: (value?: V) => void;
}

const TreeView: RsRefForwardingComponent<'div', TreeViewInnerProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      as: Component = 'div',
      data = [],
      style,
      showIndentLine,
      value: valueProp,
      locale: overrideLocale,
      height = 360,
      className,
      searchable = false,
      virtualized = false,
      classPrefix = 'tree',
      searchKeyword,
      searchBy,
      labelKey = 'label',
      valueKey = 'value',
      childrenKey = 'children',
      draggable,
      defaultExpandAll = false,
      disabledItemValues = [],
      expandItemValues: controlledExpandItemValues,
      defaultExpandItemValues = [],
      loadingNodeValues = [],
      flattenedNodes = {},
      listProps,
      listRef,
      searchInputRef,
      appendChild,
      getChildren,
      renderTreeIcon,
      renderTreeNode,
      onSearch,
      onSelect,
      onSelectItem,
      onChange,
      onDragEnd,
      onDragStart,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
      onExpand,
      onFocusItem,
      onScroll,
      ...rest
    } = props;

    const { rtl, locale } = useCustom('Picker', overrideLocale);
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

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const handleSearchCallback = (value: string, _data, event: React.SyntheticEvent) => {
      onSearch?.(value, event);
    };

    const { filteredData, keyword, setFilteredData, handleSearch } = useTreeSearch<TreeNode>({
      ...itemDataKeys,
      callback: handleSearchCallback,
      searchKeyword,
      data,
      searchBy
    });

    const {
      dragNodeKeys,
      dragOverNodeKey,
      dragNode,
      dropNodePosition,
      setDragNodeKeys,
      setDragOverNodeKey,
      setDragNode,
      setDropNodePosition
    } = useTreeDrag<TreeNode>();

    const getFormattedNodes = (render?: any) => {
      if (virtualized) {
        return formatVirtualizedTreeData(flattenedNodes, filteredData, expandItemValues, {
          searchKeyword: keyword
        }).filter(n => n.visible);
      }
      return filteredData.map((dataItem, index) => render?.(dataItem, index, 1));
    };

    useEffect(() => {
      setFilteredData(data, keyword);
    }, [data, keyword, setFilteredData]);

    const getDropData = (nodeData: any) => {
      const dragParams = { dragNode, dropNode: nodeData, dropNodePosition };
      const itemKeys = { valueKey, childrenKey };

      return {
        ...dragParams,
        createUpdateDataFunction: createDragTreeDataFunction(dragParams, itemKeys)
      };
    };

    const getTreeNodeProps = (node: any, layer: number, index?: number) => {
      const { DRAG_OVER, DRAG_OVER_TOP, DRAG_OVER_BOTTOM } = TREE_NODE_DROP_POSITION;
      const { expand, visible } = node;

      const draggingNode = dragNode ?? {};
      const value = node[valueKey];
      const label = node[labelKey];
      const children = node[childrenKey];
      const dragging = equal(value, draggingNode[valueKey]);
      const dragOver = equal(value, dragOverNodeKey) && dropNodePosition === DRAG_OVER;
      const dragOverTop = equal(value, dragOverNodeKey) && dropNodePosition === DRAG_OVER_TOP;
      const dragOverBottom = equal(value, dragOverNodeKey) && dropNodePosition === DRAG_OVER_BOTTOM;
      const disabled = disabledItemValues.some(disabledItem => equal(disabledItem, value));
      const loading = loadingNodeValues.some(item => equal(item, value));
      const active = equal(value, valueProp);
      const focus = equal(value, focusItemValue);

      return {
        rtl,
        value,
        label,
        index,
        layer,
        loading,
        expand,
        active,
        focus,
        visible,
        draggable,
        dragging,
        children,
        nodeData: node,
        disabled,
        dragOver,
        dragOverTop,
        dragOverBottom,
        onSelect: handleSelect,
        onDragStart: handleDragStart,
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDragEnd: handleDragEnd,
        onDrop: handleDrop,
        onExpand: handleExpandTreeNode,
        renderTreeNode,
        renderTreeIcon
      };
    };

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

    const {
      focusItemValue,
      setFocusItemValue,
      onTreeKeydown,
      treeNodesRefs,
      saveTreeNodeRef,
      treeViewRef
    } = useFocusTree({
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

    const handleSelect = useEventCallback((nodeData: any, event: React.SyntheticEvent) => {
      if (!nodeData) {
        return;
      }
      const nextValue = nodeData[valueKey];
      const path = getPathTowardsItem(nodeData, item => itemParentMap.get(item[valueKey]));

      setFocusItemValue(nextValue);
      onChange?.(nextValue, event);
      onSelect?.(nodeData, nextValue, event);
      onSelectItem?.(nodeData, path);
    });

    const handleDragStart = useEventCallback((nodeData: any, event: React.DragEvent) => {
      if (draggable) {
        const dragMoverNode = createDragPreview(
          stringifyReactNode(nodeData[labelKey]),
          prefix('drag-preview')
        );
        event.dataTransfer?.setDragImage(dragMoverNode, 0, 0);
        setDragNodeKeys(getDragNodeKeys(nodeData, childrenKey, valueKey));
        setDragNode(flattenedNodes[nodeData.refKey]);
        onDragStart?.(nodeData, event);
      }
    });

    const handleDragEnter = useEventCallback((nodeData: any, event: React.DragEvent) => {
      if (dragNodeKeys.some(d => equal(d, nodeData[valueKey]))) {
        return;
      }

      if (dragNode) {
        setDragOverNodeKey(nodeData[valueKey]);
        setDropNodePosition(calDropNodePosition(event, treeNodesRefs[nodeData.refKey]));
      }
      onDragEnter?.(nodeData, event);
    });

    const handleDragOver = useEventCallback((nodeData: any, event: React.DragEvent) => {
      if (dragNodeKeys.some(d => equal(d, nodeData[valueKey]))) {
        event.dataTransfer.dropEffect = 'none';
        return;
      }

      if (dragNode && equal(nodeData[valueKey], dragOverNodeKey)) {
        const lastDropNodePosition = calDropNodePosition(event, treeNodesRefs[nodeData.refKey]);
        if (lastDropNodePosition === dropNodePosition) return;

        setDropNodePosition(lastDropNodePosition);
      }

      onDragOver?.(nodeData, event);
    });

    const handleDragLeave = useEventCallback((nodeData: any, event: React.DragEvent) => {
      onDragLeave?.(nodeData, event);
    });

    const handleDragEnd = useEventCallback((nodeData: any, event: React.DragEvent) => {
      removeDragPreview();
      setDragNode(null);
      setDragNodeKeys([]);
      setDragOverNodeKey(null);
      onDragEnd?.(nodeData, event);
    });

    const handleDrop = useEventCallback((nodeData: any, event: React.DragEvent) => {
      if (dragNodeKeys.some(d => equal(d, nodeData[valueKey]))) {
        console.error('Cannot drag a node to itself and its children');
      } else {
        const dropData = getDropData(nodeData) as DropData<Record<string, any>>;
        onDrop?.(dropData, event);
      }
      removeDragPreview();
      setDragNode(null);
      setDragNodeKeys([]);
      setDragOverNodeKey(null);
    });

    const selectActiveItem = useEventCallback((event: React.SyntheticEvent) => {
      if (isNil(focusItemValue)) return;
      const activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
      handleSelect(activeItem, event);
    });

    const handleTreeKeyDown = useEventCallback((event: React.KeyboardEvent<any>) => {
      onTreeKeydown(event);
      onMenuKeyDown(event, { enter: selectActiveItem });
    });

    const renderNode = (node: any, index: number, layer: number) => {
      if (!node.visible) {
        return null;
      }

      const children = node[childrenKey];
      const expand = isExpand(keyword, expandItemValues.includes(node[valueKey]));
      const visibleChildren =
        isUndefined(keyword) || keyword.length === 0
          ? !!children
          : hasVisibleChildren(node, childrenKey);

      const nodeProps = {
        ...getTreeNodeProps({ ...node, expand }, layer, index),
        hasChildren: visibleChildren
      };

      if (nodeProps.hasChildren) {
        layer += 1;

        const openClass = prefix('open');
        const childrenClass = merge(prefix('node-children'), {
          [openClass]: expand && visibleChildren
        });

        const nodes = children || [];

        return (
          <div className={childrenClass} key={node[valueKey]}>
            <TreeViewNode {...nodeProps} ref={ref => saveTreeNodeRef(ref, node.refKey)} />
            <div className={prefix('group')} role="group">
              {nodes.map((child, i) => renderNode(child, i, layer))}
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
        <TreeViewNode
          ref={ref => saveTreeNodeRef(ref, node.refKey)}
          key={node[valueKey]}
          {...nodeProps}
        />
      );
    };

    const renderVirtualListNode = ({ index, style, data }: ListChildComponentProps) => {
      const node = data[index];
      const { layer, visible } = node;

      const expand = isExpand(keyword, expandItemValues.includes(node[valueKey]));
      if (!node.visible) {
        return null;
      }

      const nodeProps = {
        ...getTreeNodeProps({ ...node, expand }, layer),
        style,
        hasChildren: node.hasChildren
      };

      return (
        visible && <TreeViewNode ref={ref => saveTreeNodeRef(ref, node.refKey)} {...nodeProps} />
      );
    };

    const classes = merge(withClassPrefix({ virtualized }), className);
    const formattedNodes = getFormattedNodes(renderNode);

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
        <BaseTreeView
          {...rest}
          ref={treeViewRef}
          treeRootClassName={prefix('root')}
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
        </BaseTreeView>
      </Component>
    );
  }
);

TreeView.displayName = 'TreeView';

export default TreeView;
