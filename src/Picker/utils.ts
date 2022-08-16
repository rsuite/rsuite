import React, { useState, useImperativeHandle, useCallback } from 'react';
import kebabCase from 'lodash/kebabCase';
import trim from 'lodash/trim';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import find from 'lodash/find';
import { OverlayTriggerHandle } from './PickerToggleTrigger';
import { findNodeOfTree, filterNodesOfTree } from '../utils/treeUtils';
import {
  KEY_VALUES,
  useClassNames,
  shallowEqual,
  reactToString,
  placementPolyfill
} from '../utils';
import { TypeAttributes, ItemDataType } from '../@types/common';
import type { ListHandle } from '../Windowing';
import type { PickerHandle } from './types';

export interface NodeKeys {
  valueKey: string;
  childrenKey: string;
}

const defaultNodeKeys = {
  valueKey: 'value',
  childrenKey: 'children'
};

export function createConcatChildrenFunction<T = any>(
  node: any,
  nodeValue?: any,
  nodeKeys: NodeKeys = defaultNodeKeys
) {
  const { valueKey, childrenKey } = nodeKeys;
  return (data: T[], children: T[]): T[] => {
    if (nodeValue) {
      node = findNodeOfTree(data, item => nodeValue === item[valueKey]);
    }
    node[childrenKey] = children;
    return data.concat([]);
  };
}

export function shouldDisplay(label: React.ReactNode, searchKeyword: string) {
  if (!trim(searchKeyword)) {
    return true;
  }
  const keyword = searchKeyword.toLocaleLowerCase();
  if (typeof label === 'string' || typeof label === 'number') {
    return `${label}`.toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (React.isValidElement(label)) {
    const nodes = reactToString(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }
  return false;
}

export interface PickerClassNameProps {
  name?: string;
  classPrefix: string;
  className?: string;
  placement?: TypeAttributes.Placement;
  appearance?: 'default' | 'subtle';
  cleanable?: boolean;
  block?: boolean;
  disabled?: boolean;
  countable?: boolean;
  readOnly?: boolean;
  plaintext?: boolean;
  hasValue?: boolean;
  classes?: any;
}

/**
 * The className of the assembled Toggle is on the Picker.
 */
export function usePickerClassName(props: PickerClassNameProps): [string, string[]] {
  const {
    name,
    classPrefix,
    className,
    placement,
    appearance,
    cleanable,
    block,
    disabled,
    countable,
    readOnly,
    plaintext,
    hasValue,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(
    className,
    withClassPrefix(name, appearance, 'toggle-wrapper', {
      [`placement-${kebabCase(placementPolyfill(placement))}`]: placement,
      'read-only': readOnly,
      'has-value': hasValue,
      cleanable,
      block,
      disabled,
      countable,
      plaintext
    })
  );

  const usedClassNamePropKeys = Object.keys(
    omit(props, [...Object.keys(rest || {}), 'disabled', 'readOnly', 'plaintext'])
  );

  return [classes, usedClassNamePropKeys];
}

export interface EventsProps {
  down?: React.KeyboardEventHandler;
  up?: React.KeyboardEventHandler;
  enter?: React.KeyboardEventHandler;
  del?: React.KeyboardEventHandler;
  esc?: React.KeyboardEventHandler;
  right?: React.KeyboardEventHandler;
  left?: React.KeyboardEventHandler;
}

/**
 * Handling keyboard events...
 * @param event Keyboard event object
 * @param events Event callback functions
 */
export function onMenuKeyDown(event: React.KeyboardEvent, events: EventsProps) {
  const { down, up, enter, del, esc, right, left } = events;
  switch (event.key) {
    // down
    case KEY_VALUES.DOWN:
      down?.(event);
      event.preventDefault();
      break;
    // up
    case KEY_VALUES.UP:
      up?.(event);
      event.preventDefault();
      break;
    // enter
    case KEY_VALUES.ENTER:
      enter?.(event);
      event.preventDefault();
      break;
    // delete
    case KEY_VALUES.BACKSPACE:
      del?.(event);
      break;
    // esc | tab
    case KEY_VALUES.ESC:
    case KEY_VALUES.TAB:
      esc?.(event);
      break;
    // left arrow
    case KEY_VALUES.LEFT:
      left?.(event);
      break;
    // right arrow
    case KEY_VALUES.RIGHT:
      right?.(event);
      break;
    default:
  }
}

export interface FocusItemValueProps {
  target: HTMLElement | null | (() => HTMLElement | null);
  data?: any[];
  valueKey?: string;
  focusableQueryKey?: string;
  defaultLayer?: number;
  rtl?: boolean;
  callback?: (value: any, event: React.KeyboardEvent) => void;
}

/**
 * A hook that manages the focus state of the option.
 * @param defaultFocusItemValue
 * @param props
 */
export const useFocusItemValue = <T>(
  defaultFocusItemValue: T | null | undefined,
  props: FocusItemValueProps
) => {
  const {
    valueKey = 'value',
    focusableQueryKey = '[data-key][aria-disabled="false"]',
    defaultLayer = 0,
    data,
    target,
    rtl,
    callback
  } = props;
  const [focusItemValue, setFocusItemValue] = useState<T | null | undefined>(defaultFocusItemValue);
  const [layer, setLayer] = useState(defaultLayer);
  const [keys, setKeys] = useState<any[]>([]);

  /**
   * Get the elements visible in all options.
   */
  const getFocusableMenuItems = useCallback(() => {
    if (!target) {
      return [];
    }

    let currentKeys = keys;

    if (layer < 1) {
      const popup = isFunction(target) ? target() : target;

      const rootMenu = popup?.querySelector<HTMLElement>('[data-layer="0"]');

      if (rootMenu) {
        currentKeys = Array.from(
          rootMenu.querySelectorAll<HTMLElement>(focusableQueryKey) ?? []
        ).map(item => item.dataset?.key);
      } else {
        currentKeys = Array.from(popup?.querySelectorAll<HTMLElement>(focusableQueryKey) ?? []).map(
          item => item.dataset?.key
        );
      }
    }

    // 1. It is necessary to traverse the `keys` instead of `data` here to preserve the order of the array.
    // 2. The values ​​in `keys` are all string, so the corresponding value of `data` should also be converted to string
    return currentKeys.map(key => find(data, i => `${i[valueKey]}` === key));
  }, [data, focusableQueryKey, keys, target, valueKey, layer]);

  /**
   * Get the index of the focus item.
   */
  const findFocusItemIndex = useCallback(
    callback => {
      const items = getFocusableMenuItems();

      for (let i = 0; i < items.length; i += 1) {
        if (shallowEqual(focusItemValue, items[i]?.[valueKey])) {
          callback(items, i);
          return;
        }
      }
      callback(items, -1);
    },
    [focusItemValue, getFocusableMenuItems, valueKey]
  );

  const focusNextMenuItem = useCallback(
    (event: React.KeyboardEvent) => {
      findFocusItemIndex((items, index) => {
        const nextIndex = index + 2 > items.length ? 0 : index + 1;
        const focusItem = items[nextIndex];

        if (!isUndefined(focusItem)) {
          setFocusItemValue(focusItem[valueKey]);
          callback?.(focusItem[valueKey], event);
        }
      });
    },
    [callback, findFocusItemIndex, valueKey]
  );

  const focusPrevMenuItem = useCallback(
    (event: React.KeyboardEvent) => {
      findFocusItemIndex((items, index) => {
        const nextIndex = index === 0 ? items.length - 1 : index - 1;
        const focusItem = items[nextIndex];
        if (!isUndefined(focusItem)) {
          setFocusItemValue(focusItem[valueKey]);
          callback?.(focusItem[valueKey], event);
        }
      });
    },
    [callback, findFocusItemIndex, valueKey]
  );

  const getSubMenuKeys = useCallback(
    (nextLayer: number) => {
      const menu = isFunction(target) ? target() : target;
      const subMenu = menu?.querySelector(`[data-layer="${nextLayer}"]`);

      if (subMenu) {
        return Array.from(subMenu.querySelectorAll<HTMLElement>(focusableQueryKey))?.map<
          T | undefined
        >(item => item.dataset?.key as any);
      }

      return null;
    },
    [focusableQueryKey, target]
  );

  const focusNextLevelMenu = useCallback(
    (event: React.KeyboardEvent) => {
      const nextLayer = layer + 1;
      const nextKeys = getSubMenuKeys(nextLayer);

      if (nextKeys) {
        setKeys(nextKeys);
        setLayer(nextLayer);
        setFocusItemValue(nextKeys[0]);
        callback?.(nextKeys[0], event);
      }
    },
    [callback, getSubMenuKeys, layer]
  );

  const focusPrevLevelMenu = useCallback(
    (event: React.KeyboardEvent) => {
      const nextLayer = layer - 1;
      const nextKeys = getSubMenuKeys(nextLayer);

      if (nextKeys) {
        setKeys(nextKeys);
        setLayer(nextLayer);

        const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
        const parentItemValue = focusItem?.parent?.[valueKey];

        if (parentItemValue) {
          setFocusItemValue(parentItemValue);
          callback?.(parentItemValue, event);
        }
      }
    },
    [callback, data, focusItemValue, getSubMenuKeys, layer, valueKey]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      onMenuKeyDown(event, {
        down: focusNextMenuItem,
        up: focusPrevMenuItem,
        [rtl ? 'left' : 'right']: focusNextLevelMenu,
        [rtl ? 'right' : 'left']: focusPrevLevelMenu
      });
    },
    [focusNextLevelMenu, focusNextMenuItem, focusPrevLevelMenu, focusPrevMenuItem, rtl]
  );

  return {
    focusItemValue,
    setFocusItemValue,
    layer,
    setLayer,
    keys,
    setKeys,
    onKeyDown: handleKeyDown
  };
};

export interface ToggleKeyDownEventProps {
  toggle?: boolean;
  triggerRef: React.RefObject<any>;
  targetRef: React.RefObject<any>;
  overlayRef?: React.RefObject<any>;
  searchInputRef?: React.RefObject<any>;
  active?: boolean;
  onExit?: (event) => void;
  onKeyDown?: (event) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onMenuKeyDown?: (event) => void;
  onMenuPressEnter?: (event) => void;
  onMenuPressBackspace?: (event) => void;
  [key: string]: any;
}

/**
 * A hook to control the toggle keyboard operation
 * @param props
 */
export const useToggleKeyDownEvent = (props: ToggleKeyDownEventProps) => {
  const {
    toggle = true,
    triggerRef,
    targetRef,
    overlayRef,
    searchInputRef,
    active,
    onExit,
    onOpen,
    onClose,
    onKeyDown,
    onMenuKeyDown,
    onMenuPressEnter,
    onMenuPressBackspace
  } = props;

  const handleClose = useCallback(() => {
    triggerRef.current?.close?.();
    onClose?.();
  }, [onClose, triggerRef]);

  const handleOpen = useCallback(() => {
    triggerRef.current?.open?.();
    onOpen?.();
  }, [onOpen, triggerRef]);

  const handleToggleDropdown = useCallback(() => {
    if (active) {
      handleClose();
      return;
    }
    handleOpen();
  }, [active, handleOpen, handleClose]);

  const onToggle = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.target === targetRef?.current) {
        // enter
        if (toggle && event.key === KEY_VALUES.ENTER) {
          handleToggleDropdown();
        }

        // delete
        if (event.key === KEY_VALUES.BACKSPACE) {
          onExit?.(event);
        }
      }

      if (overlayRef?.current) {
        // The keyboard operation callback on the menu.
        onMenuKeyDown?.(event);

        if (event.key === KEY_VALUES.ENTER) {
          onMenuPressEnter?.(event);
        }

        /**
         * There is no callback when typing the Backspace key in the search box.
         * The default is to remove search keywords
         */
        if (event.key === KEY_VALUES.BACKSPACE && event.target !== searchInputRef?.current) {
          onMenuPressBackspace?.(event);
        }

        // The search box gets focus when typing characters and numbers.
        if (event.key.length === 1 && /\w/.test(event.key)) {
          // Exclude Input
          // eg: <SelectPicker renderExtraFooter={() => <Input />} />
          if ((event.target as HTMLInputElement)?.tagName !== 'INPUT') {
            searchInputRef?.current?.focus();
          }
        }
      }

      if (event.key === KEY_VALUES.ESC || event.key === KEY_VALUES.TAB) {
        handleClose();
      }

      // Native event callback
      onKeyDown?.(event);
    },
    [
      handleClose,
      handleToggleDropdown,
      overlayRef,
      onExit,
      onKeyDown,
      onMenuKeyDown,
      onMenuPressBackspace,
      onMenuPressEnter,
      toggle,
      targetRef,
      searchInputRef
    ]
  );

  return onToggle;
};

export interface SearchProps {
  labelKey: string;
  data: ItemDataType[];
  searchBy?: (keyword, label, item) => boolean;
  callback?: (keyword: string, data: ItemDataType[], event: React.SyntheticEvent) => void;
}

/**
 * A hook that handles search filter options
 * @param props
 */
export function useSearch(props: SearchProps) {
  const { labelKey, data, searchBy, callback } = props;

  // Use search keywords to filter options.
  const [searchKeyword, setSearchKeyword] = useState('');

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  const checkShouldDisplay = useCallback(
    (item: ItemDataType, keyword?: string) => {
      const label = item?.[labelKey];
      const _keyword = isUndefined(keyword) ? searchKeyword : keyword;

      if (typeof searchBy === 'function') {
        return searchBy(_keyword, label, item);
      }
      return shouldDisplay(label, _keyword);
    },
    [labelKey, searchBy, searchKeyword]
  );

  const updateFilteredData = useCallback(
    (nextData: ItemDataType[]) => {
      setFilteredData(filterNodesOfTree(nextData, item => checkShouldDisplay(item)));
    },
    [checkShouldDisplay]
  );

  const [filteredData, setFilteredData] = useState(
    filterNodesOfTree(data, item => checkShouldDisplay(item))
  );

  const handleSearch = (searchKeyword: string, event: React.SyntheticEvent) => {
    const filteredData = filterNodesOfTree(data, item => checkShouldDisplay(item, searchKeyword));
    setFilteredData(filteredData);
    setSearchKeyword(searchKeyword);
    callback?.(searchKeyword, filteredData, event);
  };

  return {
    searchKeyword,
    filteredData,
    updateFilteredData,
    setSearchKeyword,
    checkShouldDisplay,
    handleSearch
  };
}

export interface PickerDependentParameters {
  triggerRef?: React.RefObject<OverlayTriggerHandle>;
  rootRef?: React.RefObject<HTMLElement>;
  overlayRef?: React.RefObject<HTMLElement>;
  targetRef?: React.RefObject<HTMLElement>;
  listRef?: React.RefObject<ListHandle>;
  inline?: boolean;
}

/**
 * A hook of the exposed method of Picker
 */
export function usePublicMethods(ref, parmas: PickerDependentParameters) {
  const { triggerRef, overlayRef, targetRef, rootRef, listRef, inline } = parmas;

  const handleOpen = useCallback(() => {
    triggerRef?.current?.open();
  }, [triggerRef]);

  const handleClose = useCallback(() => {
    triggerRef?.current?.close();
  }, [triggerRef]);

  const handleUpdatePosition = useCallback(() => {
    triggerRef?.current?.updatePosition();
  }, [triggerRef]);

  useImperativeHandle(ref, (): PickerHandle => {
    // Tree and CheckTree
    if (inline) {
      return {
        get root() {
          return rootRef?.current ? rootRef?.current : triggerRef?.current?.root ?? null;
        },
        get list() {
          if (!listRef?.current) {
            throw new Error('The list is not found, please set `virtualized` for the component.');
          }
          return listRef?.current;
        }
      };
    }

    return {
      get root() {
        return (rootRef?.current || triggerRef?.current?.root) ?? null;
      },
      get overlay() {
        if (!overlayRef?.current) {
          throw new Error('The overlay is not found. Please confirm whether the picker is open.');
        }

        return overlayRef?.current ?? null;
      },
      get target() {
        return targetRef?.current ?? null;
      },
      get list() {
        if (!listRef?.current) {
          throw new Error(`
            The list is not found.
            1.Please set virtualized for the component.
            2.Please confirm whether the picker is open.
          `);
        }
        return listRef?.current;
      },
      updatePosition: handleUpdatePosition,
      open: handleOpen,
      close: handleClose
    };
  });
}
