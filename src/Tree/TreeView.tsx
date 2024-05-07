import React, { useEffect, useMemo } from 'react';
import { isUndefined, isNil } from 'lodash';
import {
  List,
  AutoSizer,
  ListChildComponentProps,
  defaultItemSize,
  type ListHandle
} from '../internals/Windowing';
import TreeViewNode, { DragStatus } from '../Tree/TreeNode';
import { indentTreeNode } from '../Tree/utils';
import { getPathTowardsItem, getKeyParentMap } from '../internals/Tree/utils';
import {
  useClassNames,
  useCustom,
  useEventCallback,
  TREE_NODE_DROP_POSITION,
  shallowEqual as equal
} from '../utils';

import { isExpand, hasVisibleChildren, getActiveItem, formatVirtualizedTreeData } from './utils';
import { onMenuKeyDown } from '../internals/Picker';
import { TreeView as BaseTreeView } from '../internals/Tree';
import useTreeSearch from './hooks/useTreeSearch';
import useTreeDrag from './hooks/useTreeDrag';
import useFocusTree from './hooks/useFocusTree';
import SearchBox from '../internals/SearchBox';
import { highlightLabel } from '../internals/utils';
import { RsRefForwardingComponent, DataProps, ToArray } from '../@types/common';
import type { TreeNode, TreeNodeMap, TreeViewBaseProps, TreeDragProps } from './types';

export interface TreeViewProps<V = number | string | null>
  extends TreeViewBaseProps<V, TreeNode>,
    DataProps<TreeNode>,
    TreeDragProps {
  /**
   * Selected value.
   */
  value?: V;

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
/**
 * Represents the props for the TreeView component.
 */
interface TreeViewInnerProps<V = string | number | null> extends TreeViewProps<V> {
  /**
   * An array of values representing the loading nodes.
   */
  loadingNodeValues?: V[];

  /**
   * A map of flattened nodes.
   */
  flattenedNodes?: TreeNodeMap;

  /**
   * A callback function that is called when an item in the tree receives focus.
   *
   * @param value - The value of the focused item.
   */
  onFocusItem?: (value?: V) => void;

  /**
   * A callback function that is called when a node is expanded.
   *
   * @param nodeData - The data of the expanded node.
   */
  onExpand?: (nodeData: TreeNode) => void;
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
      disabledItemValues = [],
      loadingNodeValues = [],
      flattenedNodes = {},
      listProps,
      listRef,
      searchInputRef,
      expandItemValues = [],
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

    const getFormattedNodes = (render?: any) => {
      if (virtualized) {
        return formatVirtualizedTreeData(flattenedNodes, filteredData, expandItemValues, {
          searchKeyword: keyword
        }).filter(n => n.visible);
      }
      return filteredData.map((dataItem, index) => render?.(dataItem, index, 1)).filter(n => n);
    };

    useEffect(() => {
      setFilteredData(data, keyword);
    }, [data, keyword, setFilteredData]);

    const getTreeNodeProps = (node: any, layer: number, index?: number) => {
      const { DRAG_OVER, DRAG_OVER_TOP, DRAG_OVER_BOTTOM } = TREE_NODE_DROP_POSITION;
      const { expand, visible } = node;

      const draggingNode = dragNode ?? {};
      const value = node[valueKey];
      const label = keyword
        ? highlightLabel(node[labelKey], { searchKeyword: keyword })
        : node[labelKey];

      const children = node[childrenKey];
      const dragging = equal(value, draggingNode[valueKey]);

      let dragStatus: DragStatus | undefined;

      if (equal(value, dragOverNodeKey)) {
        switch (dropNodePosition) {
          case DRAG_OVER:
            dragStatus = 'drag-over';
            break;
          case DRAG_OVER_TOP:
            dragStatus = 'drag-over-top';
            break;
          case DRAG_OVER_BOTTOM:
            dragStatus = 'drag-over-bottom';
            break;
        }
      }

      const disabled = disabledItemValues.some(disabledItem => equal(disabledItem, value));
      const loading = loadingNodeValues.some(item => equal(item, value));
      const active = equal(value, valueProp);
      const focus = equal(value, focusItemValue);

      return {
        ...dragEvents,
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
        children,
        nodeData: node,
        disabled,
        draggable,
        dragging,
        dragStatus,
        onExpand,
        onSelect: handleSelect,
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
      onExpand
    });

    const { dragNode, dragOverNodeKey, dropNodePosition, dragEvents } = useTreeDrag<TreeNode>({
      ...itemDataKeys,
      flattenedNodes,
      treeNodesRefs,
      draggable,
      onDragStart,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDragEnd,
      onDrop,
      prefix
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
      <Component ref={ref} className={classes} style={style}>
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

        <BaseTreeView
          {...rest}
          ref={treeViewRef}
          treeRootClassName={prefix('root')}
          onScroll={onScroll}
          onKeyDown={handleTreeKeyDown}
          className={prefix('view')}
          style={virtualized ? undefined : { height }}
        >
          {virtualized ? (
            <AutoSizer
              defaultHeight={height}
              style={{ width: 'auto', height: 'auto' }}
              className={prefix('virt-auto-sizer')}
            >
              {({ height }) => (
                <List
                  ref={listRef}
                  height={height}
                  itemSize={defaultItemSize}
                  itemCount={formattedNodes.length}
                  itemData={formattedNodes}
                  className={prefix('virt-list')}
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
