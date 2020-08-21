import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { pick, omit, isUndefined, isNil, isFunction } from 'lodash';
import { List, AutoSizer } from '../Picker/VirtualizedList';
import shallowEqual from '../utils/shallowEqual';
import TreeNode from './TreeNode';
import { createChainedFunction, useClassNames, useCustom, useControlled } from '../utils';

import {
  getExpandWhenSearching,
  hasVisibleChildren,
  getDragNodeKeys,
  calDropNodePosition,
  createUpdateTreeDataFunction,
  useTreeDrag,
  useFlattenTreeData,
  getTreeActiveNode,
  getDefaultExpandItemValues,
  useTreeNodeRefs,
  useTreeSearch,
  getScrollToIndex,
  focusPreviousItem,
  getFocusableItems,
  focusNextItem,
  getActiveItem,
  toggleExpand,
  useGetTreeNodeChildren
} from '../utils/treeUtils';

import {
  PickerToggle,
  MenuWrapper,
  SearchBar,
  PickerToggleTrigger,
  createConcatChildrenFunction,
  usePickerClassName,
  onMenuKeyDown
} from '../Picker';

import { TREE_NODE_DROP_POSITION, KEY_CODE } from '../constants';
import { listPickerPropTypes, listPickerDefaultProps } from '../Picker/propTypes';
import { TreeDragProps, TreeBaseProps } from '../Tree/Tree';
import { FormControlPickerProps, ItemDataType } from '../@types/common';
import { PickerLocaleType, PickerComponent } from '../Picker/types';
import { pickerToggleTriggerProps } from '../Picker/PickerToggleTrigger';
import { TreeNodeType } from '../CheckTreePicker/utils';

// default value for virtualized
const defaultHeight = 360;

export interface TreePickerProps<T = number | string>
  extends TreeBaseProps<T, ItemDataType>,
    TreeDragProps,
    FormControlPickerProps<T, PickerLocaleType, ItemDataType> {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Whether display search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Set the option value for the expand node */
  defaultExpandItemValues?: ItemDataType[];

  /** Set the option value for the expand node with controlled*/
  expandItemValues?: ItemDataType[];

  /** Custom render selected items */
  renderValue?: (
    value: T,
    selectedItems: ItemDataType,
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

const defaultProps: Partial<TreePickerProps> = {
  ...listPickerDefaultProps,
  classPrefix: 'picker',
  as: 'div',
  appearance: 'default',
  searchable: true,
  virtualized: true,
  cleanable: true,
  menuAutoWidth: true,
  placement: 'bottomStart',
  locale: {
    placeholder: 'Select',
    searchPlaceholder: 'Search',
    noResultsText: 'No results found'
  }
};

const TreePicker: PickerComponent<TreePickerProps> = React.forwardRef((props, ref) => {
  const {
    as: Component,
    data,
    style,
    value: controlledValue,
    inline,
    locale: overrideLocale,
    height = defaultHeight,
    className,
    disabled,
    placement,
    cleanable,
    menuStyle,
    searchable,
    virtualized,
    classPrefix,
    defaultValue,
    placeholder,
    searchKeyword,
    menuClassName,
    menuAutoWidth,
    searchBy,
    toggleAs,
    labelKey,
    valueKey,
    childrenKey,
    draggable,
    defaultExpandAll,
    disabledItemValues,
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues,
    getChildren,
    renderTreeIcon,
    renderTreeNode,
    onExited,
    onClean,
    onOpen,
    onSearch,
    onSelect,
    onChange,
    onEntered,
    onClose,
    onDragEnd,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onExpand,
    renderExtraFooter,
    renderMenu,
    renderValue,
    renderDragNode,
    ...rest
  } = props;
  const rootRef = useRef<HTMLDivElement>();
  const triggerRef = useRef<any>();
  const positionRef = useRef();
  const toggleRef = useRef<HTMLButtonElement>();
  const listRef = useRef();
  const menuRef = useRef<HTMLDivElement>();
  const treeViewRef = useRef<HTMLDivElement>();
  const { rtl, locale } = useCustom<PickerLocaleType>('Picker', overrideLocale);

  const [value, setValue] = useControlled(controlledValue, defaultValue);
  const {
    data: treeData,
    setData: setTreeData,
    loadingNodeValues,
    loadChildren
  } = useGetTreeNodeChildren(data, valueKey, childrenKey);

  const [expandItemValues, setExpandItemValues] = useControlled(
    controlledExpandItemValues,
    getDefaultExpandItemValues(treeData, {
      defaultExpandAll,
      valueKey,
      childrenKey,
      defaultExpandItemValues
    })
  );
  const [active, setActive] = useState(false);
  const [focusItemValue, setFocusItemValue] = useState(null);

  const { flattenNodes, forceUpdate, formatVirtualizedTreeData } = useFlattenTreeData({
    data: treeData,
    labelKey,
    valueKey,
    childrenKey,
    callback: () => {
      // after flattenData, always trigger re-render
      forceUpdate();
    }
  });
  const { prefix, merge } = useClassNames(classPrefix);
  const { prefix: treePrefix, withClassPrefix: withTreeClassPrefix } = useClassNames('tree');

  const {
    filteredData,
    searchKeywordState,
    setSearchKeyword,
    handleSearch,
    setFilteredData
  } = useTreeSearch({
    labelKey,
    childrenKey,
    searchKeyword,
    data: treeData,
    searchBy,
    callback: (
      searchKeyword: string,
      _filterData: TreeNodeType[],
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      onSearch?.(searchKeyword, event);
    }
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
  } = useTreeDrag();

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();

  const activeNode = getTreeActiveNode(flattenNodes, value, valueKey);

  const focusNode = (focusItemElement?: Element) => {
    const container = treeViewRef.current;
    if (!container) {
      return;
    }

    const activeItem: any =
      focusItemElement ?? container.querySelector(`.${treePrefix('node-active')}`);
    if (!activeItem) {
      return;
    }
    activeItem?.focus?.();
  };

  useEffect(() => {
    setFilteredData(data, searchKeywordState);
    setTreeData(data);
  }, [data, searchKeywordState, setFilteredData]);

  useEffect(() => {
    setFilteredData(treeData, searchKeywordState);
  }, [treeData, searchKeywordState, setFilteredData]);

  useEffect(() => {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);

  useEffect(() => {
    setSearchKeyword(searchKeyword);
  }, [searchKeyword, setSearchKeyword]);

  /**
   * 获取 onDrop 的回调数据
   */
  const getDropData = (nodeData: any) => {
    const options = { valueKey, childrenKey };
    return {
      /** draggingNode */
      dragNode,
      /** dropNode */
      dropNode: nodeData,
      /** dragAndDrop Position type */
      dropNodePosition,
      createUpdateDataFunction: createUpdateTreeDataFunction(
        {
          dragNode,
          dropNode: nodeData,
          dropNodePosition
        },
        options
      )
    };
  };

  const getTreeNodeProps = (node: any, layer: number, index?: number) => {
    const draggingNode = dragNode ?? {};
    return {
      rtl,
      value: node[valueKey],
      label: node[labelKey],
      index,
      layer,
      loading: loadingNodeValues.some(item => shallowEqual(item, node[valueKey])),
      expand: node.expand,
      active: shallowEqual(node[valueKey], value),
      visible: node.visible,
      draggable,
      dragging: shallowEqual(node[valueKey], draggingNode[valueKey]),
      children: node[childrenKey],
      nodeData: node,
      disabled: disabledItemValues.some(disabledItem => shallowEqual(disabledItem, node[valueKey])),
      dragOver:
        shallowEqual(node[valueKey], dragOverNodeKey) &&
        dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER,
      dragOverTop:
        shallowEqual(node[valueKey], dragOverNodeKey) &&
        dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_TOP,
      dragOverBottom:
        shallowEqual(node[valueKey], dragOverNodeKey) &&
        dropNodePosition === TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM,
      onSelect: handleSelect,
      onDragStart: handleDragStart,
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDragEnd: handleDragEnd,
      onDrop: handleDrop,
      onExpand: handleExpand,
      onRenderTreeNode: renderTreeNode,
      onRenderTreeIcon: renderTreeIcon
    };
  };

  const handleSelect = (nodeData: any, event: React.SyntheticEvent<any>) => {
    const nodeValue = nodeData[valueKey];
    setValue(nodeValue);
    onChange?.(nodeValue, event);
    onSelect?.(nodeData, nodeValue, event);
    handleCloseDropdown();
    setFocusItemValue(nodeData[valueKey]);
    toggleRef.current?.focus();
  };

  const handleExpand = (node: any) => {
    const nextExpandItemValues = toggleExpand({
      node: node,
      isExpand: !node.expand,
      expandItemValues,
      valueKey
    });
    setExpandItemValues(nextExpandItemValues);
    onExpand?.(
      nextExpandItemValues,
      node,
      createConcatChildrenFunction(node, node[valueKey], { valueKey, childrenKey })
    );
    if (
      isFunction(getChildren) &&
      !node.expand &&
      Array.isArray(node[childrenKey]) &&
      node[childrenKey].length === 0
    ) {
      loadChildren(node, getChildren);
    }
  };

  const handleDragStart = (nodeData: any, event: React.DragEvent) => {
    if (draggable) {
      setDragNodeKeys(getDragNodeKeys(nodeData, childrenKey, valueKey));
      setDragNode(flattenNodes[nodeData.refKey]);
      onDragStart?.(nodeData, event);
    }
  };

  const handleDragEnter = (nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      return;
    }

    if (dragNode) {
      setDragOverNodeKey(nodeData[valueKey]);
      setDropNodePosition(calDropNodePosition(event, treeNodesRefs[nodeData.refKey]));
    }
    onDragEnter?.(nodeData, event);
  };

  const handleDragOver = (nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      return;
    }

    if (dragNode && shallowEqual(nodeData[valueKey], dragOverNodeKey)) {
      const lastDropNodePosition = calDropNodePosition(event, treeNodesRefs[nodeData.refKey]);
      if (lastDropNodePosition === dropNodePosition) return;

      setDropNodePosition(lastDropNodePosition);
    }

    onDragOver?.(nodeData, event);
  };

  const handleDragLeave = (nodeData: any, event: React.DragEvent) => {
    onDragLeave?.(nodeData, event);
  };

  const handleDragEnd = (nodeData: any, event: React.DragEvent) => {
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
    onDragEnd?.(nodeData, event);
  };

  const handleDrop = (nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      console.error('Cannot drag a node to itself and its children');
    } else {
      const dropData = getDropData(nodeData);
      onDrop?.(dropData, event);
    }
    setDragNode(null);
    setDragNodeKeys([]);
    setDragOverNodeKey(null);
    setDragNode(null);
  };

  const handleOpen = () => {
    focusNode();
    handleOpenDropdown();
    onOpen?.();
    setActive(true);
  };

  const handleClose = () => {
    setSearchKeyword('');
    handleCloseDropdown();
    onClose?.();
    setActive(false);
    setFocusItemValue(activeNode?.[valueKey]);
  };

  const handleCloseDropdown = () => {
    triggerRef.current?.hide?.();
  };

  const handleOpenDropdown = () => {
    triggerRef.current?.show?.();
  };

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    get menu() {
      return menuRef.current;
    },
    get toggle() {
      return toggleRef.current;
    },
    get treeView() {
      return treeViewRef.current;
    },
    open: handleOpenDropdown,
    close: handleCloseDropdown
  }));

  const handleToggleDropdown = () => {
    if (active) {
      handleClose();
      return;
    }
    handleOpen();
  };

  const handleFocusItem = (type: number) => {
    const focusableItems = getFocusableItems(filteredData, { ...props, expandItemValues });
    const selector = `.${treePrefix('node-label')}`;
    const focusProps = {
      focusItemValue,
      focusableItems,
      treeNodesRefs,
      selector,
      valueKey,
      callback: nextFocusItemValue => {
        setFocusItemValue(nextFocusItemValue);
      }
    };
    if (type === KEY_CODE.DOWN) {
      focusNextItem(focusProps);
      return;
    }
    if (type === KEY_CODE.UP) {
      focusPreviousItem(focusProps);
    }
  };

  const selectActiveItem = (event: React.SyntheticEvent<any>) => {
    const activeItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    handleSelect(activeItem, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<any>) => {
    // enter
    if ((!activeNode || !active) && event.keyCode === KEY_CODE.ENTER) {
      handleToggleDropdown();
    }

    // delete
    if (event.keyCode === KEY_CODE.ESC) {
      handleClean(event);
    }

    if (!treeViewRef.current) {
      return;
    }
    if (event.target instanceof HTMLElement) {
      const className = event.target.className;

      if (
        className.includes(prefix('toggle')) ||
        className.includes(prefix('toggle-custom')) ||
        className.includes(prefix('search-bar-input'))
      ) {
        onMenuKeyDown(event, {
          down: () => handleFocusItem(KEY_CODE.DOWN)
        });
        return;
      }
    }

    onMenuKeyDown(event, {
      down: () => handleFocusItem(KEY_CODE.DOWN),
      up: () => handleFocusItem(KEY_CODE.UP),
      enter: selectActiveItem,
      del: handleClean
    });
  };

  const handleClean = (event: React.SyntheticEvent<any>) => {
    setValue(null);
    onChange?.(null, event);
  };

  const renderNode = (node: any, index: number, layer: number) => {
    if (!node.visible) {
      return null;
    }

    const children = node[childrenKey];
    const expand = getExpandWhenSearching(
      searchKeywordState,
      expandItemValues.includes(node[valueKey])
    );
    const visibleChildren =
      isUndefined(searchKeywordState) || searchKeywordState.length === 0
        ? !!children
        : hasVisibleChildren(node, childrenKey);

    const nodeProps = {
      ...getTreeNodeProps({ ...node, expand }, layer, index),
      hasChildren: visibleChildren
    };

    if (nodeProps.hasChildren) {
      layer += 1;
      const openClass = treePrefix('open');
      const childrenClass = merge(treePrefix('node-children'), {
        [openClass]: expand && visibleChildren
      });

      const nodes = children || [];
      return (
        <div className={childrenClass} key={node[valueKey]}>
          <TreeNode {...nodeProps} innerRef={ref => saveTreeNodeRef(node.refKey, ref)} />
          <div className={treePrefix('children')}>
            {nodes.map((child, i) => renderNode(child, i, layer))}
          </div>
        </div>
      );
    }
    return (
      <TreeNode
        innerRef={ref => saveTreeNodeRef(node.refKey, ref)}
        key={node[valueKey]}
        {...nodeProps}
      />
    );
  };

  const renderVirtualListNode = (nodes: any[]) => ({ key, index, style }) => {
    const node = nodes[index];
    const { layer, showNode } = node;

    const expand = getExpandWhenSearching(
      searchKeywordState,
      expandItemValues.includes(node[valueKey])
    );
    if (!node.visible) {
      return null;
    }

    const nodeProps = {
      ...getTreeNodeProps({ ...node, expand }, layer),
      style,
      hasChildren: node.hasChildren
    };

    return (
      showNode && (
        <TreeNode innerRef={ref => saveTreeNodeRef(node.refKey, ref)} key={key} {...nodeProps} />
      )
    );
  };

  const renderDefaultDragNode = () => {
    if (draggable) {
      let dragNodeContent = dragNode?.[labelKey];
      if (isFunction(renderDragNode)) {
        dragNodeContent = renderDragNode(dragNode);
      }
      return (
        <span id="drag-node" className={treePrefix('drag-node-mover')}>
          {dragNodeContent}
        </span>
      );
    }
    return null;
  };

  const renderTree = () => {
    const layer = 0;

    const classes = withTreeClassPrefix({
      [className]: inline,
      virtualized
    });

    let nodes = [];
    if (!virtualized) {
      nodes = filteredData.map((dataItem, index) => renderNode(dataItem, index, layer));

      if (!nodes.some(v => v !== null)) {
        return <div className={prefix('none')}>{locale.noResultsText}</div>;
      }
    } else {
      nodes = formatVirtualizedTreeData(flattenNodes, filteredData, expandItemValues).filter(
        n => n.showNode && n.visible
      );
      if (!nodes.length && !filteredData.length) {
        return <div className={prefix('none')}>{locale.noResultsText}</div>;
      }
    }

    const treeHeight = treeViewRef?.current?.getBoundingClientRect().height || defaultHeight;

    // 当未定义 height 且 设置了 virtualized 为 true，listHeight 设置默认高度
    const listHeight = virtualized ? treeHeight : height;
    const styles = inline ? { height: listHeight, ...style } : {};
    return (
      <div>
        <div ref={treeViewRef} className={classes} style={styles} onKeyDown={handleKeyDown}>
          <div className={treePrefix('nodes')}>
            {virtualized ? (
              <AutoSizer defaultHeight={listHeight} style={{ width: 'auto', height: 'auto' }}>
                {({ height, width }) => (
                  <List
                    ref={listRef}
                    width={width}
                    height={height || listHeight}
                    rowHeight={36}
                    rowCount={nodes.length}
                    rowRenderer={renderVirtualListNode(nodes)}
                    scrollToIndex={getScrollToIndex(nodes, value, valueKey)}
                  />
                )}
              </AutoSizer>
            ) : (
              nodes
            )}
          </div>
        </div>
        {renderDefaultDragNode()}
      </div>
    );
  };

  const renderDropdownMenu = () => {
    const classes = merge(menuClassName, prefix('tree-menu'));

    const styles = virtualized ? { height, ...menuStyle } : menuStyle;

    return (
      <MenuWrapper
        autoWidth={menuAutoWidth}
        className={classes}
        style={styles}
        ref={menuRef}
        getToggleInstance={() => toggleRef.current}
        getPositionInstance={() => positionRef.current}
      >
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            key="searchBar"
            onChange={handleSearch}
            value={searchKeywordState}
          />
        ) : null}
        {renderMenu ? renderMenu(renderTree()) : renderTree()}
        {renderExtraFooter?.()}
      </MenuWrapper>
    );
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  const hasValue = !isNil(activeNode) || (!isNil(value) && isFunction(renderValue));
  let selectedElement: React.ReactNode = placeholder;

  if (hasValue) {
    const node = activeNode ?? {};
    selectedElement = node[labelKey];
    if (isFunction(renderValue)) {
      selectedElement = renderValue(value, node, selectedElement);
    }
  }

  const [classes, usedClassNameProps] = usePickerClassName({
    ...props,
    hasValue,
    name: 'tree'
  });

  if (inline) {
    return renderTree();
  }

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickerToggleTriggerProps)}
      ref={triggerRef}
      positionRef={positionRef}
      placement={placement}
      onEntered={createChainedFunction(handleOpen, onEntered)}
      onExited={createChainedFunction(handleClose, onExited)}
      speaker={renderDropdownMenu()}
    >
      <Component ref={rootRef} className={classes} style={style}>
        <PickerToggle
          {...omit(rest, [...pickerToggleTriggerProps, ...usedClassNameProps])}
          ref={toggleRef}
          onKeyDown={handleKeyDown}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          as={toggleAs}
          hasValue={hasValue}
          active={active}
        >
          {selectedElement || locale.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

TreePicker.displayName = 'TreePicker';
TreePicker.defaultProps = defaultProps;
TreePicker.propTypes = {
  ...listPickerPropTypes,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  height: PropTypes.number,
  inline: PropTypes.bool,
  draggable: PropTypes.bool,
  virtualized: PropTypes.bool,
  searchable: PropTypes.bool,
  menuAutoWidth: PropTypes.bool,
  searchKeyword: PropTypes.string,
  defaultExpandAll: PropTypes.bool,
  expandItemValues: PropTypes.array,
  defaultExpandItemValues: PropTypes.array,
  onSearch: PropTypes.func,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  renderMenu: PropTypes.func,
  renderTreeNode: PropTypes.func,
  renderTreeIcon: PropTypes.func,
  renderExtraFooter: PropTypes.func,
  renderDragNode: PropTypes.func,
  searchBy: PropTypes.func
};

export default TreePicker;
