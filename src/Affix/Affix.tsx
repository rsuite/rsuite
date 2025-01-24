import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import getOffset from 'dom-lib/getOffset';
import { Offset, WithAsProps } from '@/internals/types';
import { useClassNames, useElementResize, useEventListener, useMount } from '@/internals/hooks';
import { mergeRefs, forwardRef } from '@/internals/utils';
import { useCustom } from '../CustomProvider';

export interface AffixProps extends WithAsProps {
  /** Specify the container. */
  container?: HTMLElement | (() => HTMLElement);

  /** Distance from top */
  top?: number;

  /** Callback after the state changes. */
  onChange?: (fixed?: boolean) => void;

  /** Callback after the offset changes. */
  onOffsetChange?: (offset?: Offset) => void;
}

/**
 * Get the layout size and offset of the mount element
 */
function useOffset(
  mountRef: React.RefObject<HTMLDivElement>,
  onOffsetChange?: (offset?: Offset) => void
) {
  const [offset, setOffset] = useState<Offset | null>(null);

  const updateOffset = useCallback(() => {
    if (!mountRef.current) {
      return;
    }

    const newOffset = getOffset(mountRef.current);

    if (
      newOffset?.height !== offset?.height ||
      newOffset?.width !== offset?.width ||
      newOffset?.top !== offset?.top ||
      newOffset?.left !== offset?.left
    ) {
      setOffset(newOffset);

      if (offset !== null && newOffset !== null) {
        onOffsetChange?.(newOffset);
      }
    }
  }, [mountRef, offset, onOffsetChange]);

  // Update after the element size changes
  useElementResize(() => mountRef.current, updateOffset);

  // Initialize after the first render
  useMount(updateOffset);

  // Update after window size changes
  useEventListener(window, 'resize', updateOffset, false);

  // Update after window scroll
  useEventListener(window, 'scroll', debounce(updateOffset, 100), false);

  return offset;
}

/**
 * Get the layout size and offset of the container element
 * @param container
 */
function useContainerOffset(container) {
  const [offset, setOffset] = useState<Offset | null>(null);

  useEffect(() => {
    const node = typeof container === 'function' ? container() : container;
    setOffset(node ? getOffset(node) : null);
  }, [container]);

  return offset;
}

/**
 * Check whether the current element should be in a fixed state.
 * @param offset
 * @param containerOffset
 * @param props
 */
function useFixed(offset: Offset | null, containerOffset: Offset | null, props: AffixProps) {
  const { top, onChange } = props;
  const [fixed, setFixed] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!offset) {
      return;
    }
    const scrollY = window.scrollY || window.pageYOffset;

    // When the scroll distance exceeds the element's top value, it is fixed.
    let nextFixed = scrollY - (Number(offset?.top) - Number(top)) >= 0;

    // If the current element is specified in the container,
    // add to determine whether the current container is in the window range.
    if (containerOffset) {
      nextFixed =
        nextFixed && scrollY < Number(containerOffset.top) + Number(containerOffset.height);
    }

    if (nextFixed !== fixed) {
      setFixed(nextFixed);
      onChange?.(nextFixed);
    }
  }, [offset, top, containerOffset, fixed, onChange]);

  // Add scroll event to window
  useEventListener(window, 'scroll', handleScroll, false);

  return fixed;
}

/**
 * Components such as navigation, buttons, etc. can be fixed in the visible range.
 * Commonly used for pages with long content, fixed the specified elements in the visible range of the page to assist in quick operation.
 *
 * @see https://rsuitejs.com/components/affix/
 */
const Affix = forwardRef<'div', AffixProps>((props: AffixProps, ref) => {
  const { propsWithDefaults } = useCustom('Affix', props);
  const {
    as: Component = 'div',
    classPrefix = 'affix',
    className,
    children,
    container,
    top = 0,
    onChange,
    onOffsetChange,
    ...rest
  } = propsWithDefaults;

  const mountRef = useRef(null);
  const offset = useOffset(mountRef, onOffsetChange);
  const containerOffset = useContainerOffset(container);

  const fixed = useFixed(offset, containerOffset, { top, onChange });

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, {
    [withClassPrefix()]: fixed
  });

  const { width, height } = offset || {};
  const placeholderStyles = fixed ? { width, height } : undefined;
  const fixedStyles: React.CSSProperties = {
    position: 'fixed',
    top,
    width,
    zIndex: 10
  };

  const affixStyles = fixed ? fixedStyles : undefined;

  return (
    <Component {...rest} ref={mergeRefs(mountRef, ref)}>
      <div className={classes} style={affixStyles}>
        {children}
      </div>
      {fixed && <div aria-hidden style={placeholderStyles}></div>}
    </Component>
  );
});

Affix.displayName = 'Affix';

export default Affix;
