import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { pick, omit, isUndefined, isNil, isFunction } from 'lodash';
import { List, AutoSizer, ListChildComponentProps } from '../Windowing';
import TreeNode from './TreeNode';
import {
  createDragPreview,
  getKeyParentMap,
  getPathTowardsItem,
  getTreeNodeIndent,
  removeDragPreview,
  stringifyTreeNodeLabel
} from '../utils/treeUtils';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  useClassNames,
  useCustom,
  useControlled,
  useEventCallback,
  TREE_NODE_DROP_POSITION,
  KEY_VALUES,
  mergeRefs,
  shallowEqual
} from '../utils';

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
  focusPreviousItem,
  getFocusableItems,
  focusNextItem,
  getActiveItem,
  toggleExpand,
  useGetTreeNodeChildren,
  focusToActiveTreeNode,
  leftArrowHandler,
  focusTreeNode,
  rightArrowHandler,
  isSearching
} from '../utils/treeUtils';

import {
  PickerToggle,
  PickerPopup,
  TreeView,
  SearchBar,
  PickerToggleTrigger,
  createConcatChildrenFunction,
  usePickerClassName,
  usePickerRef,
  onMenuKeyDown,
  listPickerPropTypes,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerComponent,
  useToggleKeyDownEvent,
  PickerToggleProps
} from '../Picker';

import { TreeDragProps, TreeBaseProps, DropData } from '../Tree/Tree';
import { FormControlPickerProps, ItemDataType } from '../@types/common';

import TreeContext from '../Tree/TreeContext';

export interface TreePickerProps<T = number | string>
  extends TreeBaseProps<T, ItemDataType>,
    TreeDragProps,
    FormControlPickerProps<T, PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
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
  onScroll?: (event: React.SyntheticEvent) => void;
}

const emptyArray = [];
const itemSize = () => 36;

/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
const TreePicker: PickerComponent<TreePickerProps> = React.forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    data = emptyArray,
    appearance = 'default',
    style,
    showIndentLine,
    value: controlledValue,
    locale: overrideLocale,
    height = 360,
    menuMaxHeight = 320,
    menuStyle,
    className,
    disabled,
    placement = 'bottomStart',
    cleanable = true,
    searchable = true,
    virtualized = false,
    classPrefix = 'picker',
    defaultValue,
    placeholder,
    searchKeyword,
    menuClassName,
    menuAutoWidth = true,
    searchBy,
    toggleAs,
    labelKey = 'label',
    valueKey = 'value',
    childrenKey = 'children',
    draggable,
    defaultExpandAll = false,
    disabledItemValues = emptyArray,
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues = emptyArray,
    id,
    listProps,
    getChildren,
    renderTreeIcon,
    renderTreeNode,
    onExit,
    onExited,
    onClean,
    onOpen,
    onSearch,
    onSelect,
    onSelectItem,
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
    ...rest
  } = props;

  const { rtl, locale } = useCustom<PickerLocale>('Picker', overrideLocale);
  const { inline } = useContext(TreeContext);
  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref, {
    inline
  });
  const [value, setValue, isControlled] = useControlled(controlledValue, defaultValue);
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

  const { filteredData, searchKeywordState, setSearchKeyword, handleSearch, setFilteredData } =
    useTreeSearch({
      labelKey,
      childrenKey,
      searchKeyword,
      data: treeData,
      searchBy,
      callback: (
        searchKeyword: string,
        _filterData: ItemDataType[],
        event: React.SyntheticEvent
      ) => {
        onSearch?.(searchKeyword, event as React.KeyboardEvent<HTMLInputElement>);
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
  } = useTreeDrag<ItemDataType>();

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();

  const activeNode = getTreeActiveNode(flattenNodes, value, valueKey);

  const getFormattedNodes = (render?: any) => {
    if (virtualized) {
      return formatVirtualizedTreeData(flattenNodes, filteredData, expandItemValues, {
        searchKeyword: searchKeywordState
      }).filter(n => n.visible);
    }
    return filteredData.map((dataItem, index) => render?.(dataItem, index, 1));
  };

  const focusActiveNode = () => {
    if (list.current) {
      focusToActiveTreeNode({
        list: list.current,
        valueKey,
        selector: `.${treePrefix('node-active')}`,
        activeNode,
        virtualized,
        container: treeView.current,
        formattedNodes: getFormattedNodes()
      });
    }
  };

  useEffect(() => {
    setFilteredData(data, searchKeywordState);
    setTreeData(data);
  }, [data, searchKeywordState, setFilteredData, setTreeData]);

  useEffect(() => {
    setFilteredData(treeData, searchKeywordState);
  }, [treeData, searchKeywordState, setFilteredData]);

  useEffect(() => {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);

  useEffect(() => {
    setSearchKeyword(searchKeyword ?? '');
  }, [searchKeyword, setSearchKeyword]);

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
      as: Component,
      rtl,
      value: node[valueKey],
      label: node[labelKey],
      index,
      layer,
      loading: loadingNodeValues.some(item => shallowEqual(item, node[valueKey])),
      expand: node.expand,
      active: shallowEqual(node[valueKey], value),
      focus: shallowEqual(node[valueKey], focusItemValue),
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

  const handleSelect = useEventCallback((nodeData: any, event: React.SyntheticEvent) => {
    if (!nodeData) {
      return;
    }
    const nodeValue = nodeData[valueKey];
    if (!isControlled) {
      setValue(nodeValue);
    }

    setFocusItemValue(nodeData[valueKey]);
    onChange?.(nodeValue, event);
    onSelect?.(nodeData, nodeValue, event);
    onSelectItem?.(
      nodeData,
      getPathTowardsItem(nodeData, item => itemParentMap.get(item[valueKey]))
    );
    target.current?.focus();
    trigger.current?.close?.();
  });

  const handleExpand = useEventCallback((node: any) => {
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
      createConcatChildrenFunction<ItemDataType>(node, node[valueKey], { valueKey, childrenKey })
    );
    if (
      isFunction(getChildren) &&
      !node.expand &&
      Array.isArray(node[childrenKey]) &&
      node[childrenKey].length === 0
    ) {
      loadChildren(node, getChildren);
    }
  });

  const handleDragStart = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (draggable) {
      const dragMoverNode = createDragPreview(
        stringifyTreeNodeLabel(nodeData[labelKey]),
        treePrefix('drag-preview')
      );
      event.dataTransfer?.setDragImage(dragMoverNode, 0, 0);
      setDragNodeKeys(getDragNodeKeys(nodeData, childrenKey, valueKey));
      setDragNode(flattenNodes[nodeData.refKey]);
      onDragStart?.(nodeData, event);
    }
  });

  const handleDragEnter = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      return;
    }

    if (dragNode) {
      setDragOverNodeKey(nodeData[valueKey]);
      setDropNodePosition(calDropNodePosition(event, treeNodesRefs[nodeData.refKey]));
    }
    onDragEnter?.(nodeData, event);
  });

  const handleDragOver = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    if (dragNode && shallowEqual(nodeData[valueKey], dragOverNodeKey)) {
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
    if (dragNodeKeys.some(d => shallowEqual(d, nodeData[valueKey]))) {
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

  const handleOpen = useEventCallback(() => {
    trigger.current?.open?.();
    focusActiveNode();
    onOpen?.();
    setActive(true);
  });

  const handleClose = useEventCallback(() => {
    trigger.current?.close?.();
    setSearchKeyword('');
    setActive(false);
    setFocusItemValue(activeNode?.[valueKey]);
    /**
     * when using keyboard toggle picker, should refocus on PickerToggle Component after close picker menu
     */
    target.current?.focus();
  });

  const handleFocusItem = useEventCallback((key: string) => {
    const focusableItems = getFocusableItems(
      filteredData,
      {
        disabledItemValues,
        valueKey,
        childrenKey,
        expandItemValues
      },
      isSearching(searchKeywordState)
    );
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
    if (key === KEY_VALUES.DOWN) {
      focusNextItem(focusProps);
      return;
    }
    if (key === KEY_VALUES.UP) {
      focusPreviousItem(focusProps);
    }
  });

  const handleLeftArrow = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    leftArrowHandler({
      focusItem,
      expand: expandItemValues.includes(focusItem?.[valueKey]),
      onExpand: handleExpand,
      childrenKey,
      onFocusItem: () => {
        setFocusItemValue(focusItem?.parent?.[valueKey]);
        focusTreeNode(focusItem?.parent?.refKey, treeNodesRefs, `.${treePrefix('node-label')}`);
      }
    });
  });

  const handleRightArrow = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    rightArrowHandler({
      focusItem,
      expand: expandItemValues.includes(focusItem?.[valueKey]),
      childrenKey,
      onExpand: handleExpand,
      onFocusItem: () => {
        handleFocusItem(KEY_VALUES.DOWN);
      }
    });
  });

  const selectActiveItem = useEventCallback((event: React.SyntheticEvent) => {
    if (isNil(focusItemValue)) return;
    const activeItem = getActiveItem(focusItemValue, flattenNodes, valueKey);
    handleSelect(activeItem, event);
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const nullValue: any = null;
    const target = event.target as Element;
    // exclude searchBar
    if (target.matches('div[role="searchbox"] > input') || disabled || !cleanable) {
      return;
    }
    if (!isControlled) {
      setValue(null);
    }
    onChange?.(nullValue, event);
  });

  const onPickerKeydown = useToggleKeyDownEvent({
    toggle: !activeNode || !active,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    onExit: handleClean,
    onClose: handleClose,
    onMenuKeyDown: event => {
      onMenuKeyDown(event, {
        down: () => handleFocusItem(KEY_VALUES.DOWN),
        up: () => handleFocusItem(KEY_VALUES.UP),
        left: rtl ? handleRightArrow : handleLeftArrow,
        right: rtl ? handleLeftArrow : handleRightArrow,
        enter: selectActiveItem,
        del: handleClean
      });
    },
    ...rest
  });

  const handleTreeKeyDown = useEventCallback((event: React.KeyboardEvent<any>) => {
    if (!treeView.current) {
      return;
    }

    onMenuKeyDown(event, {
      down: () => handleFocusItem(KEY_VALUES.DOWN),
      up: () => handleFocusItem(KEY_VALUES.UP),
      left: rtl ? handleRightArrow : handleLeftArrow,
      right: rtl ? handleLeftArrow : handleRightArrow,
      enter: selectActiveItem
    });
  });

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
          <TreeNode {...nodeProps} ref={ref => saveTreeNodeRef(ref, node.refKey)} />
          <div className={treePrefix('group')} role="group">
            {nodes.map((child, i) => renderNode(child, i, layer))}
            {showIndentLine && (
              <span
                className={treePrefix('indent-line')}
                style={getTreeNodeIndent(rtl, layer - 1, true)}
              />
            )}
          </div>
        </div>
      );
    }
    return (
      <TreeNode
        ref={ref => saveTreeNodeRef(ref, node.refKey)}
        key={node[valueKey]}
        {...nodeProps}
      />
    );
  };

  const renderVirtualListNode = ({ index, style, data }: ListChildComponentProps) => {
    const node = data[index];
    const { layer, visible } = node;

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

    return visible && <TreeNode ref={ref => saveTreeNodeRef(ref, node.refKey)} {...nodeProps} />;
  };

  const renderTree = () => {
    const classes = withTreeClassPrefix({
      [className ?? '']: inline,
      virtualized
    });

    const formattedNodes = getFormattedNodes(renderNode);

    return (
      <TreeView
        treeRootClassName={treePrefix('root')}
        ref={inline ? root : treeView}
        className={classes}
        style={inline ? { height, ...style } : {}}
        onKeyDown={inline ? handleTreeKeyDown : undefined}
      >
        {virtualized ? (
          <AutoSizer
            defaultHeight={inline ? height : menuMaxHeight}
            style={{ width: 'auto', height: 'auto' }}
          >
            {({ height }) => (
              <List
                ref={list}
                height={height}
                itemSize={itemSize}
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
    );
  };

  const renderTreeView = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = merge(className, menuClassName, prefix('tree-menu'));
    const mergedMenuStyle = { ...menuStyle, left, top };

    return (
      <PickerPopup
        autoWidth={menuAutoWidth}
        className={classes}
        style={mergedMenuStyle}
        ref={mergeRefs(overlay, speakerRef)}
        onKeyDown={onPickerKeydown}
        target={trigger}
      >
        {searchable ? (
          <SearchBar
            placeholder={locale.searchPlaceholder}
            onChange={handleSearch}
            value={searchKeywordState}
            inputRef={searchInput}
          />
        ) : null}
        {renderMenu ? renderMenu(renderTree()) : renderTree()}
        {renderExtraFooter?.()}
      </PickerPopup>
    );
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValidValue = !isNil(activeNode) || (!isNil(value) && isFunction(renderValue));
  let selectedElement: React.ReactNode = placeholder;

  if (hasValidValue) {
    const node = activeNode ?? {};
    selectedElement = node[labelKey];
    if (isFunction(renderValue) && value) {
      selectedElement = renderValue(value, node, selectedElement);
      if (isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }

  const [classes, usedClassNamePropKeys] = usePickerClassName({
    ...props,
    classPrefix,
    appearance,
    hasValue: hasValidValue,
    name: 'tree',
    cleanable
  });

  if (inline) {
    return renderTree();
  }

  return (
    <PickerToggleTrigger
      id={id}
      popupType="tree"
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={trigger}
      placement={placement}
      onEnter={handleOpen}
      onEntered={onEntered}
      onExit={createChainedFunction(onClose, onExit)}
      onExited={createChainedFunction(handleClose, onExited)}
      speaker={renderTreeView}
    >
      <Component className={classes} style={style} ref={root}>
        <PickerToggle
          {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys, 'cascade'])}
          ref={target}
          appearance={appearance}
          onKeyDown={onPickerKeydown}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          as={toggleAs}
          disabled={disabled}
          hasValue={hasValidValue}
          active={active}
          placement={placement}
          inputValue={value}
        >
          {selectedElement || locale.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

TreePicker.displayName = 'TreePicker';
TreePicker.propTypes = {
  ...listPickerPropTypes,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  height: PropTypes.number,
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
