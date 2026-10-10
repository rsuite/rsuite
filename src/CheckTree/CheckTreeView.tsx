import React, { useEffect, useMemo, useRef } from 'react';
import isNil from 'lodash/isNil';
import CheckTreeNode from './CheckTreeNode';
import IndentLine from '../Tree/IndentLine';
import SearchBox from '@/internals/SearchBox';
import Box from '@/internals/Box';
import useTreeSearch from '../Tree/hooks/useTreeSearch';
import useFocusTree from '../Tree/hooks/useFocusTree';
import useVirtualizedTreeData from '../Tree/hooks/useVirtualizedTreeData';
import useVirtualTreeFocus from '../Tree/hooks/useVirtualTreeFocus';
import useTreeCheckState from './hooks/useTreeCheckState';
import useTreeNodeProps from './hooks/useTreeNodeProps';
import { forwardRef, mergeRefs } from '@/internals/utils';
import VirtualizedTreeNode, { NodeRendererProvider } from '@/internals/Tree/VirtualizedTreeNode';
import {
  List,
  AutoSizer,
  ListChildComponentProps,
  defaultItemSize,
  type ListHandle
} from '@/internals/Windowing';
import { useStyles, useCustom, useEventCallback } from '@/internals/hooks';
import { getPathTowardsItem, getKeyParentMap } from '@/internals/Tree/utils';
import { onMenuKeyDown } from '@/internals/Picker';
import { TreeView } from '@/internals/Tree';
import {
  hasGrandchild,
  isEveryFirstLevelNodeUncheckable,
  getFormattedTree,
  isNodeUncheckable
} from './utils';
import { hasVisibleChildren, getActiveItem, isExpand } from '../Tree/utils';
import { useTreeContextProps } from '@/internals/Tree/TreeProvider';
import type { TreeNode, TreeNodeMap } from '@/internals/Tree/types';
import type { WithAsProps, Option, ToArray, DataProps } from '@/internals/types';
import type { TreeViewBaseProps } from '../Tree/types';

/**
 * Props for the CheckTreeView component.
 */
export interface CheckTreeViewProps<V = (string | number)[]>
  extends TreeViewBaseProps<V>,
    DataProps<TreeNode> {
  /**
   * Selected value.
   */
  value?: V;

  /**
   * Virtualized list ref object.
   */
  listRef?: React.RefObject<any>;

  /**
   * Searchbox input ref object.
   */
  searchInputRef?: React.RefObject<HTMLInputElement | null>;

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

interface CheckTreeViewInnerProps<V = (string | number)[]>
  extends WithAsProps,
    Omit<CheckTreeViewProps<V>, 'onExpand'> {
  disabled?: boolean;

  /** Current owner data, before asynchronous tree-data synchronization. */
  sourceData?: TreeNode[];
  /**
   * Loading node values.
   */
  loadingNodeValues?: V;

  /**
   * Flattened nodes.
   */
  flattenedNodes?: TreeNodeMap;

  /**
   * A collection of localized strings.
   */
  locale?: Record<string, string>;

  /**
   * Callback function triggered when an item is focused.
   */
  onFocusItem?: (value?: TreeNode['value']) => void;

  /**
   * A callback function that is called when a node is expanded.
   *
   * @param nodeData - The data of the expanded node.
   */
  onExpand?: (nodeData: TreeNode, expanded?: boolean) => void;
}

const CheckTreeView = forwardRef<'div', CheckTreeViewInnerProps>((props, ref) => {
  const {
    as,
    disabled,
    className,
    classPrefix = 'check-tree',
    cascade = true,
    data = [],
    sourceData,
    disabledItemValues = [],
    expandItemValues = [],
    height = 360,
    locale: overrideLocale,
    listProps,
    listRef,
    style,
    searchKeyword,
    showIndentLine,
    searchable,
    searchInputRef,
    uncheckableItemValues = [],
    loadingNodeValues = [],
    flattenedNodes = {},
    searchBy,
    onChange,
    onSearch,
    onSelect,
    onSelectItem,
    onScroll,
    onExpand,
    onFocusItem,
    ...rest
  } = props;

  const { getLocale } = useCustom();
  const { searchPlaceholder, noResultsText } = getLocale('Combobox', overrideLocale);
  const { childrenKey, valueKey, virtualized, scrollShadow } = useTreeContextProps();
  const { prefix, merge, withPrefix } = useStyles(classPrefix);

  const { getCheckedValues } = useTreeCheckState({
    cascade,
    flattenedNodes,
    uncheckableItemValues,
    disabledItemValues
  });

  const handleSearchCallback = (value: string, _data, event: React.SyntheticEvent) => {
    onSearch?.(value, event);
  };

  const { filteredData, keyword, setFilteredData, handleSearch } = useTreeSearch<TreeNode>({
    callback: handleSearchCallback,
    data,
    searchKeyword,
    searchBy
  });

  const transformation = useVirtualizedTreeData(flattenedNodes, filteredData, {
    cascade,
    expandItemValues,
    searchKeyword: keyword,
    disabledItemValues
  });
  const virtualizedNodes = virtualized ? transformation().filter(item => item.visible) : [];
  const virtualizedListRef = useRef<ListHandle>(null);
  const mergedListRef = useMemo(
    () => mergeRefs(mergeRefs(virtualizedListRef, listRef), listProps?.ref),
    [listRef, listProps?.ref]
  );
  const { focusNode, handleItemsRendered: notifyItemsRendered } = useVirtualTreeFocus({
    nodes: virtualizedNodes,
    sourceData,
    searchKeyword: searchKeyword ?? keyword,
    valueKey,
    childrenKey,
    disabledItemValues,
    listRef: virtualizedListRef,
    getTree: () => treeViewRef.current,
    getNode: refKey => treeNodesRefs[refKey],
    onCancel: sourceKey => {
      const source = virtualizedNodes.find(node => node.refKey === sourceKey);
      const nextFocusValue = source?.[valueKey];
      setFocusItemValue(nextFocusValue ?? null);
      onFocusItem?.(nextFocusValue);
    }
  });
  const handleItemsRendered = props => {
    notifyItemsRendered();
    listProps?.onItemsRendered?.(props);
  };

  const {
    focusItemValue,
    setFocusItemValue,
    onTreeKeydown,
    saveTreeNodeRef,
    treeNodesRefs,
    treeViewRef
  } = useFocusTree({
    filteredData,
    disabledItemValues,
    expandItemValues,
    searchKeyword: keyword,
    flattenedNodes,
    focusNode: virtualized ? focusNode : undefined,
    onFocused: onFocusItem,
    onExpand
  });

  /**
   * Get formatted nodes for render tree
   * @params render - renderNode function. only used when virtualized setting false
   */
  const getFormattedNodes = (render?: any) => {
    if (virtualized) {
      return virtualizedNodes;
    }

    return getFormattedTree(flattenedNodes, filteredData, {
      childrenKey,
      cascade,
      disabledItemValues,
      valueKey
    })
      .map(node => render?.(node, 1))
      .filter(item => item);
  };

  const getTreeNodeProps = useTreeNodeProps({
    disabled,
    uncheckableItemValues,
    disabledItemValues,
    loadingNodeValues,
    focusItemValue,
    flattenedNodes,
    keyword
  });

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

  const handleSelect = useEventCallback((node: TreeNode, event: React.SyntheticEvent) => {
    if (disabled) return;

    const currentNode = node.refKey ? flattenedNodes[node.refKey] : null;

    if (!node || !currentNode) {
      return;
    }

    const checkedValues = getCheckedValues(node, !currentNode.check);
    const path = getPathTowardsItem(node, item => itemParentMap.get(item[valueKey]));

    if (virtualized) focusNode(node);
    setFocusItemValue(node[valueKey]);

    onChange?.(checkedValues, event);
    onSelect?.(node as Option, checkedValues, event);
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
    if (disabled) return;

    onTreeKeydown(event);
    onMenuKeyDown(event, { enter: selectActiveItem });
  });

  const renderNode = (node: TreeNode, layer: number) => {
    const { visible, refKey, parent } = node;

    // when searching, all nodes should be expand
    const expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));

    if (!visible) {
      return null;
    }

    const children = node[childrenKey];
    const hasChildren = keyword ? hasVisibleChildren(node, childrenKey) : Boolean(children);
    const treeNodeProps = {
      // The spread operator does not copy non-enumerable properties,
      // so we need to copy the `parent` property manually.
      ...getTreeNodeProps({ ...node, parent }),
      layer,
      expanded,
      hasChildren,
      onSelect: handleSelect,
      onExpand
    };

    if (hasChildren) {
      layer += 1;

      const childClassName = merge(prefix('node-children'), {
        [prefix('node-expanded')]: expanded
      });
      const nodes = children || [];

      return (
        <div className={childClassName} key={node[valueKey]}>
          <CheckTreeNode {...treeNodeProps} treeItemRef={ref => saveTreeNodeRef(ref, refKey)} />
          <div className={prefix('group')} role="group">
            {nodes.map(child => renderNode(child, layer))}
            {showIndentLine && <IndentLine />}
          </div>
        </div>
      );
    }

    return (
      <CheckTreeNode
        key={node[valueKey]}
        treeItemRef={ref => saveTreeNodeRef(ref, refKey)}
        {...treeNodeProps}
      />
    );
  };

  const renderVirtualListNode = ({ index, style, data }: ListChildComponentProps) => {
    const node = data[index];
    const { layer, refKey, visible, hasChildren, parent } = node;
    const expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));

    const treeNodeProps = {
      // The spread operator does not copy non-enumerable properties,
      // so we need to copy the `parent` property manually.
      ...getTreeNodeProps({ ...node, parent }),
      onSelect: handleSelect,
      onExpand,
      expanded,
      layer,
      hasChildren
    };

    return (
      visible && (
        <CheckTreeNode
          style={style}
          treeItemRef={ref => saveTreeNodeRef(ref, refKey)}
          {...treeNodeProps}
        />
      )
    );
  };

  const classes = merge(
    className,
    withPrefix({
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

      <TreeView
        {...rest}
        ref={treeViewRef}
        multiselectable
        treeRootClassName={treeNodesClass}
        className={prefix('view')}
        onScroll={onScroll}
        onKeyDown={handleTreeKeyDown}
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
      </TreeView>
    </Box>
  );
});

CheckTreeView.displayName = 'CheckTreeView';

export default CheckTreeView;
