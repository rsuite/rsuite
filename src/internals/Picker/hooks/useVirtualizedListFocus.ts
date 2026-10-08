import { useImperativeHandle, useRef, useState } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { shallowEqual } from '@/internals/utils';
import { RSUITE_PICKER_GROUP_KEY } from '@/internals/symbols';
import findItemByKey from '../findItemByKey';
import type { Option } from '@/internals/types';
import type { ListHandle, ListProps } from '@/internals/Windowing';
import type { Ref, RefObject } from 'react';

interface VirtualizedOption extends Option {
  [RSUITE_PICKER_GROUP_KEY]?: boolean;
}

export interface VirtualizedListHandle {
  getFocusableItems: () => VirtualizedOption[];
  focusItem: (value: any, onFocus: () => void, options?: { focus?: boolean }) => void;
}

interface Props {
  items: VirtualizedOption[];
  valueKey: string;
  disabledItemValues: any[];
  menuRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<ListHandle | null>;
  navigationRef?: Ref<VirtualizedListHandle>;
  onItemsRendered?: ListProps['onItemsRendered'];
}

export default function useVirtualizedListFocus({
  items,
  valueKey,
  disabledItemValues,
  menuRef,
  listRef,
  navigationRef,
  onItemsRendered
}: Props) {
  const pendingFocus = useRef<{
    value: any;
    sourceElement: Element | null;
    onFocus: () => void;
    focus: boolean;
    scrolled: boolean;
  } | null>(null);
  const [focusRequest, setFocusRequest] = useState<{ value: any } | null>(null);

  useIsomorphicLayoutEffect(
    () => () => {
      pendingFocus.current = null;
    },
    []
  );

  const isFocusable = (item: VirtualizedOption) =>
    !item[RSUITE_PICKER_GROUP_KEY] &&
    !disabledItemValues.some(value => shallowEqual(value, item[valueKey]));

  const getFocusableIndex = useEventCallback((value: any) =>
    items.findIndex(item => isFocusable(item) && shallowEqual(item[valueKey], value))
  );

  const hasPendingFocus = useEventCallback(() => {
    if (!pendingFocus.current) return false;

    const ownerDocument = menuRef.current?.ownerDocument;
    // The menu ref can detach briefly while React commits a new rendered range.
    if (!ownerDocument) return false;
    const { sourceElement } = pendingFocus.current;
    // A later interaction owns focus; only an unmounted virtual row may leave it on body.
    if (
      (sourceElement && sourceElement.ownerDocument !== ownerDocument) ||
      (ownerDocument.activeElement !== sourceElement &&
        (sourceElement?.isConnected || ownerDocument.activeElement !== ownerDocument.body))
    ) {
      pendingFocus.current = null;
      return false;
    }

    return true;
  });

  const focusPendingItem = useEventCallback(() => {
    const request = pendingFocus.current;
    if (!request || !hasPendingFocus()) return;
    if (!request.focus && !request.scrolled) return;
    if (getFocusableIndex(request.value) < 0) {
      pendingFocus.current = null;
      return;
    }

    const item = findItemByKey(menuRef.current, request.value);
    if (item && item.getAttribute('aria-disabled') !== 'true') {
      if (request.focus) item.focus();
      if (
        pendingFocus.current === request &&
        (!request.focus || item.ownerDocument.activeElement === item)
      ) {
        pendingFocus.current = null;
        request.onFocus();
      }
    }
  });

  useImperativeHandle(navigationRef, () => ({
    getFocusableItems: () => items.filter(isFocusable),
    focusItem: (value, onFocus, options) => {
      const index = getFocusableIndex(value);
      if (index < 0) return;

      pendingFocus.current = {
        value,
        sourceElement: menuRef.current?.ownerDocument.activeElement ?? null,
        onFocus,
        focus: options?.focus !== false,
        scrolled: false
      };
      setFocusRequest({ value });
    }
  }));

  useIsomorphicLayoutEffect(() => {
    if (!focusRequest || !hasPendingFocus()) return;

    // Commit keyboard scrolling after queued native scroll updates.
    const index = getFocusableIndex(focusRequest.value);
    if (index < 0) {
      pendingFocus.current = null;
      return;
    }

    listRef.current?.scrollToItem?.(index);
    if (pendingFocus.current) pendingFocus.current.scrolled = true;
    focusPendingItem();
  }, [focusRequest]);

  useIsomorphicLayoutEffect(focusPendingItem);

  return useEventCallback((props: Parameters<NonNullable<ListProps['onItemsRendered']>>[0]) => {
    focusPendingItem();
    onItemsRendered?.(props);
  });
}
