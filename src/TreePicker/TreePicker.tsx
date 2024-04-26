import React, { useState } from 'react';
import { pick, omit, isNil, isFunction } from 'lodash';
import { PickerLocale } from '../locales';
import {
  createChainedFunction,
  useClassNames,
  useCustom,
  useControlled,
  useEventCallback,
  mergeRefs
} from '../utils';

import { getActiveItem, getTreeActiveNode } from '../Tree/utils';
import {
  PickerToggle,
  PickerPopup,
  PickerToggleTrigger,
  usePickerClassName,
  usePickerRef,
  onMenuKeyDown,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerComponent,
  useToggleKeyDownEvent,
  PickerToggleProps
} from '../internals/Picker';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import { TreeNode } from '../Tree/types';
import TreeView, { type TreeViewProps } from '../Tree/TreeView';
import { FormControlPickerProps } from '../@types/common';

export interface TreePickerProps<V = number | string | null>
  extends TreeViewProps<V>,
    FormControlPickerProps<V, PickerLocale, TreeNode>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  /**
   * Custom render selected items
   */
  renderValue?: (
    value: V,
    selectedNode: TreeNode,
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
const TreePicker: PickerComponent<TreePickerProps> = React.forwardRef((props, ref) => {
  const {
    as: Component = 'div',
    appearance = 'default',
    classPrefix = 'picker',
    cleanable = true,
    childrenKey = 'children',
    data = [],
    disabled,
    defaultValue,
    defaultExpandAll = false,
    disabledItemValues = [],
    defaultExpandItemValues = [],
    expandItemValues,
    id,
    locale: overrideLocale,
    labelKey = 'label',
    placeholder,
    placement = 'bottomStart',
    style,
    searchKeyword,
    searchable = true,
    showIndentLine,
    menuClassName,
    menuStyle,
    menuMaxHeight = 320,
    menuAutoWidth = true,
    valueKey = 'value',
    virtualized = false,
    value: controlledValue,
    listProps,
    toggleAs,
    searchBy,
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
    onExpand,
    renderExtraFooter,
    renderMenu,
    renderValue,
    ...rest
  } = props;

  const { locale } = useCustom<PickerLocale>('Picker', overrideLocale);
  const inline = false;
  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref, {
    inline
  });
  const [value, setValue] = useControlled(controlledValue, defaultValue);
  const itemDataKeys = { childrenKey, labelKey, valueKey };

  const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);
  const flattenedNodes = useFlattenTree(treeData, {
    ...itemDataKeys
  });

  const [active, setActive] = useState(false);
  const [focusItemValue, setFocusItemValue] = useState<number | string | null>(null);

  const { prefix, merge } = useClassNames(classPrefix);
  const activeNode = getTreeActiveNode(flattenedNodes, value, valueKey);

  const handleSelect = useEventCallback(
    (treeNode: TreeNode, value: string | number | null, event: React.SyntheticEvent) => {
      setFocusItemValue(value);
      onSelect?.(treeNode, value, event);

      target.current?.focus();
      trigger.current?.close?.();
    }
  );

  const handleFocusItem = useEventCallback((value: string | number) => {
    setFocusItemValue(value);
  });

  const handleOpen = useEventCallback(() => {
    if (value) {
      setFocusItemValue(value);
    }
    setActive(true);
  });

  const handleClose = useEventCallback(() => {
    setActive(false);

    /**
     * when using keyboard toggle picker, should refocus on PickerToggle Component after close picker menu
     */
    target.current?.focus();
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const target = event.target as Element;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    setValue(null);
    onChange?.(null, event);
  });

  const handleTreePressEnter = useEventCallback((event: React.SyntheticEvent) => {
    if (isNil(focusItemValue)) {
      return;
    }

    const activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);

    handleSelect(activeItem, event);
  });

  const handleTreeKeyDown = useEventCallback((event: React.KeyboardEvent<any>) => {
    onMenuKeyDown(event, { del: handleClean, enter: handleTreePressEnter });
  });

  const onPickerKeydown = useToggleKeyDownEvent({
    toggle: !activeNode || !active,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown,
    ...rest
  });

  const handleChange = useEventCallback(
    (nextValue: string | number | null, event: React.SyntheticEvent) => {
      setValue(nextValue);
      onChange?.(nextValue, event);
    }
  );

  const tree = (
    <TreeView
      ref={treeView}
      virtualized={virtualized}
      value={value}
      childrenKey={childrenKey}
      labelKey={labelKey}
      valueKey={valueKey}
      data={treeData}
      defaultExpandAll={defaultExpandAll}
      disabledItemValues={disabledItemValues}
      expandItemValues={expandItemValues}
      defaultExpandItemValues={defaultExpandItemValues}
      showIndentLine={showIndentLine}
      searchable={searchable}
      searchKeyword={searchKeyword}
      searchBy={searchBy}
      loadingNodeValues={loadingNodeValues}
      appendChild={appendChild}
      flattenedNodes={flattenedNodes}
      listProps={listProps}
      listRef={list}
      height={menuMaxHeight}
      getChildren={getChildren}
      renderTreeIcon={renderTreeIcon}
      renderTreeNode={renderTreeNode}
      onExpand={onExpand}
      onSearch={onSearch}
      onChange={handleChange}
      onSelect={handleSelect}
      onSelectItem={onSelectItem}
      onFocusItem={handleFocusItem}
    />
  );

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
        {renderMenu ? renderMenu(tree) : tree}
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

export default TreePicker;
