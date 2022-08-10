import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { Virtuoso, VirtuosoProps, VirtuosoHandle } from 'react-virtuoso';
import { ItemDataType } from '../@types/common';

export interface VirtualizedListProps<T = ItemDataType> extends VirtuosoProps<T, any> {
  /**
   * @deprecated use itemSize instead
   * Either a fixed row height (number) or a function that returns the height of a row given its index: ({ index: number }): number
   */
  rowHeight?: number | ((rowIndex: number) => number);
}

export interface VirtualizedListHandle extends Partial<VirtuosoHandle> {
  /**
   * @deprecated use scrollToIndex instead
   * Ensure row is visible. This method can be used to safely scroll back to a cell that a user has scrolled away from even if it was previously scrolled to.
   */
  scrollToRow?: (index: number) => void;
}

const VirtualizedList = React.forwardRef<VirtualizedListHandle, VirtualizedListProps>(
  (props, ref) => {
    const { rowHeight, ...restProps } = props;

    const listRef = useRef<VirtuosoHandle>(null);

    useImperativeHandle(ref, () => ({
      ...listRef.current,
      scrollToRow: (index: number) => {
        listRef.current?.scrollToIndex(index);
      }
    }));

    const setRowHeight = useCallback(
      (el: HTMLElement, dimension: any) => {
        if ((dimension === 'height' || dimension === 'offsetHeight') && rowHeight) {
          const index = el.dataset?.index ? parseInt(el.dataset.index) : 0;
          return typeof rowHeight === 'number' ? rowHeight : rowHeight(index);
        }

        try {
          return Math.round(el.getBoundingClientRect()[dimension]);
        } catch (e) {
          throw new Error(`Virtuoso itemSize: ${el} does not have getBoundingClientRect`);
        }
      },
      [rowHeight]
    );

    const compatibleProps = { ...restProps };

    if (rowHeight) {
      compatibleProps.itemSize = setRowHeight;
    }

    // https://github.com/petyosi/react-virtuoso/issues/26
    if (process.env.RUN_ENV === 'test') {
      const { totalCount, data, initialItemCount } = restProps;

      const count = initialItemCount || Math.min(10, totalCount || data?.length || 0);

      compatibleProps.initialItemCount = count;
      compatibleProps.key = count;
    }

    return <Virtuoso ref={listRef} {...compatibleProps} />;
  }
);

export default VirtualizedList;
