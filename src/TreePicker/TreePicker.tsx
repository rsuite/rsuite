import React, { useMemo } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useFocusState from './hooks/useFocusState';
import useExpandTree from '../Tree/hooks/useExpandTree';
import TreeView, { type TreeViewProps } from '../Tree/TreeView';
import { PickerLocale } from '../locales';
import { useClassNames, useControlled, useEventCallback } from '@/internals/hooks';
import { forwardRef, createChainedFunction, mergeRefs } from '@/internals/utils';
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
  useToggleKeyDownEvent,
  PickerToggleProps
} from '@/internals/Picker';
import { TreeProvider, useTreeImperativeHandle } from '@/internals/Tree/TreeProvider';
import { TreeNode } from '@/internals/Tree/types';
import { useCustom } from '../CustomProvider';
import type { FormControlPickerProps, DeprecatedPickerProps } from '@/internals/types';
import type { TreeExtraProps } from '../Tree/types';

export interface TreePickerProps<V = number | string | null>
  extends TreeViewProps<V>,
    TreeExtraProps,
    DeprecatedPickerProps,
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

  /**
   * Custom popup style
   */
  popupClassName?: string;

  /**
   * Custom popup style
   */
  popupStyle?: React.CSSProperties;

  /**
   * The height of the tree
   */
  treeHeight?: number;

  /**
   * Popup auto width
   *
   * @default true
   */
  popupAutoWidth?: boolean;
}

/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
const TreePicker = forwardRef<'div', TreePickerProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('TreePicker', props);
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
    expandItemValues: controlledExpandItemValues,
    id,
    locale,
    labelKey = 'label',
    placeholder,
    placement = 'bottomStart',
    style,
    searchKeyword,
    searchable = true,
    showIndentLine,
    menuClassName: DEPRECATED_menuClassName,
    menuStyle: DEPRECATED_menuStyle,
    popupClassName,
    popupStyle,
    popupAutoWidth = true,
    treeHeight = 320,
    menuAutoWidth = popupAutoWidth,
    valueKey = 'value',
    virtualized = false,
    value: controlledValue,
    listProps,
    toggleAs,
    searchBy,
    getChildren,
    onClean,
    onSearch,
    onSelect,
    onSelectItem,
    onChange,
    onExpand,
    onEnter,
    onExit,
    onEntered,
    renderValue,
    renderMenu: DEPRECATED_renderMenu,
    renderTree = DEPRECATED_renderMenu,
    renderTreeIcon,
    renderTreeNode,
    renderExtraFooter,
    ...rest
  } = propsWithDefaults;

  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref);
  const [value, setValue] = useControlled(controlledValue, defaultValue);
  const itemDataKeys = { childrenKey, labelKey, valueKey };

  const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);
  const flattenedNodes = useFlattenTree(treeData, { ...itemDataKeys });

  const { expandItemValues, handleExpandTreeNode } = useExpandTree(data, {
    ...itemDataKeys,
    defaultExpandAll,
    defaultExpandItemValues,
    controlledExpandItemValues,
    onExpand,
    getChildren,
    appendChild
  });

  const { prefix, merge } = useClassNames(classPrefix);
  const activeNode = getTreeActiveNode(flattenedNodes, value, valueKey);

  const { register, focusFirstNode, focusActiveNode } = useTreeImperativeHandle();
  const { active, focusItemValue, setFocusItemValue, triggerProps } = useFocusState({
    focusActiveNode,
    target,
    value,
    onEnter,
    onExit,
    onEntered
  });

  const handleSelect = useEventCallback(
    (treeNode: TreeNode, value: string | number | null, event: React.SyntheticEvent) => {
      setFocusItemValue(value);
      onSelect?.(treeNode, value, event);

      target.current?.focus();
      trigger.current?.close?.();
    }
  );

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
    onMenuKeyDown(event, {
      del: handleClean,
      down: () => focusFirstNode(),
      enter: handleTreePressEnter
    });
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

  const treeContext = useMemo(
    () => ({
      register,
      props: { labelKey, valueKey, childrenKey, virtualized, renderTreeIcon, renderTreeNode }
    }),
    [childrenKey, labelKey, valueKey, virtualized, register, renderTreeIcon, renderTreeNode]
  );

  const tree = (
    <TreeProvider value={treeContext}>
      <TreeView
        ref={treeView}
        value={value}
        data={treeData}
        disabledItemValues={disabledItemValues}
        expandItemValues={expandItemValues}
        showIndentLine={showIndentLine}
        searchable={searchable}
        searchKeyword={searchKeyword}
        searchBy={searchBy}
        searchInputRef={searchInput}
        loadingNodeValues={loadingNodeValues}
        flattenedNodes={flattenedNodes}
        listProps={listProps}
        listRef={list}
        locale={locale}
        height={treeHeight}
        onExpand={handleExpandTreeNode}
        onSearch={onSearch}
        onChange={handleChange}
        onSelect={handleSelect}
        onSelectItem={onSelectItem}
        onFocusItem={setFocusItemValue}
      />
    </TreeProvider>
  );

  const renderTreeView = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = merge(className, DEPRECATED_menuClassName, popupClassName, prefix('tree-menu'));
    const mergedMenuStyle = { ...DEPRECATED_menuStyle, ...popupStyle, left, top };

    return (
      <PickerPopup
        autoWidth={menuAutoWidth}
        className={classes}
        style={mergedMenuStyle}
        ref={mergeRefs(overlay, speakerRef)}
        onKeyDown={onPickerKeydown}
        target={trigger}
      >
        {renderTree ? renderTree(tree) : tree}
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
      speaker={renderTreeView}
      {...triggerProps}
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
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

TreePicker.displayName = 'TreePicker';

export default TreePicker;
