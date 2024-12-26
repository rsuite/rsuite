import React, { useState, useRef } from 'react';
import { useCallback } from 'react';
import getStyle from 'dom-lib/getStyle';
import { useElementResize, useMount } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';

export interface Size {
  height: number;
  width: number;
}

export interface AutoSizerProps {
  /** Function responsible for rendering children. */
  children: (size: Size) => React.ReactNode;

  /** Optional custom CSS class name to attach to root AutoSizer element.    */
  className?: string | undefined;

  /** Default height to use for initial render; useful for SSR */
  defaultHeight?: number | undefined;

  /** Default width to use for initial render; useful for SSR */
  defaultWidth?: number | undefined;

  /** Disable dynamic :height property */
  disableHeight?: boolean | undefined;

  /** Disable dynamic :width property */
  disableWidth?: boolean | undefined;

  /** Optional inline style */
  style?: React.CSSProperties | undefined;

  /** Callback to be invoked on-resize */
  onResize?: ((size: Size) => void) | undefined;
}

/**
 * High-order component that automatically adjusts the width and height of a single child.
 *
 * @private
 */
const AutoSizer = React.forwardRef<HTMLDivElement, AutoSizerProps>((props, ref) => {
  const {
    children,
    className,
    disableHeight,
    disableWidth,
    defaultHeight,
    defaultWidth,
    style,
    onResize,
    ...rest
  } = props;
  const [height, setHeight] = useState(defaultHeight || 0);
  const [width, setWidth] = useState(defaultWidth || 0);
  const rootRef = useRef<HTMLDivElement>(null);

  const getParentNode = useCallback(() => {
    if (
      rootRef.current?.parentNode &&
      rootRef.current.parentNode.ownerDocument &&
      rootRef.current.parentNode.ownerDocument.defaultView &&
      rootRef.current.parentNode instanceof
        rootRef.current.parentNode.ownerDocument.defaultView.HTMLElement
    ) {
      return rootRef.current.parentNode;
    }
    return null;
  }, []);

  const handleResize = useCallback(() => {
    const parentNode = getParentNode();

    if (parentNode) {
      const offsetHeight = parentNode.offsetHeight || 0;
      const offsetWidth = parentNode.offsetWidth || 0;

      const style = getStyle(parentNode) as CSSStyleDeclaration;
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      const paddingTop = parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      const newHeight = offsetHeight - paddingTop - paddingBottom;
      const newWidth = offsetWidth - paddingLeft - paddingRight;

      if ((!disableHeight && height !== newHeight) || (!disableWidth && width !== newWidth)) {
        setHeight(offsetHeight - paddingTop - paddingBottom);
        setWidth(offsetWidth - paddingLeft - paddingRight);
        onResize?.({ height: offsetHeight, width: offsetWidth });
      }
    }
  }, [disableHeight, disableWidth, getParentNode, height, onResize, width]);

  useMount(handleResize);
  useElementResize(getParentNode(), handleResize);

  const outerStyle: React.CSSProperties = { overflow: 'visible' };
  const childParams: Size = { width: 0, height: 0 };

  if (!disableHeight) {
    outerStyle.height = 0;
    childParams.height = height;
  }

  if (!disableWidth) {
    outerStyle.width = 0;
    childParams.width = width;
  }

  return (
    <div
      className={className}
      ref={mergeRefs(rootRef, ref)}
      style={{ ...outerStyle, ...style }}
      {...rest}
    >
      {children(childParams)}
    </div>
  );
});

AutoSizer.displayName = 'AutoSizer';

export default AutoSizer;
