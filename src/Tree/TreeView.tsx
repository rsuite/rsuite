import React, { useEffect, useMemo, useRef } from 'react';
import isNil from 'lodash/isNil';
import TreeViewNode from './TreeNode';
import IndentLine from './IndentLine';
import useTreeSearch from './hooks/useTreeSearch';
import useTreeDrag from './hooks/useTreeDrag';
import useFocusTree from './hooks/useFocusTree';
import useVirtualizedTreeData from './hooks/useVirtualizedTreeData';
import useVirtualTreeFocus from './hooks/useVirtualTreeFocus';
import useTreeNodeProps from './hooks/useTreeNodeProps';
import SearchBox from '@/internals/SearchBox';
import Box from '@/internals/Box';
import {
  List,
  AutoSizer,
  ListChildComponentProps,
  defaultItemSize,
  type ListHandle
} from '@/internals/Windowing';
import { forwardRef, mergeRefs } from '@/internals/utils';
import VirtualizedTreeNode, { NodeRendererProvider } from '@/internals/Tree/VirtualizedTreeNode';
import { getPathTowardsItem, getKeyParentMap } from '@/internals/Tree/utils';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { isExpand, hasVisibleChildren, getActiveItem } from './utils';
import { onMenuKeyDown } from '@/internals/Picker';
import { TreeView as BaseTreeView } from '@/internals/Tree';
import { useTreeContextProps } from '@/internals/Tree/TreeProvider';
import type { DataProps, ToArray, WithAsPropsWithoutChildren } from '@/internals/types';
import type { TreeNode, TreeNodeMap } from '@/internals/Tree/types';
import type { TreeViewBaseProps, TreeDragProps } from './types';

export interface TreeViewProps<V = number | string | null>
  extends TreeViewBaseProps<V, TreeNode>,
    DataProps<TreeNode> {
  /**
   * Selected value.
   */
  value?: V;

  /**
   * Whether display search input box.
   */
  searchable?: boolean;

  /**
   * Disabled tree node.
   */
  disabledItemValues?: ToArray<NonNullable<V>>;

  /**
   * Virtualized list ref object.
   */
  listRef?: React.RefObject<ListHandle | null>;

  /**
   * Searchbox input ref object.
   */
  searchInputRef?: React.RefObject<HTMLInputElement | null>;

  /**
   * Called when scrolling.
   */
  onScroll?: (event: React.SyntheticEvent) => void;
}

export type WithTreeDragProps<P> = P & TreeDragProps;

/**
 * Props for the TreeViewInner component.
 */
/**
 * Represents the props for the TreeView component.
 */
interface TreeViewInnerProps<V = string | number | null>
  extends Omit<WithTreeDragProps<TreeViewProps<V>>, 'onExpand'>,
    WithAsPropsWithoutChildren {
  /** Current owner data, before asynchronous tree-data synchronization. */
  sourceData?: TreeNode[];
  /** Whether the displayed data belongs to the current owner dataset. */
  dataReady?: boolean;
  /**
   * An array of values representing the loading nodes.
   */
  loadingNodeValues?: V[];

  /**
   * A collection of localized strings.
   */
  locale?: Record<string, string>;

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
  onExpand?: (nodeData: TreeNode, expanded?: boolean) => void;
}

const TreeView = forwardRef<'div', TreeViewInnerProps>((props, ref) => {
  const {
    as,
    data = [],
    sourceData,
    dataReady = true,
    style,
    showIndentLine,
    value: valueProp,
    locale: overrideLocale,
    height = 360,
    className,
    searchable = false,
    classPrefix = 'tree',
    searchKeyword,
    searchBy,
    draggable,
    disabledItemValues = [],
    loadingNodeValues = [],
    flattenedNodes = {},
    listProps,
    listRef,
    searchInputRef,
    expandItemValues = [],
    onSearch,
    onSelect,
    onSelectItem,
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

  const { getLocale } = useCustom();
  const { searchPlaceholder, noResultsText } = getLocale('Combobox', overrideLocale);
  const { valueKey, childrenKey, scrollShadow, virtualized } = useTreeContextProps();
  const { prefix, merge, withPrefix } = useStyles(classPrefix);

  const handleSearchCallback = useEventCallback(
    (value: string, _data, event: React.SyntheticEvent) => {
      onSearch?.(value, event);
    }
  );

  const { filteredData, keyword, setFilteredData, handleSearch } = useTreeSearch<TreeNode>({
    callback: handleSearchCallback,
    searchKeyword,
    data,
    searchBy
  });

  const transformation = useVirtualizedTreeData(flattenedNodes, filteredData, {
    expandItemValues,
    searchKeyword: keyword
  });
  const virtualizedNodes = virtualized ? transformation().filter(n => n.visible) : [];
  const virtualizedListRef = useRef<ListHandle>(null);
  const mergedListRef = useMemo(
    () => mergeRefs(mergeRefs(virtualizedListRef, listRef), listProps?.ref),
    [listRef, listProps?.ref]
  );
  const { focusNode, handleItemsRendered: notifyItemsRendered } = useVirtualTreeFocus({
    nodes: virtualizedNodes,
    sourceData,
    valueKey,
    childrenKey,
    disabledItemValues,
    listRef: virtualizedListRef,
    getTree: () => treeViewRef.current,
    getNode: refKey => treeNodesRefs[refKey],
    onCancel: sourceKey => {
      const source = virtualizedNodes.find(node => node.refKey === sourceKey);
      setFocusItemValue(source?.[valueKey] ?? null);
      onFocusItem?.(source?.[valueKey]);
    }
  });
  const handleItemsRendered = props => {
    notifyItemsRendered();
    listProps?.onItemsRendered?.(props);
  };

  const getFormattedNodes = (render?: any) => {
    if (virtualized) {
      return virtualizedNodes;
    }
    return filteredData.map((dataItem, index) => render?.(dataItem, index, 1)).filter(n => n);
  };

  useEffect(() => {
    setFilteredData(data, keyword);
  }, [data, keyword, setFilteredData]);

  // TODO-Doma
  // Replace `getKeyParentMap` with `getParentMap`
  const itemParentMap = useMemo(
    () =>
      getKeyParentMap(
        data,
        node => node[valueKey],
        node => node[childrenKey] as TreeNode[]
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
    dataReady:
      dataReady &&
      filteredData === data &&
      (searchKeyword === undefined || searchKeyword === keyword),
    filteredData,
    disabledItemValues,
    expandItemValues,
    searchKeyword: keyword,
    flattenedNodes,
    focusNode: virtualized ? focusNode : undefined,
    onFocused: onFocusItem,
    onExpand
  });

  const { dragNode, dragOverNodeKey, dropNodePosition, dragEvents } = useTreeDrag<TreeNode>({
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

  const getTreeNodeProps = useTreeNodeProps({
    value: valueProp,
    disabledItemValues,
    loadingNodeValues,
    focusItemValue,
    keyword,
    dragNode,
    dragOverNodeKey,
    dropNodePosition
  });

  const handleSelect = useEventCallback((nodeData: any, event: React.SyntheticEvent) => {
    if (!nodeData) {
      return;
    }
    const nextValue = nodeData[valueKey];
    const path = getPathTowardsItem(nodeData, item => itemParentMap.get(item[valueKey]));

    if (virtualized) focusNode(nodeData);
    setFocusItemValue(nextValue);
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
    const { visible } = node;

    if (!visible) {
      return null;
    }

    const children = node[childrenKey];
    const expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));
    const hasChildren = keyword ? hasVisibleChildren(node, childrenKey) : Boolean(children);

    const nodeProps = {
      ...getTreeNodeProps(node, layer, index),
      ...dragEvents,
      expanded,
      draggable,
      onExpand,
      onSelect: handleSelect,
      hasChildren
    };

    if (hasChildren) {
      layer += 1;

      const childClassName = merge(prefix('node-children'), {
        [prefix('node-expanded')]: expanded
      });

      return (
        <div className={childClassName} key={node[valueKey]}>
          <TreeViewNode {...nodeProps} ref={ref => saveTreeNodeRef(ref, node.refKey)} />
          <div className={prefix('group')} role="group">
            {children?.map((child, i) => renderNode(child, i, layer))}
            {showIndentLine && <IndentLine />}
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
    const { layer, visible, hasChildren } = node;

    const expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));

    if (!visible) {
      return null;
    }

    const treeNodeProps = {
      ...getTreeNodeProps(node, layer),
      ...dragEvents,
      expanded,
      style,
      onExpand,
      onSelect: handleSelect,
      hasChildren
    };

    return (
      visible && <TreeViewNode ref={ref => saveTreeNodeRef(ref, node.refKey)} {...treeNodeProps} />
    );
  };

  const classes = merge(withPrefix({ virtualized }), className);
  const formattedNodes = getFormattedNodes(renderNode);

  return (
    <Box as={as} ref={ref} className={classes} style={style}>
      {searchable ? (
        <SearchBox
          placeholder={searchPlaceholder}
          onChange={handleSearch}
          value={keyword}
          inputRef={searchInputRef}
        />
      ) : null}

      {keyword && formattedNodes.length === 0 ? (
        <div className={prefix('empty')}>{noResultsText}</div>
      ) : null}

      <BaseTreeView
        {...rest}
        ref={treeViewRef}
        treeRootClassName={prefix('root')}
        onScroll={onScroll}
        onKeyDown={handleTreeKeyDown}
        className={prefix('view')}
        height={height}
      >
        {virtualized ? (
          <NodeRendererProvider value={renderVirtualListNode}>
            <AutoSizer
              defaultHeight={height}
              style={{ width: 'auto', height: 'auto' }}
              className={prefix('virt-auto-sizer')}
            >
              {({ height }) => (
                <List
                  height={height}
                  itemSize={defaultItemSize}
                  itemCount={formattedNodes.length}
                  itemData={formattedNodes}
                  itemKey={(index, nodes) => nodes[index].refKey}
                  className={prefix('virt-list')}
                  scrollShadow={scrollShadow}
                  {...listProps}
                  ref={mergedListRef}
                  onItemsRendered={handleItemsRendered}
                >
                  {VirtualizedTreeNode}
                </List>
              )}
            </AutoSizer>
          </NodeRendererProvider>
        ) : (
          formattedNodes
        )}
      </BaseTreeView>
    </Box>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
