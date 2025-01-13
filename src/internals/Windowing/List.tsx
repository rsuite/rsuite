import React, { useRef, useImperativeHandle, useCallback, useMemo } from 'react';
import ScrollView, { ScrollViewProps } from '../ScrollView';
import {
  VariableSizeList,
  Align,
  ListItemKeySelector,
  ListOnScrollProps,
  ListOnItemsRenderedProps,
  ListProps as BaseListProps
} from 'react-window';
import { useCustom } from '../../CustomProvider';
import { forwardRef } from '@/internals/utils';
import type { WithAsPropsWithoutChildren } from '@/internals/types';

export const defaultItemSize = () => 36;

export interface ListProps<T = any>
  extends WithAsPropsWithoutChildren,
    Omit<BaseListProps, 'width'> {
  ref?: React.Ref<ListHandle>;
  /**
   * Width of the list.
   *
   * For horizontal lists, this must be a number. It affects the number of columns that will be rendered (and displayed) at any given time.
   *
   * For vertical lists, this can be a number or a string (e.g. "50%").
   */
  width?: number | string;

  /**
   * @deprecated use itemSize instead
   * Either a fixed row height (number) or a function that returns the height of a row given its index: ({ index: number }): number
   */
  rowHeight?: number | (({ index }) => number);

  /**
   * Size of a item in the direction being windowed.
   */
  itemSize: number | ((index: number) => number);

  /**
   * Scroll offset for initial render.
   */
  initialScrollOffset?: number;

  /**
   * The shadow of the content when scrolling
   */
  scrollShadow?: boolean;

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

export interface ListHandle extends Partial<VariableSizeList> {
  /**
   * @deprecated use scrollToItem instead
   * Ensure row is visible. This method can be used to safely scroll back to a cell that a user has scrolled away from even if it was previously scrolled to.
   */
  scrollToRow?: (index: number) => void;
}

const OuterElementType = forwardRef<'div', ScrollViewProps>(function OuterElementType(props, ref) {
  return <ScrollView scrollShadow ref={ref} {...props} />;
});

/**
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 *
 * @private
 */
const List = forwardRef<'div', ListProps, any, 'children'>((props, ref) => {
  const {
    rowHeight,
    as: Component = VariableSizeList,
    itemSize: itemSizeProp,
    scrollShadow,
    ...rest
  } = props;
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

  return (
    <Component
      ref={listRef}
      direction={rtl ? 'rtl' : 'ltr'}
      {...compatibleProps}
      outerElementType={scrollShadow ? OuterElementType : undefined}
    />
  );
});

List.displayName = 'List';

export default List;
