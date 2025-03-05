import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, createChainedFunction, mergeRefs } from '@/internals/utils';
import { useScrollState } from './hooks/useScrollState';
import type { WithAsProps } from '@/internals/types';

export interface ScrollViewProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * The shadow of the content when scrolling
   */
  scrollShadow?: boolean;

  /**
   * Whether to customize the scrollbar
   */
  customScrollbar?: boolean;

  /**
   * The height of the scroll area
   */
  height?: number;

  /**
   * The width of the scroll area
   */
  width?: number;

  /**
   * Test ID
   * @private
   */
  'data-testid'?: string;
}

const ScrollView = forwardRef<'div', ScrollViewProps>((props, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'scroll-view',
    className,
    children,
    scrollShadow,
    customScrollbar,
    height,
    width,
    style,
    onScroll,
    ['data-testid']: dataTestId,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const { scrollState, handleScroll, bodyRef } = useScrollState(scrollShadow);

  const bodyStyles = { height, width, ...style };
  const bodyClasses = merge(
    className,
    withClassPrefix({
      shadow: scrollShadow,
      'thumb-top': scrollState === 'top',
      'thumb-middle': scrollState === 'middle',
      'thumb-bottom': scrollState === 'bottom',
      'custom-scrollbar': customScrollbar
    })
  );

  return (
    <Component
      {...rest}
      ref={mergeRefs(ref, bodyRef)}
      className={bodyClasses}
      style={bodyStyles}
      onScroll={createChainedFunction(handleScroll, onScroll)}
      data-testid={dataTestId || 'scroll-view'}
    >
      {children}
    </Component>
  );
});

ScrollView.displayName = 'ScrollView';

export default ScrollView;
