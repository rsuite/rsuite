import React from 'react';
import VirtualizedList, { ListProps, ListRowProps } from 'react-virtualized/dist/commonjs/List';
import VirtualizedAutoSizer, { AutoSizerProps } from 'react-virtualized/dist/commonjs/AutoSizer';
import type { Alignment } from 'react-virtualized';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#public-methods
export interface ListInstance {
  /**
   * Forcefully re-render the inner Grid component.
   */
  forceUpdateGrid(): void;

  /**
   * Gets offset for a given row and alignment.
   */
  getOffsetForRow(params: { alignment?: Alignment; index?: number }): number;

  /**
   * Pre-measure all rows in a List.
   */
  measureAllRows(): void;

  /**
   * Recompute row heights and offsets after the specified index (defaults to 0).
   */
  recomputeRowHeights(index?: number): void;

  /**
   * Scroll to the specified offset. Useful for animating position changes.
   */
  scrollToPosition(scrollTop?: number): void;

  /**
   * Ensure row is visible. This method can be used to safely scroll back to a cell
   * that a user has scrolled away from even if it was previously scrolled to.
   */
  scrollToRow(index?: number): void;
}

export type { ListProps, AutoSizerProps, ListRowProps };
export const List = VirtualizedList as any as React.ComponentType<ListProps>;
export const AutoSizer = VirtualizedAutoSizer as any as React.ComponentType<AutoSizerProps>;
