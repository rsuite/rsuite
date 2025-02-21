import React, { useMemo } from 'react';
import classNames from 'classnames';
import CheckTreeView, { type CheckTreeViewProps } from '../CheckTree/CheckTreeView';
import useTreeValue from '../CheckTree/hooks/useTreeValue';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useExpandTree from '../Tree/hooks/useExpandTree';
import useFocusState from './hooks/useFocusState';
import isNil from 'lodash/isNil';
import pick from 'lodash/pick';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import { PickerLocale } from '../locales';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import { forwardRef, createChainedFunction, mergeRefs } from '@/internals/utils';
import {
  PickerToggle,
  onMenuKeyDown,
  PickerPopup,
  SelectedElement,
  PickerToggleTrigger,
  PickerToggleProps,
  usePickerClassName,
  useToggleKeyDownEvent,
  usePickerRef,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps
} from '@/internals/Picker';
import { getSelectedItems } from '../CheckTree/utils';
import { TreeProvider, useTreeImperativeHandle } from '@/internals/Tree/TreeProvider';
import { useCustom } from '../CustomProvider';
import type { TreeNode } from '@/internals/Tree/types';
import type {
  FormControlPickerProps,
  ItemDataType,
  DeprecatedPickerProps
} from '@/internals/types';
import type { TreeExtraProps } from '../Tree/types';

export type ValueType = (string | number)[];
export interface CheckTreePickerProps<V = ValueType>
  extends Omit<CheckTreeViewProps<V>, 'value' | 'onChange' | 'data'>,
    TreeExtraProps,
    DeprecatedPickerProps,
    FormControlPickerProps<V, PickerLocale, ItemDataType>,
    Pick<PickerToggleProps, 'caretAs' | 'loading'> {
  /**
   * A picker that can be counted
   */
  countable?: boolean;

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

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: V,
    selectedNodes: TreeNode[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
const CheckTreePicker = forwardRef<'div', CheckTreePickerProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('CheckTreePicker', props);
  const {
    as: Component = 'div',
    id,
    appearance = 'default',
    cleanable = true,
    countable = true,
    cascade = true,
    classPrefix = 'picker',
    childrenKey = 'children',
    disabled,
    data = [],
    defaultValue = [],
    defaultExpandAll = false,
    disabledItemValues = [],
    expandItemValues: controlledExpandItemValues,
    defaultExpandItemValues = [],
    placeholder,
    popupClassName,
    popupStyle,
    popupAutoWidth = true,
    placement = 'bottomStart',
    treeHeight = 320,
    toggleAs,
    menuAutoWidth = popupAutoWidth,
    menuClassName: DEPRECATED_menuClassName,
    menuStyle: DEPRECATED_menuStyle,
    style,
    searchBy,
    searchKeyword,
    showIndentLine,
    searchable = true,
    valueKey = 'value',
    value: controlledValue,
    virtualized = false,
    uncheckableItemValues = [],
    locale,
    labelKey = 'label',
    listProps,
    getChildren,
    renderExtraFooter,
    onEnter,
    onChange,
    onClean,
    onExit,
    onSearch,
    onSelect,
    onSelectItem,
    onScroll,
    onExpand,
    renderValue,
    renderMenu: DEPRECATED_renderMenu,
    renderTree = DEPRECATED_renderMenu,
    renderTreeIcon,
    renderTreeNode,
    ...rest
  } = propsWithDefaults;

  const { trigger, root, target, overlay, list, searchInput, treeView } = usePickerRef(ref);
  const { prefix } = useClassNames(classPrefix);

  const [value, setValue] = useTreeValue(controlledValue, {
    defaultValue,
    uncheckableItemValues
  });

  const itemDataKeys = { childrenKey, labelKey, valueKey };
  const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);

  const { expandItemValues, handleExpandTreeNode } = useExpandTree(data, {
    ...itemDataKeys,
    defaultExpandAll,
    defaultExpandItemValues,
    controlledExpandItemValues,
    onExpand,
    getChildren,
    appendChild
  });

  const flattenedNodes = useFlattenTree(treeData, {
    ...itemDataKeys,
    uncheckableItemValues,
    multiple: true,
    cascade,
    value
  });

  const selectedNodes = getSelectedItems(flattenedNodes, value);
  const { register, focusFirstNode } = useTreeImperativeHandle();
  const { focusItemValue, setFocusItemValue, active, triggerProps } = useFocusState({
    target,
    onEnter,
    onExit
  });

  const handleClean = useEventCallback((event: React.SyntheticEvent) => {
    const target = event.target as Element;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }

    setFocusItemValue(null);
    setValue([]);
    onChange?.([], event);
  });

  const handleTreeKeyDown = useEventCallback((event: React.KeyboardEvent<any>) => {
    onMenuKeyDown(event, { del: handleClean, down: () => focusFirstNode() });
  });

  const onPickerKeydown = useToggleKeyDownEvent({
    toggle: !focusItemValue || !active,
    trigger,
    target,
    overlay,
    searchInput,
    active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown,
    ...rest
  });

  const handleChange = useEventCallback((nextValue: ValueType, event: React.SyntheticEvent) => {
    setValue(nextValue);
    onChange?.(nextValue, event);
  });

  const treeContext = useMemo(
    () => ({
      register,
      props: { labelKey, valueKey, childrenKey, virtualized, renderTreeIcon, renderTreeNode }
    }),
    [childrenKey, labelKey, valueKey, virtualized, register, renderTreeIcon, renderTreeNode]
  );

  const checkTreeView = (
    <TreeProvider value={treeContext}>
      <CheckTreeView
        ref={treeView}
        disabledItemValues={disabledItemValues}
        expandItemValues={expandItemValues}
        uncheckableItemValues={uncheckableItemValues}
        cascade={cascade}
        data={treeData}
        height={treeHeight}
        showIndentLine={showIndentLine}
        listProps={listProps}
        listRef={list}
        locale={locale}
        searchBy={searchBy}
        searchable={searchable}
        searchKeyword={searchKeyword}
        searchInputRef={searchInput}
        onScroll={onScroll}
        onSelect={onSelect}
        onSelectItem={onSelectItem}
        onExpand={handleExpandTreeNode}
        onSearch={onSearch}
        onChange={handleChange}
        onFocusItem={setFocusItemValue}
        value={value}
        loadingNodeValues={loadingNodeValues}
        flattenedNodes={flattenedNodes}
      />
    </TreeProvider>
  );

  const renderTreeView = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = classNames(
      className,
      popupClassName,
      DEPRECATED_menuClassName,
      prefix('check-tree-menu')
    );
    const mergedMenuStyle = { ...popupStyle, ...DEPRECATED_menuStyle, left, top };

    return (
      <PickerPopup
        ref={mergeRefs(overlay, speakerRef)}
        autoWidth={menuAutoWidth}
        className={classes}
        style={mergedMenuStyle}
        onKeyDown={onPickerKeydown}
        target={trigger}
      >
        {renderTree ? renderTree(checkTreeView) : checkTreeView}
        {renderExtraFooter?.()}
      </PickerPopup>
    );
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValidValue = selectedNodes.length > 0 || (value.length > 0 && isFunction(renderValue));
  let selectedElement: React.ReactNode = placeholder;

  if (hasValidValue) {
    selectedElement = (
      <SelectedElement
        selectedItems={selectedNodes}
        countable={countable}
        valueKey={valueKey}
        labelKey={labelKey}
        childrenKey={childrenKey}
        prefix={prefix}
        cascade={cascade}
        locale={locale}
      />
    );
    if (isFunction(renderValue)) {
      selectedElement = renderValue(value, selectedNodes, selectedElement);
      if (isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }

  const [classes, usedClassNamePropKeys] = usePickerClassName({
    ...props,
    classPrefix,
    appearance,
    countable,
    cleanable,
    disabled,
    hasValue: hasValidValue,
    name: 'check-tree'
  });

  return (
    <PickerToggleTrigger
      id={id}
      popupType="tree"
      multiple
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={trigger}
      placement={placement}
      speaker={renderTreeView}
      {...triggerProps}
    >
      <Component className={classes} style={style} ref={root}>
        <PickerToggle
          {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
          ref={target}
          appearance={appearance}
          onKeyDown={onPickerKeydown}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          disabled={disabled}
          as={toggleAs}
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

CheckTreePicker.displayName = 'CheckTreePicker';

export default CheckTreePicker;
