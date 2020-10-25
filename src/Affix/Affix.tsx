import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getOffset } from 'dom-lib';
import { Offset, RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { mergeRefs, useClassNames, useElementResize, useEventListener } from '../utils';

export interface AffixProps extends WithAsProps {
  /** Distance from top */
  top?: number;

  /** Callback after the state changes. */
  onChange?: (fixed?: boolean) => void;

  /** Specify the container. */
  container?: HTMLElement | (() => HTMLElement);
}

/**
 * Get the layout size and offset of the mount element
 */
function useOffset(mountRef: React.RefObject<HTMLDivElement>) {
  const [offset, setOffset] = useState<Offset>(null);
  const updateOffset = useCallback(() => {
    setOffset(getOffset(mountRef.current));
  }, [mountRef]);

  // Update after the element size changes
  useElementResize(() => mountRef.current, updateOffset);

  // Initialize after the first render
  useEffect(updateOffset, [updateOffset]);

  return offset;
}

/**
 * Get the layout size and offset of the container element
 * @param container
 */
function useContainerOffset(container) {
  const [offset, setOffset] = useState<Offset>(null);

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
function useFixed(offset: Offset, containerOffset: Offset, props: AffixProps) {
  const { top, onChange } = props;
  const [fixed, setFixed] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!offset) {
      return;
    }
    const scrollY = window.scrollY || window.pageYOffset;

    // When the scroll distance exceeds the element's top value, it is fixed.
    let nextFixed = scrollY - (offset.top - top) >= 0;

    // If the current element is specified in the container,
    // add to determine whether the current container is in the window range.
    if (containerOffset) {
      nextFixed = nextFixed && scrollY < containerOffset.top + containerOffset.height;
    }

    if (nextFixed !== fixed) {
      setFixed(nextFixed);
      onChange?.(nextFixed);
    }
  }, [fixed, offset, containerOffset, onChange, top]);

  // Add scroll event to window
  useEventListener(window, 'scroll', handleScroll, false);

  return fixed;
}

const Affix: RsRefForwardingComponent<'div', AffixProps> = React.forwardRef(
  (props: AffixProps, ref) => {
    const {
      as: Component = 'div',
      classPrefix = 'affix',
      className,
      children,
      container,
      top = 0,
      onChange,
      ...rest
    } = props;

    const mountRef = useRef(null);
    const offset = useOffset(mountRef);
    const containerOffset = useContainerOffset(container);
    const fixed = useFixed(offset, containerOffset, { top, onChange });

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, {
      [withClassPrefix()]: fixed
    });

    const placeholderStyles = fixed ? { width: offset.width, height: offset.height } : undefined;
    const fixedStyles: React.CSSProperties = {
      position: 'fixed',
      top,
      left: offset?.left,
      width: offset?.width,
      zIndex: 10
    };

    const affixStyles = fixed ? fixedStyles : null;

    return (
      <Component {...rest} ref={mergeRefs(mountRef, ref)}>
        <div className={classes} style={affixStyles}>
          {children}
        </div>
        {fixed && <div aria-hidden style={placeholderStyles}></div>}
      </Component>
    );
  }
);

Affix.displayName = 'Affix';
Affix.propTypes = {
  top: PropTypes.number,
  onChange: PropTypes.func,
  container: PropTypes.oneOfType([PropTypes.any, PropTypes.func])
};

export default Affix;
