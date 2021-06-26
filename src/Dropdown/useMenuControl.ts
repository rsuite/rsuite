import React, { useCallback, useRef, useState } from 'react';
import isNil from 'lodash/isNil';
import {
  FocusItemAtIndex,
  ItemRegistryEntry,
  MenuControlContextProps,
  MoveItemFocusDelta
} from './MenuControlContext';
import { DropdownMenuItemProps } from './MenuItem';

/**
 * Create menu control context
 */
export default function useMenuControl(
  menuRef: React.MutableRefObject<HTMLUListElement>,
  existingControl?: MenuControlContextProps
): MenuControlContextProps {
  // Whether menu is open/visible
  const [open, setOpen] = useState(false);

  // Menu's menuitems
  const itemsRef = useRef<ItemRegistryEntry[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // When grabbing focus, keep track of previous activeElement
  // so that we can return focus later
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const registerItem = useCallback(
    (element: HTMLLIElement, props?: Partial<DropdownMenuItemProps>) => {
      itemsRef.current = [...itemsRef.current, { element, props }];
    },
    []
  );

  const unregisterItem = useCallback((id: string) => {
    itemsRef.current = itemsRef.current.filter(item => item.element.id !== id);
  }, []);

  // Focus the menu itself
  const focusSelf = useCallback(() => {
    requestAnimationFrame(() => {
      if (document.activeElement !== menuRef.current) {
        previousActiveElementRef.current = document.activeElement as HTMLElement;
        menuRef.current.focus();
      }
    });
  }, [menuRef]);

  const focusItem = useCallback(
    (item: ItemRegistryEntry) => {
      const itemIndex = itemsRef.current.indexOf(item);
      if (itemIndex !== -1) {
        setActiveItemIndex(itemIndex);
        focusSelf();
      }
    },
    [focusSelf]
  );

  type LookUpDirection = 1 | -1;

  const lookupNextActiveItemIndex = useCallback((start: number, direction: LookUpDirection):
    | number
    | null => {
    for (let i = start; i > -1 && i < itemsRef.current.length; i += direction) {
      if (!itemsRef.current[i].props?.disabled) {
        return i;
      }
    }

    return null;
  }, []);

  const focusItemAt = useCallback(
    (index: FocusItemAtIndex | null) => {
      if (isNil(index)) {
        setActiveItemIndex(null);
        focusSelf();
      } else {
        let activeItemIndex;
        if (index === 0) {
          activeItemIndex = lookupNextActiveItemIndex(0, 1);
        } else if (index === -1) {
          activeItemIndex = lookupNextActiveItemIndex(itemsRef.current.length - 1, -1);
        }

        if (!isNil(activeItemIndex)) {
          focusItem(itemsRef.current[activeItemIndex]);
        }
      }
    },
    [focusItem, focusSelf, lookupNextActiveItemIndex]
  );

  const moveItemFocus = useCallback(
    (delta: MoveItemFocusDelta) => {
      let nextActiveItemIndex;

      // If there's no item with focus,
      // focus should "enter" the menu by delta steps
      if (activeItemIndex === null) {
        if (delta > 0) {
          nextActiveItemIndex = Math.min(itemsRef.current.length - 1, delta - 1);
        } else if (delta < 0) {
          nextActiveItemIndex = Math.max(0, itemsRef.current.length + delta);
        }
      } else {
        nextActiveItemIndex = lookupNextActiveItemIndex(activeItemIndex + delta, delta);
      }

      if (!isNil(nextActiveItemIndex)) {
        focusItem(itemsRef.current[nextActiveItemIndex]);
      }
    },
    [activeItemIndex, lookupNextActiveItemIndex, focusItem]
  );

  const openMenu = useCallback(() => {
    setOpen(true);
    focusSelf();
  }, [focusSelf]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveItemIndex(null);
    requestAnimationFrame(() => {
      previousActiveElementRef.current?.focus();
    });
  }, []);

  return (
    existingControl ?? {
      open,
      items: itemsRef.current,
      activeItemIndex,
      registerItem,
      unregisterItem,
      focusItemAt,
      moveItemFocus,
      openMenu,
      closeMenu
    }
  );
}
