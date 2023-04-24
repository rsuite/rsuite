import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useSet } from 'react-use-set';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import shallowEqual from '../utils/shallowEqual';
import DropdownMenu from './DropdownMenu';
import { findNodeOfTree, flattenTree } from '../utils/treeUtils';
import { getParentMap, getPathTowardsItem, usePaths } from './utils';
import { PickerLocale } from '../locales';
import {
  getSafeRegExpString,
  createChainedFunction,
  mergeRefs,
  useControlled,
  useCustom,
  useClassNames,
  useIsMounted
} from '../utils';

import {
  PickerToggle,
  PickerOverlay,
  SearchBar,
  PickerToggleTrigger,
  usePickerClassName,
  usePublicMethods,
  useToggleKeyDownEvent,
  useFocusItemValue,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  OverlayTriggerHandle,
  PositionChildProps,
  listPickerPropTypes,
  PickerHandle
} from '../Picker';

import { ItemDataType, FormControlPickerProps } from '../@types/common';
import { useMap } from '../utils/useMap';

export type ValueType = number | string;
export interface CascaderProps<T = ValueType>
  extends FormControlPickerProps<T | null, PickerLocale, ItemDataType<T>> {
  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number | string;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** The menu is displayed directly when the component is initialized */
  inline?: boolean;

  /** When true, make the parent node selectable */
  parentSelectable?: boolean;

  /** Custom render menu */
  renderMenu?: (
    items: readonly ItemDataType[],
    menu: React.ReactNode,
    parentNode?: any,
    layer?: number
  ) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: ItemDataType) => React.ReactNode;

  /** Custom render search items */
  renderSearchItem?: (itemLabel: React.ReactNode, items: ItemDataType[]) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: T,
    selectedPaths: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (
    value: ItemDataType,
    selectedPaths: ItemDataType[],
    event: React.SyntheticEvent
  ) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;

  /** Asynchronously load the children of the tree node. */
  getChildren?: (node: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}

export interface CascaderComponent {
  <T>(
    props: CascaderProps<T> & {
      ref?: React.Ref<PickerHandle>;
    }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: React.WeakValidationMap<CascaderProps<any>>;
}

const emptyArray = [];

const Cascader = React.forwardRef(<T extends number | string>(props: CascaderProps<T>, ref) => {
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
    locale: overrideLocale,
    toggleAs,
    style,
    value: valueProp,
    inline,
    menuClassName,
    menuStyle,
    menuWidth,
    menuHeight,
    searchable = true,
    parentSelectable,
    placement = 'bottomStart',
    id,
    renderMenuItem,
    renderSearchItem,
    renderValue,
    renderMenu,
    renderExtraFooter,
    onEnter,
    onExited,
    onClean,
    onChange,
    onSelect,
    onSearch,
    onClose,
    onOpen,
    getChildren,
    ...rest
  } = props;

  // Use component active state to support keyboard events.
  const [active, setActive] = useState(false);

  const triggerRef = useRef<OverlayTriggerHandle>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useControlled(valueProp, defaultValue) as [
    T | null | undefined,
    (value: React.SetStateAction<T | null>) => void,
    boolean
  ];

  const isMounted = useIsMounted();
  const loadingItemsSet = useSet();
  const asyncChildrenMap = useMap<ItemDataType<T>, readonly ItemDataType<T>[]>();
  const parentMap = useMemo(
    () =>
      getParentMap(
        data,
        item =>
          asyncChildrenMap.get(item) ??
          (item[childrenKey] as readonly ItemDataType<T>[] | undefined)
      ),
    [asyncChildrenMap, childrenKey, data]
  );

  const flattenedData = useMemo(
    () =>
      flattenTree(
        data,
        item =>
          asyncChildrenMap.get(item) ??
          (item[childrenKey] as readonly ItemDataType<T>[] | undefined)
      ),
    [asyncChildrenMap, childrenKey, data]
  );

  // The item that focus is on
  const [activeItem, setActiveItem] = useState<ItemDataType<T> | undefined>();

  const { columnsToDisplay, pathTowardsActiveItem, pathTowardsSelectedItem } = usePaths({
    data,
    activeItem,
    selectedItem: flattenedData.find(item => item[valueKey] === value),
    getParent: item => parentMap.get(item),
    getChildren: item =>
      asyncChildrenMap.get(item) ?? (item[childrenKey] as readonly ItemDataType<T>[] | undefined)
  });

  usePublicMethods(ref, { triggerRef, overlayRef, targetRef });

  const { locale, rtl } = useCustom<PickerLocale>('Picker', overrideLocale);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValue = pathTowardsSelectedItem.length > 0 || (!isNil(value) && isFunction(renderValue));

  const { prefix, merge } = useClassNames(classPrefix);

  const [searchKeyword, setSearchKeyword] = useState('');

  const someKeyword = useCallback(
    (item: ItemDataType<T>, keyword?: string) => {
      if (item[labelKey].match(new RegExp(getSafeRegExpString(keyword || searchKeyword), 'i'))) {
        return true;
      }

      const parent = parentMap.get(item);

      if (parent && someKeyword(parent)) {
        return true;
      }

      return false;
    },
    [labelKey, parentMap, searchKeyword]
  );

  const getSearchResult = useCallback(
    (keyword?: string): ItemDataType<T>[] => {
      const items: ItemDataType<T>[] = [];
      const result = flattenedData.filter(item => {
        if (!parentSelectable && item[childrenKey]) {
          return false;
        }
        return someKeyword(item, keyword);
      });

      for (let i = 0; i < result.length; i++) {
        items.push(result[i]);

        // A maximum of 100 search results are returned.
        if (i === 99) {
          return items;
        }
      }
      return items;
    },
    [childrenKey, flattenedData, someKeyword, parentSelectable]
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
    target: () => overlayRef.current,
    getParent: item => parentMap.get(item),
    callback: useCallback(
      value => {
        setActiveItem(flattenedData.find(item => item[valueKey] === value));
      },
      [flattenedData, setActiveItem, valueKey]
    )
  });

  const handleSearch = useCallback(
    (value: string, event: React.SyntheticEvent) => {
      const items = getSearchResult(value);

      setSearchKeyword(value);
      onSearch?.(value, event);
      if (items.length > 0) {
        setFocusItemValue(items[0][valueKey]);
        setLayer(0);
        setKeys([]);
      }
    },
    [getSearchResult, onSearch, setFocusItemValue, setKeys, setLayer, valueKey]
  );

  const handleEntered = useCallback(() => {
    if (!targetRef.current) {
      return;
    }

    onOpen?.();
    setActive(true);
  }, [onOpen]);

  const handleExited = useCallback(() => {
    if (!targetRef.current) {
      return;
    }

    onClose?.();
    setActive(false);
    setSearchKeyword('');
  }, [onClose]);

  const handleClose = useCallback(() => {
    triggerRef.current?.close();
  }, [triggerRef]);

  const handleClean = useCallback(
    (event: React.SyntheticEvent) => {
      if (disabled || !targetRef.current) {
        return;
      }

      setValue(null);
      onChange?.(null, event);
    },
    [disabled, onChange, setValue]
  );

  const handleMenuPressEnter = useCallback(
    (event: React.SyntheticEvent) => {
      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const isLeafNode = focusItem && !focusItem[childrenKey];

      if (isLeafNode) {
        setValue(focusItemValue as T | null);
        if (pathTowardsActiveItem.length) {
          setLayer(pathTowardsActiveItem.length - 1);
        }

        if (!shallowEqual(value, focusItemValue)) {
          onChange?.(focusItemValue ?? null, event);
        }
        handleClose();
      }
    },
    [
      childrenKey,
      data,
      focusItemValue,
      handleClose,
      onChange,
      pathTowardsActiveItem,
      setLayer,
      setValue,
      value,
      valueKey
    ]
  );

  const onPickerKeyDown = useToggleKeyDownEvent({
    toggle: !focusItemValue || !active,
    triggerRef,
    targetRef,
    overlayRef,
    searchInputRef,
    active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter,
    ...rest
  });

  const handleSelect = (
    node: ItemDataType<T>,
    cascadePaths: ItemDataType<T>[],
    isLeafNode: boolean,
    event: React.MouseEvent
  ) => {
    onSelect?.(node, cascadePaths, event);
    setActiveItem(node);

    const nextValue = node[valueKey];

    // Lazy load node's children
    if (
      typeof getChildren === 'function' &&
      node[childrenKey]?.length === 0 &&
      !asyncChildrenMap.has(node)
    ) {
      loadingItemsSet.add(node);

      const children = getChildren(node);

      if (children instanceof Promise) {
        children.then((data: readonly ItemDataType<T>[]) => {
          if (isMounted()) {
            loadingItemsSet.delete(node);
            asyncChildrenMap.set(node, data);
          }
        });
      } else {
        loadingItemsSet.delete(node);
        asyncChildrenMap.set(node, children);
      }
    }

    if (isLeafNode) {
      // Determines whether the option is a leaf node, and if so, closes the picker.
      handleClose();

      setValue(nextValue);

      if (!shallowEqual(value, nextValue)) {
        onChange?.(nextValue, event);
      }

      return;
    }

    /** When the parent is optional, the value and the displayed path are updated. */
    if (parentSelectable && !shallowEqual(value, nextValue)) {
      setValue(nextValue);
      onChange?.(nextValue, event);
    }

    // Update menu position
    triggerRef.current?.updatePosition();
  };

  /**
   * The search structure option is processed after being selected.
   */
  const handleSearchRowSelect = (
    node: ItemDataType,
    nodes: ItemDataType<T>[],
    event: React.SyntheticEvent
  ) => {
    const nextValue = node[valueKey];

    handleClose();
    setSearchKeyword('');
    setValue(nextValue);

    onSelect?.(node, nodes, event);
    onChange?.(nextValue, event);
  };

  const renderSearchRow = (item: ItemDataType<T>, key: number) => {
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    const nodes = getPathTowardsItem(item, item => parentMap.get(item));
    const formattedNodes = nodes.map(node => {
      const labelElements: React.ReactElement[] = [];
      const a = node[labelKey].split(regx);
      const b = node[labelKey].match(regx);

      for (let i = 0; i < a.length; i++) {
        labelElements.push(a[i]);
        if (b && b[i]) {
          labelElements.push(
            <span key={i} className={prefix('cascader-search-match')}>
              {b[i]}
            </span>
          );
        }
      }
      return {
        ...node,
        [labelKey]: labelElements
      };
    });

    const disabled = disabledItemValues.some(value =>
      formattedNodes.some(node => node[valueKey] === value)
    );
    const itemClasses = prefix('cascader-row', {
      'cascader-row-disabled': disabled,
      'cascader-row-focus': item[valueKey] === focusItemValue
    });

    const label = formattedNodes.map((node, index) => (
      <span key={`col-${index}`} className={prefix('cascader-col')}>
        {node[labelKey]}
      </span>
    ));

    return (
      <div
        key={key}
        aria-disabled={disabled}
        data-key={item[valueKey]}
        className={itemClasses}
        onClick={event => {
          if (!disabled) {
            handleSearchRowSelect(item, nodes, event);
          }
        }}
      >
        {renderSearchItem ? renderSearchItem(label, nodes) : label}
      </div>
    );
  };

  const renderSearchResultPanel = () => {
    if (searchKeyword === '') {
      return null;
    }

    const items = getSearchResult();
    return (
      <div className={prefix('cascader-search-panel')} data-layer={0}>
        {items.length ? (
          items.map(renderSearchRow)
        ) : (
          <div className={prefix('none')}>{locale.noResultsText}</div>
        )}
      </div>
    );
  };

  const renderDropdownMenu = (positionProps?: PositionChildProps, speakerRef?) => {
    const { left, top, className } = positionProps || {};
    const styles = { ...menuStyle, left, top };
    const classes = merge(className, menuClassName, prefix('cascader-menu', { inline }));

    return (
      <PickerOverlay
        ref={mergeRefs(overlayRef, speakerRef)}
        className={classes}
        style={styles}
        target={triggerRef}
        onKeyDown={onPickerKeyDown}
      >
        {searchable && (
          <SearchBar
            placeholder={locale?.searchPlaceholder}
            onChange={handleSearch}
            value={searchKeyword}
            inputRef={searchInputRef}
          />
        )}

        {renderSearchResultPanel()}
        {searchKeyword === '' && (
          <DropdownMenu
            id={id ? `${id}-listbox` : undefined}
            menuWidth={menuWidth}
            menuHeight={menuHeight}
            disabledItemValues={disabledItemValues}
            loadingItemsSet={loadingItemsSet}
            valueKey={valueKey}
            labelKey={labelKey}
            childrenKey={childrenKey}
            classPrefix={'picker-cascader-menu'}
            cascadeData={columnsToDisplay}
            cascadePaths={pathTowardsActiveItem}
            activeItemValue={value}
            // FIXME make onSelect generic
            onSelect={handleSelect as any}
            renderMenu={renderMenu}
            renderMenuItem={renderMenuItem}
          />
        )}
        {renderExtraFooter?.()}
      </PickerOverlay>
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

  // TODO: bad api design
  //       consider an isolated Menu component
  if (inline) {
    return renderDropdownMenu();
  }

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={triggerRef}
      placement={placement}
      onEntered={createChainedFunction(handleEntered, onEnter)}
      onExited={createChainedFunction(handleExited, onExited)}
      speaker={renderDropdownMenu}
    >
      <Component className={classes} style={style}>
        <PickerToggle
          {...omit(rest, [...omitTriggerPropKeys, ...usedClassNamePropKeys])}
          id={id}
          ref={targetRef}
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
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
}) as CascaderComponent;

Cascader.displayName = 'Cascader';
Cascader.propTypes = {
  ...listPickerPropTypes,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: PropTypes.oneOf(['default', 'subtle']),
  renderMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onSearch: PropTypes.func,
  cleanable: PropTypes.bool,
  renderMenuItem: PropTypes.func,
  renderSearchItem: PropTypes.func,
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchable: PropTypes.bool,
  inline: PropTypes.bool,
  parentSelectable: PropTypes.bool
};

export default Cascader;
