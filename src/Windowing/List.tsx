import React, { useRef, useImperativeHandle, useCallback, useMemo } from 'react';
import {
  VariableSizeList,
  Align,
  ListItemKeySelector,
  ListOnScrollProps,
  ListOnItemsRenderedProps
} from 'react-window';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { useCustom } from '../utils';

export interface ListProps<T = any> extends WithAsProps {
  /**
   * @deprecated use {@link itemSize} instead
   * Either a fixed row height (number) or a function that returns the height of a row given its index: ({ index: number }): number
   */
  rowHeight?: number | (({ index: number }) => number);

  /**
   * Size of a item in the direction being windowed.
   */
  itemSize: number | ((index: number) => number);

  /**
   * Scroll offset for initial render.
   */
  initialScrollOffset?: number;

  /**
   * By default, lists will use an item's index as its key. This is okay if:
   *
   * - Your collections of items is never sorted or modified
   * - Your item renderer is not stateful and does not extend PureComponent
   *
   * If your list does not satisfy the above constraints, use the itemKey property to specify your own keys for items
   */
  itemKey?: ListItemKeySelector<T>;

  /**
   * Called when the items rendered by the list change.
   */
  onItemsRendered?: (props: ListOnItemsRenderedProps) => void;

  /**
   * Called when the list scroll positions changes, as a result of user scrolling or scroll-to method calls.
   */
  onScroll?: (props: ListOnScrollProps) => void;
}

export interface ListHandle
  extends Pick<VariableSizeList, 'resetAfterIndex' | 'scrollTo' | 'scrollToItem'> {
  /**
   * @deprecated use scrollToItem instead
   * Ensure row is visible. This method can be used to safely scroll back to a cell that a user has scrolled away from even if it was previously scrolled to.
   */
  scrollToRow?: (index: number) => void;
}

const List: RsRefForwardingComponent<'div', ListProps> = React.forwardRef((props, ref) => {
  const { rowHeight, as: Component = VariableSizeList, itemSize: itemSizeProp, ...rest } = props;
  const listRef = useRef<VariableSizeList>(null);
  const { rtl } = useCustom();

  useImperativeHandle(ref, () => ({
    resetAfterIndex: (index: number, shouldForceUpdate?: boolean) => {
      listRef.current?.resetAfterIndex?.(index, shouldForceUpdate);
    },
    scrollTo: (scrollOffset: number) => {
      listRef.current?.scrollTo?.(scrollOffset);
    },
    scrollToItem: (index: number, align?: Align) => {
      listRef.current?.scrollToItem?.(index, align);
    },
    scrollToRow: (index: number) => {
      listRef.current?.scrollToItem?.(index);
    }
  }));

  const setRowHeight = useCallback(
    (index: number) => {
      return typeof rowHeight === 'function' ? rowHeight({ index }) : rowHeight || 0;
    },
    [rowHeight]
  );

  const itemSize = useMemo(() => {
    if (typeof itemSizeProp === 'function') return itemSizeProp;

    return () => itemSizeProp;
  }, [itemSizeProp]);

  const compatibleProps = { itemSize, ...rest } as any;

  if (rowHeight) {
    compatibleProps.itemSize = Component === VariableSizeList ? setRowHeight : rowHeight;
  }

  return <Component ref={listRef} direction={rtl ? 'rtl' : 'ltr'} {...compatibleProps} />;
});

export default List;
