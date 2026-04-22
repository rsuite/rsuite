import React, { useRef, useCallback, useEffect } from 'react';
import getHeight from 'dom-lib/getHeight';
import addStyle from 'dom-lib/addStyle';
import removeStyle from 'dom-lib/removeStyle';
import on from 'dom-lib/on';
import toggleClass from '../utils/toggleClass';
import isNumberOrTrue from '../utils/isNumberOrTrue';
import useUpdateEffect from './useUpdateEffect';
import type { ListenerCallback, ElementOffset } from '../types';
import type { ScrollbarInstance } from '../Scrollbar';

interface AffixProps {
  getTableHeight: () => number;
  contentHeight: React.MutableRefObject<number>;
  affixHeader?: boolean | number;
  affixHorizontalScrollbar?: boolean | number;
  tableOffset: React.RefObject<ElementOffset | null>;
  headerOffset: React.RefObject<ElementOffset | null>;
  headerHeight: number;
  scrollbarXRef: React.RefObject<ScrollbarInstance | null>;
  affixHeaderWrapperRef: React.RefObject<HTMLDivElement | null>;
}

const useAffix = (props: AffixProps) => {
  const {
    getTableHeight,
    contentHeight,
    affixHorizontalScrollbar,
    affixHeader,
    tableOffset,
    headerOffset,
    headerHeight,
    scrollbarXRef,
    affixHeaderWrapperRef
  } = props;

  const scrollListener = useRef<ListenerCallback | undefined>(undefined);
  const handleAffixHorizontalScrollbar = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = getHeight(window);
    const height = getTableHeight();

    const bottom = typeof affixHorizontalScrollbar === 'number' ? affixHorizontalScrollbar : 0;
    const offsetTop = tableOffset.current?.top || 0;

    const fixedScrollbar =
      scrollY + windowHeight < height + (offsetTop + bottom) &&
      scrollY + windowHeight - headerHeight > offsetTop + bottom;

    if (scrollbarXRef?.current?.root) {
      toggleClass(scrollbarXRef.current.root, 'fixed', fixedScrollbar);

      if (fixedScrollbar) {
        addStyle(scrollbarXRef.current.root, 'bottom', `${bottom}px`);
      } else {
        removeStyle(scrollbarXRef.current.root, 'bottom');
      }
    }
  }, [affixHorizontalScrollbar, headerHeight, scrollbarXRef, getTableHeight, tableOffset]);

  const handleAffixTableHeader = useCallback(() => {
    const top = typeof affixHeader === 'number' ? affixHeader : 0;
    const scrollY = window.scrollY || window.pageYOffset;
    const offsetTop = headerOffset.current?.top || 0;
    const fixedHeader =
      scrollY - (offsetTop - top) >= 0 && scrollY < offsetTop - top + contentHeight.current;

    if (affixHeaderWrapperRef.current) {
      toggleClass(affixHeaderWrapperRef.current, 'fixed', fixedHeader);
    }
  }, [affixHeader, affixHeaderWrapperRef, contentHeight, headerOffset]);

  const handleWindowScroll = useCallback(() => {
    if (isNumberOrTrue(affixHeader)) {
      handleAffixTableHeader();
    }
    if (isNumberOrTrue(affixHorizontalScrollbar)) {
      handleAffixHorizontalScrollbar();
    }
  }, [
    affixHeader,
    affixHorizontalScrollbar,
    handleAffixTableHeader,
    handleAffixHorizontalScrollbar
  ]);

  /**
   * Update the position of the fixed element after the height of the table changes.
   * fix: https://github.com/rsuite/rsuite/issues/1716
   */
  useUpdateEffect(handleWindowScroll, [getTableHeight]);

  useEffect(() => {
    if (isNumberOrTrue(affixHeader) || isNumberOrTrue(affixHorizontalScrollbar)) {
      scrollListener.current = on(window, 'scroll', handleWindowScroll);
    }
    return () => {
      scrollListener.current?.off();
    };
  }, [affixHeader, affixHorizontalScrollbar, handleWindowScroll]);
};

export default useAffix;
