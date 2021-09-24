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
  OverlayTriggerInstance,
  PositionChildProps,
  listPickerPropTypes,
  PickerComponent
} from '../Picker';

import { ItemDataType, FormControlPickerProps } from '../@types/common';

export type ValueType = number | string;
export interface CascaderProps<T = ValueType>
  extends FormControlPickerProps<T, PickerLocale, ItemDataType> {
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
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Asynchronously load the children of the tree node. */
  getChildren?: (node: ItemDataType) => ItemDataType[] | Promise<ItemDataType[]>;
}

const defaultProps: Partial<CascaderProps> = {
  as: 'div',
  classPrefix: 'picker',
  cleanable: true,
  placement: 'bottomStart',
  appearance: 'default',
  data: [],
  disabledItemValues: [],
  childrenKey: 'children',
  valueKey: 'value',
  labelKey: 'label',
  searchable: true
};

const Cascader: PickerComponent<CascaderProps> = React.forwardRef((props: CascaderProps, ref) => {
  const {
    as: Component,
    data,
    classPrefix,
    childrenKey,
    valueKey,
    labelKey,
    defaultValue,
    placeholder,
    disabled,
    disabledItemValues,
    cleanable,
    locale: overrideLocale,
    toggleAs,
    style,
    value: valueProp,
    inline,
    menuClassName,
    menuStyle,
    menuWidth,
    menuHeight,
    searchable,
    parentSelectable,
    placement,
    id,
    renderMenuItem,
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
  const [flattenData, setFlattenData] = useState<ItemDataType[]>(flattenTree(data, childrenKey));

  const triggerRef = useRef<OverlayTriggerInstance>();
  const overlayRef = useRef<HTMLDivElement>();
  const targetRef = useRef<HTMLButtonElement>();
  const searchInputRef = useRef<HTMLInputElement>();
  const [value, setValue] = useControlled<ValueType>(valueProp, defaultValue);

  const {
    selectedPaths,
    valueToPaths,
    columnData,
    addColumn,
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
    (keyword?: string) => {
      const items = [];
      const result = flattenData.filter(item => {
        if (item[childrenKey]) {
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
    [childrenKey, flattenData, someKeyword]
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
    (value: string, event: React.SyntheticEvent<HTMLElement>) => {
      const items = getSearchResult(value);

      setSearchKeyword(value);
      onSearch?.(value, event);
      if (items?.[0]) {
        setFocusItemValue(items?.[0]);
        setLayer(0);
        setKeys([]);
      }
    },
    [getSearchResult, onSearch, setFocusItemValue, setKeys, setLayer]
  );

  const handleEntered = useCallback(() => {
    onOpen?.();
    setActive(true);
  }, [onOpen]);

  const handleExited = useCallback(() => {
    onClose?.();
    setActive(false);
    setSearchKeyword('');
  }, [onClose]);

  const handleClose = useCallback(() => {
    triggerRef.current?.close();
  }, [triggerRef]);

  const handleClean = useCallback(
    (event: React.SyntheticEvent) => {
      if (disabled) {
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
        setValue(focusItemValue);
        setValueToPaths(selectedPaths);
        if (selectedPaths.length) {
          setLayer(selectedPaths.length - 1);
        }

        if (!shallowEqual(value, focusItemValue)) {
          onChange?.(focusItemValue, event);
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
    const nextValue = node[valueKey];

    onSelect?.(node, cascadePaths, event);
    setSelectedPaths(cascadePaths);

    // Lazy load node's children
    if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
      node.loading = true;

      const children = getChildren(node);

      if (children instanceof Promise) {
        children.then((data: ItemDataType[]) => {
          node.loading = false;
          node[childrenKey] = data;
          addColumn(data, cascadePaths.length);
        });
      } else {
        node.loading = false;
        node[childrenKey] = children;
        addColumn(children as ItemDataType[], cascadePaths.length);
      }
    } else if (node[childrenKey]?.length) {
      addColumn(node[childrenKey], cascadePaths.length);
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
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    const nextValue = node[valueKey];

    handleClose();
    setSearchKeyword('');
    setValue(nextValue);
    setValueToPaths(nodes);
    enforceUpdate(nextValue);

    onSelect?.(node, null, event);
    onChange?.(nextValue, event);
  };

  const renderSearchRow = (item: ItemDataType, key: number) => {
    const regx = new RegExp(getSafeRegExpString(searchKeyword), 'ig');
    const nodes = getNodeParents(item);
    nodes.push(item);
    const formattedNodes = nodes.map(node => {
      const labelElements = [];
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
      return { ...node, [labelKey]: labelElements };
    });

    const disabled = disabledItemValues.some(value =>
      formattedNodes.some(node => node[valueKey] === value)
    );
    const itemClasses = prefix('cascader-row', {
      'cascader-row-disabled': disabled,
      'cascader-row-focus': item[valueKey] === focusItemValue
    });

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
        {formattedNodes.map((node, index) => (
          <span key={`col-${index}`} className={prefix('cascader-col')}>
            {node[labelKey]}
          </span>
        ))}
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
    hasValue,
    name: 'cascader'
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
          disabled={disabled}
          onClean={createChainedFunction(handleClean, onClean)}
          onKeyDown={onPickerKeyDown}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={active}
          placement={placement}
          inputValue={value}
        >
          {selectedElement || locale?.placeholder}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

Cascader.displayName = 'Cascader';
Cascader.defaultProps = defaultProps;
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
  menuWidth: PropTypes.number,
  menuHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  searchable: PropTypes.bool,
  inline: PropTypes.bool,
  parentSelectable: PropTypes.bool
};

export default Cascader;
