import React from 'react';
import { useClassNames } from '@/internals/hooks';
import { createChainedFunction, mergeRefs } from '@/internals/utils';
import { WithAsProps } from '@/internals/types';
import { useScrollState } from './hooks/useScrollState';

interface ScrollViewProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {
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
}

const ScrollView = React.forwardRef((props: ScrollViewProps, ref: React.Ref<HTMLDivElement>) => {
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
    ...rest
  } = props;
  const { merge, withClassPrefix } = useClassNames(classPrefix);
  const { scrollState, handleScroll, bodyRef } = useScrollState(scrollShadow);

  const bodyStyles = { height, width, ...style };
  const bodyClasses = merge(
    className,
    withClassPrefix({
      shadow: scrollShadow,
      'shadow-top': scrollState === 'top',
      'shadow-middle': scrollState === 'middle',
      'shadow-bottom': scrollState === 'bottom',
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
    >
      {children}
    </Component>
  );
});

export default ScrollView;
