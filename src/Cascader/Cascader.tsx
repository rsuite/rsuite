import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import shallowEqual from '../utils/shallowEqual';
import DropdownMenu from './DropdownMenu';
import { findNodeOfTree, flattenTree, getNodeParents } from '../utils/treeUtils';
import { usePaths } from './utils';
import { PickerLocale } from '../locales';
import {
  getSafeRegExpString,
  createChainedFunction,
  mergeRefs,
  useControlled,
  useCustom,
  useClassNames
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
    items: ItemDataType[],
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
  getChildren?: (node: ItemDataType) => ItemDataType[] | Promise<ItemDataType[]>;
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
  const [flattenData, setFlattenData] = useState<ItemDataType<T>[]>(flattenTree(data, childrenKey));

  const triggerRef = useRef<OverlayTriggerHandle>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useControlled(valueProp, defaultValue) as [
    T | null | undefined,
    (value: React.SetStateAction<T | null>) => void,
    boolean
  ];

  const {
    selectedPaths,
    valueToPaths,
    columnData,
    addColumn,
    romoveColumnByIndex,
    setValueToPaths,
    setColumnData,
    setSelectedPaths,
    enforceUpdate
  } = usePaths({
    data,
    valueKey,
    childrenKey,
    value
  });

  useEffect(() => {
    setFlattenData(flattenTree(data, childrenKey));
  }, [data, childrenKey]);

  usePublicMethods(ref, { triggerRef, overlayRef, targetRef });

  const { locale, rtl } = useCustom<PickerLocale>('Picker', overrideLocale);
  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  let hasValue = valueToPaths.length > 0 || (!isNil(value) && isFunction(renderValue));

  const { prefix, merge } = useClassNames(classPrefix);

  const [searchKeyword, setSearchKeyword] = useState('');

  const someKeyword = useCallback(
    (item: ItemDataType, keyword?: string) => {
      if (item[labelKey].match(new RegExp(getSafeRegExpString(keyword || searchKeyword), 'i'))) {
        return true;
      }

      if (item.parent && someKeyword(item.parent)) {
        return true;
      }

      return false;
    },
    [labelKey, searchKeyword]
  );

  const getSearchResult = useCallback(
    (keyword?: string): ItemDataType[] => {
      const items: ItemDataType[] = [];
      const result = flattenData.filter(item => {
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
    [childrenKey, flattenData, someKeyword, parentSelectable]
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
    data: flattenData,
    valueKey,
    defaultLayer: valueToPaths?.length ? valueToPaths.length - 1 : 0,
    target: () => overlayRef.current,
    callback: useCallback(
      value => {
        enforceUpdate(value, true);
      },
      [enforceUpdate]
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

      setColumnData([data]);
      setValue(null);
      setSelectedPaths([]);
      setValueToPaths([]);
      onChange?.(null, event);
    },
    [data, disabled, onChange, setSelectedPaths, setColumnData, setValueToPaths, setValue]
  );

  const handleMenuPressEnter = useCallback(
    (event: React.SyntheticEvent) => {
      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const isLeafNode = focusItem && !focusItem[childrenKey];

      if (isLeafNode) {
        setValue(focusItemValue as T | null);
        setValueToPaths(selectedPaths);
        if (selectedPaths.length) {
          setLayer(selectedPaths.length - 1);
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
      selectedPaths,
      setLayer,
      setValue,
      setValueToPaths,
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
    node: ItemDataType,
    cascadePaths: ItemDataType[],
    isLeafNode: boolean,
    event: React.MouseEvent
  ) => {
    onSelect?.(node, cascadePaths, event);
    setSelectedPaths(cascadePaths);

    const nextValue = node[valueKey];
    const columnIndex = cascadePaths.length;

    // Lazy load node's children
    if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
      node.loading = true;

      const children = getChildren(node);

      if (children instanceof Promise) {
        children.then((data: ItemDataType[]) => {
          node.loading = false;
          node[childrenKey] = data;
          if (targetRef.current) {
            addColumn(data, columnIndex);
          }
        });
      } else {
        node.loading = false;
        node[childrenKey] = children;
        addColumn(children as ItemDataType[], columnIndex);
      }
    } else if (node[childrenKey]?.length) {
      addColumn(node[childrenKey], columnIndex);
    } else {
      // Removes subsequent columns of the current column when the clicked node is a leaf node.
      romoveColumnByIndex(columnIndex);
    }

    if (isLeafNode) {
      // Determines whether the option is a leaf node, and if so, closes the picker.
      handleClose();

      // Update the selected path to the value path.
      // That is, the selected path will be displayed on the button after clicking the child node.
      setValueToPaths(cascadePaths);
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
      setValueToPaths(cascadePaths);
    }

    // Update menu position
    triggerRef.current?.updatePosition();
  };

  /**
   * The search structure option is processed after being selected.
   */
  const handleSearchRowSelect = (
    node: ItemDataType,
    nodes: ItemDataType[],
    event: React.SyntheticEvent
  ) => {
    const nextValue = node[valueKey];

    handleClose();
    setSearchKeyword('');
    setValue(nextValue);
    setValueToPaths(nodes);
    enforceUpdate(nextValue);

    onSelect?.(node, nodes, event);
    onChange?.(nextValue, event);
  };

  const renderSearchRow = (item: ItemDataType, key: number) => {
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    const nodes = getNodeParents(item);
    nodes.push(item);
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
            valueKey={valueKey}
            labelKey={labelKey}
            childrenKey={childrenKey}
            classPrefix={'picker-cascader-menu'}
            cascadeData={columnData}
            cascadePaths={selectedPaths}
            activeItemValue={value}
            onSelect={handleSelect}
            renderMenu={renderMenu}
            renderMenuItem={renderMenuItem}
          />
        )}
        {renderExtraFooter?.()}
      </PickerOverlay>
    );
  };

  let selectedElement: any = placeholder;

  if (valueToPaths.length > 0) {
    selectedElement = [];

    valueToPaths.forEach((item, index) => {
      const key = item[valueKey] || item[labelKey];
      selectedElement.push(<span key={key}>{item[labelKey]}</span>);
      if (index < valueToPaths.length - 1) {
        selectedElement.push(
          <span className="separator" key={`${key}-separator`}>
            {' / '}
          </span>
        );
      }
    });
  }

  if (!isNil(value) && isFunction(renderValue)) {
    selectedElement = renderValue(value, valueToPaths, selectedElement);
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
