import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { pick, omit, isUndefined, isNil, isFunction } from 'lodash';
import { List, AutoSizer, ListChildComponentProps } from '../internals/Windowing';
import { oneOf } from '../internals/propTypes';
import TreeNode from '../Tree/TreeNode';
import { indentTreeNode } from '../Tree/utils';
import { getPathTowardsItem, getKeyParentMap } from '../internals/Tree/utils';
import { stringifyReactNode } from '../internals/utils';
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
  isSearching,
  isExpand,
  hasVisibleChildren,
  getDefaultExpandItemValues,
  getExpandItemValues,
  getDragNodeKeys,
  calDropNodePosition,
  createDragTreeDataFunction,
  removeDragPreview,
  createDragPreview,
  focusPreviousItem,
  getFocusableItems,
  getActiveItem,
  getTreeActiveNode,
  focusNextItem,
  focusTreeNode,
  focusToActiveTreeNode,
  handleLeftArrow,
  handleRightArrow
} from '../Tree/utils';
import {
  PickerToggle,
  PickerPopup,
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
} from '../internals/Picker';
import { TreeView } from '../internals/Tree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useTreeNodeRefs from '../Tree/hooks/useTreeNodeRefs';
import useTreeSearch from '../Tree/hooks/useTreeSearch';
import useTreeDrag from '../Tree/hooks/useTreeDrag';
import useFlattenTreeData from '../Tree/hooks/useFlattenTreeData';
import SearchBox from '../internals/SearchBox';
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
    onSearch,
    onSelect,
    onSelectItem,
    onChange,
    onEntered,
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
  const itemDataKeys = { childrenKey, labelKey, valueKey };
  const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);

  const [expandItemValues, setExpandItemValues] = useControlled(
    controlledExpandItemValues,
    getDefaultExpandItemValues(treeData, {
      ...itemDataKeys,
      defaultExpandAll,
      defaultExpandItemValues
    })
  );
  const [active, setActive] = useState(false);
  const [focusItemValue, setFocusItemValue] = useState(null);

  const { flattenedNodes, formatVirtualizedTreeData } = useFlattenTreeData({
    ...itemDataKeys,
    data: treeData
  });
  const { prefix, merge } = useClassNames(classPrefix);
  const { prefix: treePrefix, withClassPrefix: withTreeClassPrefix } = useClassNames(
    inline && classPrefix !== 'picker' ? classPrefix : 'tree'
  );

  const handleSearchCallback = (value: string, _data, event: React.SyntheticEvent) => {
    onSearch?.(value, event);
  };

  const { filteredData, keyword, setSearchKeyword, handleSearch, setFilteredData } = useTreeSearch({
    ...itemDataKeys,
    callback: handleSearchCallback,
    searchKeyword,
    data: treeData,
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
  } = useTreeDrag<ItemDataType>();

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();

  const activeNode = getTreeActiveNode(flattenedNodes, value, valueKey);

  const getFormattedNodes = (render?: any) => {
    if (virtualized) {
      return formatVirtualizedTreeData(flattenedNodes, filteredData, expandItemValues, {
        searchKeyword: keyword
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
    setFilteredData(data, keyword);
  }, [data, keyword, setFilteredData]);

  useEffect(() => {
    setFilteredData(treeData, keyword);
  }, [treeData, keyword, setFilteredData]);

  useEffect(() => {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);

  const getDropData = (nodeData: any) => {
    const options = { valueKey, childrenKey };
    return {
      /** draggingNode */
      dragNode,
      /** dropNode */
      dropNode: nodeData,
      /** dragAndDrop Position type */
      dropNodePosition,
      createUpdateDataFunction: createDragTreeDataFunction(
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
    const nextExpandItemValues = getExpandItemValues({
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
      appendChild(node, getChildren);
    }
  });

  const handleDragStart = useEventCallback((nodeData: any, event: React.DragEvent) => {
    if (draggable) {
      const dragMoverNode = createDragPreview(
        stringifyReactNode(nodeData[labelKey]),
        treePrefix('drag-preview')
      );
      event.dataTransfer?.setDragImage(dragMoverNode, 0, 0);
      setDragNodeKeys(getDragNodeKeys(nodeData, childrenKey, valueKey));
      setDragNode(flattenedNodes[nodeData.refKey]);
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
    focusActiveNode();
    setActive(true);
  });

  const handleClose = useEventCallback(() => {
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
      isSearching(keyword)
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

  const handleLeftArrowEvent = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    handleLeftArrow({
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

  const handleRightArrowEvent = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    handleRightArrow({
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
    const activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    handleSelect(activeItem, event);
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const nullValue: any = null;
    const target = event.target as Element;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
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
    onMenuKeyDown: event => {
      onMenuKeyDown(event, {
        down: () => handleFocusItem(KEY_VALUES.DOWN),
        up: () => handleFocusItem(KEY_VALUES.UP),
        left: rtl ? handleRightArrowEvent : handleLeftArrowEvent,
        right: rtl ? handleLeftArrowEvent : handleRightArrowEvent,
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
      left: rtl ? handleRightArrowEvent : handleLeftArrowEvent,
      right: rtl ? handleLeftArrowEvent : handleRightArrowEvent,
      enter: selectActiveItem
    });
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
                style={indentTreeNode(rtl, layer - 1, true)}
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

    const expand = isExpand(keyword, expandItemValues.includes(node[valueKey]));
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
    const classes = merge(withTreeClassPrefix({ virtualized }), { [className ?? '']: inline });
    const formattedNodes = getFormattedNodes(renderNode);

    let treeViewProps: any = {
      ref: treeView
    };

    if (inline) {
      treeViewProps = {
        ref: root,
        style: { height, ...style },
        onKeyDown: handleTreeKeyDown,
        ...rest
      };
    }

    return (
      <TreeView {...treeViewProps} treeRootClassName={treePrefix('root')} className={classes}>
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
          <SearchBox
            placeholder={locale.searchPlaceholder}
            onChange={handleSearch}
            value={keyword}
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
      onExit={onExit}
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
          focusItemValue={focusItemValue}
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
  appearance: oneOf(['default', 'subtle']),
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
