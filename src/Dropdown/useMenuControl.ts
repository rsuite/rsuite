import React, { useCallback, useRef, useState } from 'react';
import isNil from 'lodash/isNil';
import { MenuControlContextProps } from './MenuControlContext';

/**
 * Create menu control context
 */
export default function useMenuControl(
  menuRef: React.MutableRefObject<HTMLUListElement>,
  existingControl?: MenuControlContextProps
): MenuControlContextProps {
  // Whether menu is open/visible
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState<HTMLLIElement[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // When grabbing focus, keep track of previous activeElement
  // so that we can return focus later
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const registerItem = useCallback((item: HTMLLIElement) => {
    setItems(items => [...items, item]);
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setItems(items => items.filter(item => item.id !== id));
  }, []);

  // Focus the menu itself
  const focusSelf = useCallback(() => {
    requestAnimationFrame(() => {
      if (document.activeElement !== menuRef.current) {
        previousActiveElementRef.current = document.activeElement as HTMLElement;
        menuRef.current.focus();
      }
    });
  }, []);

  const focusItem = useCallback(
    (item: HTMLLIElement) => {
      const itemIndex = items.indexOf(item);
      if (itemIndex !== -1) {
        setActiveItemIndex(itemIndex);
        focusSelf();
      }
    },
    [items]
  );

  const focusItemAt = useCallback(
    (index: number | null) => {
      if (isNil(index)) {
        setActiveItemIndex(null);
        focusSelf();
      } else {
        focusItem(items[index]);
      }
    },
    [items, focusItem, focusSelf]
  );

  const moveItemFocus = useCallback(
    (delta: number) => {
      // If there's no item with focus,
      // focus should "enter" the menu by delta steps
      if (activeItemIndex === null) {
        if (delta > 0) {
          focusItemAt(Math.min(items.length - 1, delta - 1));
        } else if (delta < 0) {
          focusItemAt(Math.max(0, items.length + delta));
        }
      } else {
        focusItemAt(Math.max(0, Math.min(items.length - 1, activeItemIndex + delta)));
      }
    },
    [items, activeItemIndex, focusItemAt]
  );

  const openMenu = useCallback(() => {
    setOpen(true);
    focusSelf();
  }, [focusSelf]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => {
      previousActiveElementRef.current?.focus();
    });
  }, []);

  return (
    existingControl ?? {
      open,
      items,
      activeItemIndex,
      registerItem,
      unregisterItem,
      focusItem,
      focusItemAt,
      moveItemFocus,
      openMenu,
      closeMenu
    }
  );
}
