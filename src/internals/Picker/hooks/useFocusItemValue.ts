import { useState } from 'react';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import find from 'lodash/find';
import { getHeight } from 'dom-lib';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { shallowEqual } from '@/internals/utils';
import { findNodeOfTree } from '../../Tree/utils';
import { onMenuKeyDown } from '../utils';
import findItemByKey from '../findItemByKey';
import getOptionKey from '../getOptionKey';
import type { VirtualizedListHandle } from './useVirtualizedListFocus';

interface FocusItemValueProps<T = unknown> {
  target: HTMLElement | null | (() => HTMLElement | null);
  data?: T[];
  virtualizedList?: React.RefObject<VirtualizedListHandle | null>;
  /** Reconcile an open list picker's focus with its currently eligible options. */
  reconcileFocus?: boolean;
  /** Initialize focus when an active search gains its first eligible result. */
  focusFirst?: boolean;
  /**
   *  When the down arrow key is pressed, whether to automatically focus on the option
   */
  focusToOption?: boolean;
  valueKey?: string;
  focusableQueryKey?: string;
  defaultLayer?: number;
  rtl?: boolean;
  callback?: (value: any, event: React.KeyboardEvent) => void;
  getParent?: (node: T) => T | undefined;
}

/**
 * A hook that manages the focus state of the option.
 * @param defaultFocusItemValue
 * @param props
 */
const useFocusItemValue = <T, D>(
  defaultFocusItemValue: T | null | undefined,
  props: FocusItemValueProps<D>
) => {
  const {
    valueKey = 'value',
    focusableQueryKey = '[data-key][aria-disabled="false"]',
    defaultLayer = 0,
    focusToOption = true,
    data,
    virtualizedList,
    reconcileFocus = false,
    focusFirst = false,
    target,
    rtl,
    callback,
    // TODO-Doma This legacy behavior of using `.parent` property should be deprecated
    //           Always explicitly pass `getParent` when there's need to traverse upwards
    getParent = item => (item as any)?.parent
  } = props;
  const [focusItemValue, setFocusItemValue] = useState<T | null | undefined>(defaultFocusItemValue);
  const [layer, setLayer] = useState(defaultLayer);
  const [keys, setKeys] = useState<any[]>([]);

  const focusCallback = useEventCallback((value: any, event: React.KeyboardEvent) => {
    if (focusToOption) {
      const menu = isFunction(target) ? target() : target;
      const focusElement = findItemByKey(menu, value);
      focusElement?.focus();
    }

    callback?.(value, event);
  });

  const focusMenuItem = useEventCallback((value: any, event: React.KeyboardEvent) => {
    if (virtualizedList?.current) {
      virtualizedList.current.focusItem(
        value,
        () => {
          setFocusItemValue(value);
          callback?.(value, event);
        },
        { focus: focusToOption }
      );
      return;
    }

    setFocusItemValue(value);
    focusCallback(value, event);
  });

  const getScrollContainer = useEventCallback(() => {
    const menu = isFunction(target) ? target() : target;

    // For Cascader and MutiCascader
    const subMenu = menu?.querySelector(`[data-layer="${layer}"]`);

    if (subMenu) {
      return subMenu;
    }

    // For SelectPicker、CheckPicker、Autocomplete、InputPicker、TagPicker
    return menu?.querySelector('[role="listbox"]');
  });

  const getItemByElement = (element: HTMLElement) =>
    find(data, item =>
      element.dataset.pickerKey === undefined
        ? String(item[valueKey]) === element.dataset.key
        : getOptionKey(item[valueKey]) === element.dataset.pickerKey
    );

  /**
   * Get the elements visible in all options.
   */
  const getFocusableMenuItems = () => {
    if (virtualizedList?.current) {
      return virtualizedList.current.getFocusableItems();
    }
    if (!target) {
      return [];
    }

    if (layer >= 1) {
      return keys.map(value => find(data, item => shallowEqual(item[valueKey], value)));
    }

    const popup = isFunction(target) ? target() : target;
    const rootMenu = popup?.querySelector<HTMLElement>('[data-layer="0"]') || popup;

    // Preserve rendered order and the original type of each option value.
    return Array.from(rootMenu?.querySelectorAll<HTMLElement>(focusableQueryKey) ?? []).map(
      getItemByElement
    );
  };

  useIsomorphicLayoutEffect(() => {
    if (!reconcileFocus || (focusItemValue == null && !focusFirst)) return;
    const menu = isFunction(target) ? target() : target;
    if (!menu) return;

    // Results can change without a search event, including after an async data update.
    let nextValue;
    if (virtualizedList?.current) {
      const items = virtualizedList.current.getFocusableItems();
      if (items.some(item => shallowEqual(item[valueKey], focusItemValue))) return;
      nextValue = items[0]?.[valueKey];
    } else {
      if (findItemByKey(menu, focusItemValue)?.matches(focusableQueryKey)) return;
      const first = menu.querySelector<HTMLElement>(focusableQueryKey);
      nextValue = first ? getItemByElement(first)?.[valueKey] : undefined;
    }
    setFocusItemValue(nextValue);
  });

  /**
   * Get the index of the focus item.
   */
  const findFocusItemIndex = useEventCallback(callback => {
    const items = getFocusableMenuItems();

    for (let i = 0; i < items.length; i += 1) {
      if (shallowEqual(focusItemValue, items[i]?.[valueKey])) {
        callback(items, i);
        return;
      }
    }
    callback(items, -1);
  });

  const scrollListItem = useEventCallback(
    (direction: 'top' | 'bottom', itemValue: string, willOverflow: boolean) => {
      if (virtualizedList?.current) return;
      const container = getScrollContainer() as HTMLElement;
      const item = findItemByKey(container, itemValue);

      if (willOverflow && container) {
        const { scrollHeight, clientHeight } = container;
        container.scrollTop = direction === 'top' ? scrollHeight - clientHeight : 0;
        return;
      }

      if (item && container) {
        if (!isVisible(item, container, direction)) {
          const height = getHeight(item);

          scrollTo(container, direction, height);
        }
      }
    }
  );

  const focusNextMenuItem = useEventCallback((event: React.KeyboardEvent) => {
    findFocusItemIndex((items, index) => {
      const willOverflow = index + 2 > items.length;
      const nextIndex = willOverflow ? 0 : index + 1;
      const focusItem = items[nextIndex];

      if (!isUndefined(focusItem)) {
        focusMenuItem(focusItem[valueKey], event);
        scrollListItem('bottom', focusItem[valueKey], willOverflow);
      }
    });
  });

  const focusPrevMenuItem = useEventCallback((event: React.KeyboardEvent) => {
    findFocusItemIndex((items, index) => {
      const willOverflow = index === 0;
      const nextIndex = willOverflow ? items.length - 1 : index - 1;
      const focusItem = items[nextIndex];
      if (!isUndefined(focusItem)) {
        focusMenuItem(focusItem[valueKey], event);
        scrollListItem('top', focusItem[valueKey], willOverflow);
      }
    });
  });

  const getSubMenuKeys = (nextLayer: number) => {
    const menu = isFunction(target) ? target() : target;
    const subMenu = menu?.querySelector(`[data-layer="${nextLayer}"]`);

    if (subMenu) {
      return Array.from(subMenu.querySelectorAll<HTMLElement>(focusableQueryKey)).map(
        item => getItemByElement(item)?.[valueKey]
      );
    }

    return null;
  };

  const focusNextLevelMenu = useEventCallback((event: React.KeyboardEvent) => {
    const nextLayer = layer + 1;
    const nextKeys = getSubMenuKeys(nextLayer);

    if (nextKeys) {
      const focusItem = find(data, item => shallowEqual(item[valueKey], nextKeys[0]));

      if (isUndefined(focusItem)) return;

      setKeys(nextKeys);
      setLayer(nextLayer);
      focusMenuItem(focusItem[valueKey], event);
    }
  });

  const focusPrevLevelMenu = useEventCallback((event: React.KeyboardEvent) => {
    const nextLayer = layer - 1;
    const nextKeys = getSubMenuKeys(nextLayer);

    if (nextKeys) {
      setKeys(nextKeys);
      setLayer(nextLayer);

      const focusItem = findNodeOfTree(data, item => item[valueKey] === focusItemValue);
      const parentItemValue = getParent(focusItem)?.[valueKey];

      if (parentItemValue != null) {
        setFocusItemValue(parentItemValue);
        focusCallback(parentItemValue, event);
      }
    }
  });

  const handleKeyDown = useEventCallback((event: any) => {
    onMenuKeyDown(event, {
      down: focusNextMenuItem,
      up: focusPrevMenuItem,
      [rtl ? 'left' : 'right']: focusNextLevelMenu,
      [rtl ? 'right' : 'left']: focusPrevLevelMenu
    });
  });

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

function scrollTo(container: HTMLElement, direction: 'top' | 'bottom', step: number) {
  const { scrollTop } = container;
  container.scrollTop = direction === 'top' ? scrollTop - step : scrollTop + step;
}

/**
 * Checks if the element has a vertical scrollbar.
 */
function hasVerticalScroll(element: HTMLElement) {
  const { scrollHeight, clientHeight } = element;
  return scrollHeight > clientHeight;
}

/**
 * Checks if the element is within the visible area of the container
 */
function isVisible(element: HTMLElement, container: HTMLElement, direction: 'top' | 'bottom') {
  if (!hasVerticalScroll(container)) {
    return true;
  }

  const { top, bottom, height } = element.getBoundingClientRect();
  const { top: containerTop, bottom: containerBottom } = container.getBoundingClientRect();

  if (direction === 'top') {
    return top + height > containerTop;
  }
  return bottom - height < containerBottom;
}

export default useFocusItemValue;
