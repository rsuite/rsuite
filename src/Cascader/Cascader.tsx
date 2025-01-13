import React, { useCallback, useMemo } from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import TreeView from '../CascadeTree/TreeView';
import SearchView from '../CascadeTree/SearchView';
import type { SelectNode, CascadeTreeProps } from '../CascadeTree/types';
import { usePaths, useSelect, useSearch } from '../CascadeTree/hooks';
import { flattenTree } from '../Tree/utils';
import { findNodeOfTree, getParentMap } from '@/internals/Tree/utils';
import { PickerLocale } from '../locales';
import { useControlled, useClassNames, useEventCallback, useMap } from '@/internals/hooks';
import { forwardRef, createChainedFunction, mergeRefs, shallowEqual } from '@/internals/utils';
import {
  PickerToggle,
  PickerPopup,
  PickerToggleTrigger,
  usePickerClassName,
  usePickerRef,
  useToggleKeyDownEvent,
  useFocusItemValue,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  PickerToggleProps
} from '@/internals/Picker';
import { ItemDataType, DataItemValue, FormControlPickerProps } from '@/internals/types';
import { useCustom } from '../CustomProvider';
import useActive from './useActive';

export interface CascaderProps<T = DataItemValue>
  extends FormControlPickerProps<T, PickerLocale, ItemDataType<T>>,
    CascadeTreeProps<T, T, PickerLocale>,
    Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
  /**
   * The panel is displayed directly when the component is initialized
   * @deprecated Use CascadeTree instead
   * @see CascadeTree https://rsuitejs.com/components/cascade-tree
   */
  inline?: boolean;

  /**
   * When true, make the parent node selectable
   */
  parentSelectable?: boolean;

  /**
   * Custom popup style
   */
  popupClassName?: string;

  /**
   * Custom popup style
   */
  popupStyle?: React.CSSProperties;

  /**
   * Custom menu class name
   * @deprecated Use popupClassName instead
   */
  menuClassName?: string;

  /**
   * Custom menu style
   * @deprecated Use popupStyle instead
   */
  menuStyle?: React.CSSProperties;

  /**
   * Sets the width of the menu.
   *
   * @deprecated Use columnWidth instead
   */
  menuWidth?: number;

  /**
   * Sets the height of the menu
   * @deprecated Use columnHeight instead
   */
  menuHeight?: number | string;

  /**
   * Custom render menu
   * @deprecated Use renderColumn instead
   */
  renderMenu?: (
    items: readonly ItemDataType<T>[],
    menu: React.ReactNode,
    parentNode?: any,
    layer?: number
  ) => React.ReactNode;

  /**
   * Custom render menu item
   * @deprecated Use renderTreeNode instead
   */
  renderMenuItem?: (node: React.ReactNode, item: ItemDataType<T>) => React.ReactNode;

  /**
   * Custom render selected items
   */
  renderValue?: (
    value: T,
    selectedPaths: ItemDataType<T>[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /**
   * Called when clean
   */
  onClean?: (event: React.SyntheticEvent) => void;
}

const emptyArray = [];

export interface CascaderComponent {
  <T>(props: CascaderProps<T>): JSX.Element | null;
  displayName?: string;
}

/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
const Cascader = forwardRef<'div', CascaderProps>(
  <T extends DataItemValue>(props: CascaderProps<T>, ref) => {
    const { rtl, propsWithDefaults } = useCustom('Cascader', props);
    const {
      as: Component = 'div',
      data = emptyArray,
      classPrefix = 'picker',
      childrenKey = 'children',
      valueKey = 'value',
      labelKey = 'label',
      defaultValue,
      placeholder,
      disabled,
      disabledItemValues = emptyArray,
      appearance = 'default',
      cleanable = true,
      locale,
      toggleAs,
      style,
      value: valueProp,
      popupClassName,
      popupStyle,
      columnHeight,
      columnWidth,
      searchable = true,
      parentSelectable,
      placement = 'bottomStart',
      id,
      renderColumn,
      renderTreeNode,
      renderSearchItem,
      renderValue,
      renderExtraFooter,
      onEntered,
      onExited,
      onClean,
      onChange,
      onSelect,
      onSearch,
      getChildren,
      menuClassName: DEPRECATED_menuClassName,
      menuStyle: DEPRECATED_menuStyle,
      menuWidth: DEPRECATED_menuWidth,
      menuHeight: DEPRECATED_menuHeight,
      renderMenuItem: DEPRECATED_renderMenuItem,
      renderMenu: DEPRECATED_renderMenu,
      ...rest
    } = propsWithDefaults;

    const { trigger, root, target, overlay, searchInput } = usePickerRef(ref);
    const [value, setValue] = useControlled(valueProp, defaultValue) as [
      T | null | undefined,
      (value: React.SetStateAction<T | null>) => void,
      boolean
    ];

    // Store the children of each node
    const childrenMap = useMap<ItemDataType<T>, readonly ItemDataType<T>[]>();

    // Store the parent of each node
    const parentMap = useMemo(
      () => getParentMap(data, item => childrenMap.get(item) ?? item[childrenKey]),
      [childrenMap, childrenKey, data]
    );

    // Flatten the tree data
    const flattenedData = useMemo(
      () => flattenTree(data, item => childrenMap.get(item) ?? item[childrenKey]),
      [childrenMap, childrenKey, data]
    );

    // The selected item
    const selectedItem = flattenedData.find(item => item[valueKey] === value);

    // Callback function after selecting the node
    const onSelectCallback = (node: SelectNode<T>, event: React.SyntheticEvent) => {
      const { isLeafNode, cascadePaths, itemData } = node;

      onSelect?.(itemData, cascadePaths, event);

      const nextValue = itemData[valueKey];

      if (isLeafNode) {
        // Determines whether the option is a leaf node, and if so, closes the picker.
        handleClose();
        setValue(nextValue);
        return;
      }

      //  When the parent is optional, the value and the displayed path are updated.
      if (parentSelectable && !shallowEqual(value, nextValue)) {
        setValue(nextValue);
        onChange?.(nextValue, event);
      }

      // Update menu position
      trigger.current?.updatePosition();
    };

    const { activeItem, setActiveItem, loadingItemsSet, handleSelect } = useSelect<T>({
      value,
      valueKey,
      childrenKey,
      childrenMap,
      selectedItem,
      getChildren,
      onChange,
      onSelect: onSelectCallback
    });

    const { columns, pathTowardsActiveItem, pathTowardsSelectedItem } = usePaths({
      data,
      activeItem,
      selectedItem,
      getParent: item => parentMap.get(item),
      getChildren: item =>
        childrenMap.get(item) ?? (item[childrenKey] as readonly ItemDataType<T>[] | undefined)
    });

    /**
     * 1.Have a value and the value is valid.
     * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
     */
    let hasValue = pathTowardsSelectedItem.length > 0 || (!isNil(value) && isFunction(renderValue));

    const { prefix, merge } = useClassNames(classPrefix);

    const onFocusItemCallback = useCallback(
      value => {
        setActiveItem(flattenedData.find(item => item[valueKey] === value));
      },
      [flattenedData, setActiveItem, valueKey]
    );

    // Used to hover the focuse item  when trigger `onKeydown`
    const {
      focusItemValue,
      setFocusItemValue,
      setLayer,
      setKeys,
      onKeyDown: onFocusItem
    } = useFocusItemValue(value, {
      rtl,
      data: flattenedData,
      valueKey,
      defaultLayer: pathTowardsSelectedItem?.length ? pathTowardsSelectedItem.length - 1 : 0,
      target: () => overlay.current,
      getParent: item => parentMap.get(item),
      callback: onFocusItemCallback
    });

    const onSearchCallback = (
      value: string,
      items: ItemDataType<T>[],
      event: React.SyntheticEvent
    ) => {
      onSearch?.(value, event);

      if (!value || items.length === 0) {
        setFocusItemValue(undefined);
        return;
      }

      if (items.length > 0) {
        setFocusItemValue(items[0][valueKey]);
        setLayer(0);
        setKeys([]);
      }
    };

    const { items, searchKeyword, setSearchKeyword, handleSearch } = useSearch({
      labelKey,
      childrenKey,
      parentMap,
      flattenedData,
      parentSelectable,
      onSearch: onSearchCallback
    });

    const { active, handleEntered, handleExited } = useActive({
      onEntered,
      onExited,
      target,
      setSearchKeyword
    });

    const handleClose = useEventCallback(() => {
      trigger.current?.close();

      // The focus is on the trigger button after closing
      target.current?.focus?.();
    });

    const handleClean = useEventCallback((event: React.SyntheticEvent) => {
      if (disabled || !target.current) {
        return;
      }

      setValue(null);
      onChange?.(null as T, event);
    });

    const handleMenuPressEnter = useEventCallback((event: React.SyntheticEvent) => {
      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const isLeafNode = focusItem && !focusItem[childrenKey];

      if (isLeafNode) {
        setValue(focusItemValue as T);
        if (pathTowardsActiveItem.length) {
          setLayer(pathTowardsActiveItem.length - 1);
        }

        if (!shallowEqual(value, focusItemValue)) {
          onSelect?.(focusItem as ItemDataType<T>, pathTowardsActiveItem, event);
          onChange?.(focusItemValue ?? (null as T), event);
        }
        handleClose();
      }
    });

    const onPickerKeyDown = useToggleKeyDownEvent({
      toggle: !focusItemValue || !active,
      trigger,
      target,
      overlay,
      searchInput,
      active,
      onExit: handleClean,
      onMenuKeyDown: onFocusItem,
      onMenuPressEnter: handleMenuPressEnter,
      ...rest
    });

    /**
     * The search structure option is processed after being selected.
     */
    const handleSearchRowSelect = useEventCallback(
      (itemData: ItemDataType<T>, nodes: ItemDataType<T>[], event: React.SyntheticEvent) => {
        const nextValue = itemData[valueKey];

        handleClose();
        setSearchKeyword('');
        setValue(nextValue);

        onSelect?.(itemData, nodes, event);
        onChange?.(nextValue, event);
      }
    );

    const renderCascadeColumn = (
      childNodes: React.ReactNode,
      column: {
        items: readonly ItemDataType<T>[];
        parentItem?: ItemDataType<T>;
        layer?: number;
      }
    ) => {
      const { items, parentItem, layer } = column;

      if (typeof renderColumn === 'function') {
        return renderColumn(childNodes, column);
      } else if (typeof DEPRECATED_renderMenu === 'function') {
        return DEPRECATED_renderMenu(items, childNodes, parentItem, layer);
      }
      return childNodes;
    };

    const renderCascadeTreeNode = (node: React.ReactNode, itemData: ItemDataType<T>) => {
      const render =
        typeof renderTreeNode === 'function' ? renderTreeNode : DEPRECATED_renderMenuItem;

      if (typeof render === 'function') {
        return render(node, itemData);
      }
      return node;
    };

    const renderTreeView = (positionProps?: PositionChildProps, speakerRef?) => {
      const { left, top, className } = positionProps || {};
      const styles = { ...DEPRECATED_menuStyle, ...popupStyle, left, top };
      const classes = merge(
        className,
        DEPRECATED_menuClassName,
        popupClassName,
        prefix('popup-cascader')
      );

      return (
        <PickerPopup
          ref={mergeRefs(overlay, speakerRef)}
          className={classes}
          style={styles}
          target={trigger}
          onKeyDown={onPickerKeyDown}
        >
          {searchable && (
            <SearchView<T>
              data={items}
              searchKeyword={searchKeyword}
              valueKey={valueKey}
              labelKey={labelKey}
              locale={locale}
              parentMap={parentMap}
              disabledItemValues={disabledItemValues}
              focusItemValue={focusItemValue}
              inputRef={searchInput}
              renderSearchItem={renderSearchItem}
              onSelect={handleSearchRowSelect}
              onSearch={handleSearch}
            />
          )}

          {searchKeyword === '' && (
            <TreeView
              columnWidth={columnWidth ?? DEPRECATED_menuWidth}
              columnHeight={columnHeight ?? DEPRECATED_menuHeight}
              disabledItemValues={disabledItemValues}
              loadingItemsSet={loadingItemsSet}
              valueKey={valueKey}
              labelKey={labelKey}
              childrenKey={childrenKey}
              classPrefix={'cascade-tree'}
              data={columns}
              cascadePaths={pathTowardsActiveItem}
              activeItemValue={value}
              onSelect={handleSelect}
              renderColumn={renderCascadeColumn}
              renderTreeNode={renderCascadeTreeNode}
            />
          )}
          {renderExtraFooter?.()}
        </PickerPopup>
      );
    };

    let selectedElement: any = placeholder;

    if (pathTowardsSelectedItem.length > 0) {
      selectedElement = [];

      pathTowardsSelectedItem.forEach((item, index) => {
        const key = item[valueKey] || item[labelKey];
        selectedElement.push(<span key={key}>{item[labelKey]}</span>);
        if (index < pathTowardsSelectedItem.length - 1) {
          selectedElement.push(
            <span className="separator" key={`${key}-separator`}>
              {' / '}
            </span>
          );
        }
      });
    }

    if (!isNil(value) && isFunction(renderValue)) {
      selectedElement = renderValue(value, pathTowardsSelectedItem, selectedElement);
      // If renderValue returns null or undefined, hasValue is false.
      if (isNil(selectedElement)) {
        hasValue = false;
      }
    }

    const [classes, usedClassNamePropKeys] = usePickerClassName({
      ...props,
      classPrefix,
      hasValue,
      name: 'cascader',
      appearance,
      cleanable
    });

    return (
      <PickerToggleTrigger
        id={id}
        popupType="tree"
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={trigger}
        placement={placement}
        onEntered={handleEntered}
        onExited={handleExited}
        speaker={renderTreeView}
      >
        <Component className={classes} style={style} ref={root}>
          <PickerToggle
            {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
            ref={target}
            as={toggleAs}
            appearance={appearance}
            disabled={disabled}
            onClean={createChainedFunction(handleClean, onClean)}
            onKeyDown={onPickerKeyDown}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={active}
            placement={placement}
            inputValue={value ?? ''}
            focusItemValue={focusItemValue}
          >
            {selectedElement || locale?.placeholder}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
) as CascaderComponent;

Cascader.displayName = 'Cascader';

export default Cascader;
