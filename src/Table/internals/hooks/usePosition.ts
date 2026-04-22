import React, { useCallback, useRef } from 'react';
import addStyle, { CSSProperty } from 'dom-lib/addStyle';
import toggleClass from '../utils/toggleClass';
import useUpdateEffect from './useUpdateEffect';
import isSupportTouchEvent from '../utils/isSupportTouchEvent';
import defer from '../utils/defer';
import { SCROLLBAR_WIDTH } from '../constants';
import type { RowDataType } from '../types';

interface PositionProps {
  data: readonly RowDataType[];
  height: number;
  tableWidth: React.MutableRefObject<number>;
  tableRef: React.RefObject<HTMLDivElement | null>;
  prefix: (str: string) => string;
  setCssPosition: React.MutableRefObject<any>;
  wheelWrapperRef: React.RefObject<HTMLDivElement | null>;
  headerWrapperRef: React.RefObject<HTMLDivElement | null>;
  affixHeaderWrapperRef: React.RefObject<HTMLDivElement | null>;
  tableHeaderRef: React.RefObject<HTMLDivElement | null>;
  scrollX: React.MutableRefObject<number>;
  scrollY: React.MutableRefObject<number>;
  contentWidth: React.MutableRefObject<number>;
  shouldFixedColumn: boolean;
}

/**
 * Update the position of the table according to the scrolling information of the table.
 * @param props
 * @returns
 */
const usePosition = (props: PositionProps) => {
  const {
    data,
    height,
    tableWidth,
    tableRef,
    prefix,
    setCssPosition,
    wheelWrapperRef,
    headerWrapperRef,
    affixHeaderWrapperRef,
    tableHeaderRef,
    scrollX,
    scrollY,
    contentWidth,
    shouldFixedColumn
  } = props;

  const duration = useRef<number>(0);
  const bezier = useRef<string>('linear');

  const getScrollCellGroups = useCallback(() => {
    return tableRef.current?.querySelectorAll(`.${prefix('cell-group-scroll')}`) || [];
  }, [prefix, tableRef]);

  const getFixedLeftCellGroups = useCallback(() => {
    return tableRef.current?.querySelectorAll(`.${prefix('cell-group-fixed-left')}`);
  }, [prefix, tableRef]);

  const getFixedRightCellGroups = useCallback(() => {
    return tableRef.current?.querySelectorAll(`.${prefix('cell-group-fixed-right')}`);
  }, [prefix, tableRef]);

  const updateWheelElementPosition = useCallback(
    (fixedCell?: boolean) => {
      if (wheelWrapperRef?.current) {
        // The animation when the mobile device touches and scrolls.
        const wheelStyle: CSSProperty = isSupportTouchEvent()
          ? {
              'transition-duration': `${duration.current}ms`,
              'transition-timing-function': bezier.current
            }
          : {};
        setCssPosition.current(wheelStyle, fixedCell ? 0 : scrollX.current, scrollY.current);
        addStyle(wheelWrapperRef.current, wheelStyle);
      }
    },
    [scrollX, scrollY, setCssPosition, wheelWrapperRef]
  );

  const updatePositionByFixedCell = useCallback(() => {
    const wheelGroupStyle = {};
    const scrollGroups = getScrollCellGroups();
    const fixedLeftGroups = getFixedLeftCellGroups();
    const fixedRightGroups = getFixedRightCellGroups();

    setCssPosition.current(wheelGroupStyle as CSSStyleDeclaration, scrollX.current, 0);

    const scrollArrayGroups = Array.from(scrollGroups);

    for (let i = 0; i < scrollArrayGroups.length; i++) {
      const group = scrollArrayGroups[i] as Element;
      addStyle(group, wheelGroupStyle);
    }

    updateWheelElementPosition(true);

    // Whether to show the horizontal scroll bar
    const hasHorizontalScrollbar = contentWidth.current > tableWidth.current;
    const scrollbarWidth = hasHorizontalScrollbar ? 0 : SCROLLBAR_WIDTH;

    const leftShadowClassName = prefix('cell-group-left-shadow');
    const rightShadowClassName = prefix('cell-group-right-shadow');
    const showLeftShadow = scrollX.current < 0;
    const showRightShadow =
      tableWidth.current - contentWidth.current - scrollbarWidth !== scrollX.current;

    toggleClass(fixedLeftGroups as unknown as HTMLElement[], leftShadowClassName, showLeftShadow);
    toggleClass(
      fixedRightGroups as unknown as HTMLElement[],
      rightShadowClassName,
      showRightShadow
    );
  }, [
    contentWidth,
    getFixedLeftCellGroups,
    getFixedRightCellGroups,
    getScrollCellGroups,
    updateWheelElementPosition,
    prefix,
    scrollX,
    tableWidth,
    setCssPosition
  ]);

  /**
   * Update the position of the table according to the scrolling information of the table.
   * @param nextDuration CSS transition-duration
   * @param nextBezier CSS transition-timing-function
   */
  const updatePosition = useCallback(
    (nextDuration?: number, nextBezier?: string) => {
      if (nextDuration) {
        duration.current = nextDuration;
      }

      if (nextBezier) {
        bezier.current = nextBezier;
      }

      // When there are fixed columns.
      if (shouldFixedColumn) {
        updatePositionByFixedCell();
      } else {
        const headerStyle = {};

        setCssPosition.current(headerStyle as CSSStyleDeclaration, scrollX.current, 0);

        const headerElement = headerWrapperRef?.current;
        const affixHeaderElement = affixHeaderWrapperRef?.current;

        updateWheelElementPosition();
        headerElement && addStyle(headerElement, headerStyle);

        if (affixHeaderElement?.hasChildNodes?.()) {
          addStyle(affixHeaderElement?.firstChild as Element, headerStyle);
        }
      }

      if (tableHeaderRef?.current) {
        toggleClass(tableHeaderRef.current, prefix('cell-group-shadow'), scrollY.current < 0);
      }
    },
    [
      affixHeaderWrapperRef,
      updateWheelElementPosition,
      headerWrapperRef,
      prefix,
      scrollX,
      scrollY,
      shouldFixedColumn,
      tableHeaderRef,
      setCssPosition,
      updatePositionByFixedCell
    ]
  );

  useUpdateEffect(() => {
    if (scrollY.current !== 0) {
      updatePosition();
    }
  }, [height, data]);

  return {
    forceUpdatePosition: updatePosition,
    deferUpdatePosition: (nextDuration?: number, nextBezier?: string) => {
      defer(() => {
        updatePosition(nextDuration, nextBezier);
      });
    }
  };
};

export default usePosition;
