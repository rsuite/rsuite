import React, { useState, useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom, useControlled, useUniqueId } from '@/internals/hooks';
import { forwardRef, rch, mergeRefs } from '@/internals/utils';
import type { ReactElement } from '@/internals/types';
import enGB from '../locales/en_GB';
import type { CarouselLocale } from '../locales';
import useCarouselAutoplay from './useCarouselAutoplay';
import CarouselRotationControl from './CarouselRotationControl';

// React 18 forwards inert as a string; React 19 treats it as a boolean attribute.
// The nonempty attribute-name value works in both renderers, including SSR.
const inertValue = 'inert' as unknown as boolean;

export interface CarouselProps
  extends BoxProps,
    Pick<
      React.HTMLAttributes<HTMLElement>,
      'onFocusCapture' | 'onPointerEnter' | 'onPointerLeave'
    > {
  /** Automatically rotate slides. Focus pauses rotation until the user restarts it. */
  autoplay?: boolean;

  /** Autoplay interval */
  autoplayInterval?: number;

  /** Button placement */
  placement?: 'top' | 'bottom' | 'left' | 'right';

  /** Button shape */
  shape?: 'dot' | 'bar';

  /** Active element index */
  activeIndex?: number;

  /** Defaul initial index */
  defaultActiveIndex?: number;

  /** Accessible control names. slideLabel supports {0} for the position and {1} for the total. */
  locale?: CarouselLocale;

  /** Callback fired when the active item manually changes */
  onSelect?: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback fired when a slide transition starts */
  onSlideStart?: (index: number, event?: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback fired when a slide transition ends */
  onSlideEnd?: (index: number, event: React.TransitionEvent<HTMLDivElement>) => void;
}

/**
 * The Carousel component is used to display a series of content.
 * @see https://rsuitejs.com/components/carousel
 */
const Carousel = forwardRef<'div', CarouselProps>((props, ref) => {
  const { rtl, propsWithDefaults } = useCustom('Carousel', props);
  const {
    as,
    children,
    classPrefix = 'carousel',
    className,
    placement = 'bottom',
    shape = 'dot',
    autoplay,
    autoplayInterval = 4000,
    activeIndex: activeIndexProp,
    defaultActiveIndex = 0,
    locale,
    onSelect,
    onSlideStart,
    onSlideEnd,
    onFocusCapture,
    onPointerEnter,
    onPointerLeave,
    ...rest
  } = propsWithDefaults;

  const { prefix, merge, withPrefix } = useStyles(classPrefix);
  const count = rch.count(children);
  const labels: React.ReactElement[] = [];
  const vertical = placement === 'left' || placement === 'right';
  const lengthKey = vertical ? 'height' : 'width';

  const [activeIndex, setActiveIndex, isControlled] = useControlled(
    activeIndexProp,
    defaultActiveIndex
  );
  const [lastIndex, setLastIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const previousSelectionInputs = useRef({ children, isControlled });

  useEffect(() => {
    const previous = previousSelectionInputs.current;
    previousSelectionInputs.current = { children, isControlled };

    // Effect reconnection alone should preserve the user's selected slide.
    if (
      !isControlled &&
      (previous.children !== children || previous.isControlled !== isControlled)
    ) {
      setActiveIndex(0);
    }
  }, [children, isControlled, setActiveIndex]);

  const canAutoplay = !!autoplay && count > 1;
  const { playing, reducedMotion, pause, changePlaying, changeHovered, clear, reset } =
    useCarouselAutoplay(canAutoplay, autoplayInterval, () => handleSlide(), rootRef);

  const handleSlide = useCallback(
    (nextActiveIndex?: number, event?: React.ChangeEvent<HTMLInputElement>) => {
      if (!rootRef.current) {
        return;
      }

      clear();
      const index = nextActiveIndex ?? activeIndex + 1;

      // When index is greater than count, start from 1 again.
      const nextIndex = index % count;

      setActiveIndex(nextIndex);
      onSlideStart?.(nextIndex, event);
      setLastIndex(nextActiveIndex == null ? activeIndex : nextIndex);
      reset();
    },
    [activeIndex, count, setActiveIndex, clear, onSlideStart, reset]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeIndex = +event.target.value;
    handleSlide(activeIndex, event);
    onSelect?.(activeIndex, event);
  };

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      onSlideEnd?.(activeIndex, event);
    },
    [activeIndex, onSlideEnd]
  );

  const uniqueId = useUniqueId('');
  const indicatorName = `indicator_${uniqueId}`;
  const items = rch.map(children as React.ReactElement[], (child: ReactElement, index) => {
    if (!child) {
      return;
    }
    const inputKey = `${indicatorName}_${index}`;
    labels.push(
      <li key={`label${index}`} className={prefix('label-wrapper')} role="presentation">
        <input
          name={indicatorName}
          id={inputKey}
          type="radio"
          onChange={handleChange}
          value={index}
          checked={activeIndex === index}
          aria-labelledby={child.props['aria-labelledby']}
          aria-label={
            child.props['aria-label'] ||
            (locale?.slideLabel || enGB.Carousel.slideLabel).replace(/\{(0|1)\}/g, (_, position) =>
              String(position === '0' ? index + 1 : count)
            )
          }
        />
        <label htmlFor={inputKey} className={prefix('label')} />
      </li>
    );

    return React.cloneElement(child, {
      key: `slider-item${index}`,
      'aria-hidden': activeIndex !== index,
      style: { ...child.props.style, [lengthKey]: `${100 / count}%` },
      className: classNames(prefix('slider-item'), child.props?.className)
    });
  });

  const classes = merge(
    className,
    withPrefix(`placement-${placement}`, `shape-${shape}`, { 'reduce-motion': reducedMotion })
  );

  const positiveOrder = vertical || !rtl;
  const sign = positiveOrder ? '-' : '';
  const activeRatio = `${sign}${(100 / count) * activeIndex}%`;
  const sliderStyles = {
    [lengthKey]: `${count * 100}%`,
    transform: vertical ? `translate3d(0, ${activeRatio} ,0)` : `translate3d(${activeRatio}, 0 ,0)`
  };
  const showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;

  return (
    <Box
      as={as}
      {...rest}
      ref={mergeRefs(ref, rootRef)}
      className={classes}
      onFocusCapture={event => {
        pause();
        onFocusCapture?.(event);
      }}
      onPointerEnter={event => {
        changeHovered(true, event.pointerType);
        onPointerEnter?.(event);
      }}
      onPointerLeave={event => {
        changeHovered(false, event.pointerType);
        onPointerLeave?.(event);
      }}
    >
      {canAutoplay && (
        <CarouselRotationControl
          playing={playing}
          onChange={changePlaying}
          className={prefix('rotation-control')}
          label={
            playing
              ? locale?.stopRotation || enGB.Carousel.stopRotation
              : locale?.startRotation || enGB.Carousel.startRotation
          }
        />
      )}
      <div className={prefix('content')}>
        <div
          data-testid="carousel-slider"
          className={prefix('slider')}
          style={sliderStyles}
          onTransitionEnd={handleTransitionEnd}
        >
          {items?.map(
            item =>
              item && (
                <div
                  key={item.key}
                  className={prefix('item-wrapper')}
                  style={{ display: 'contents' }}
                  aria-hidden={item.props['aria-hidden']}
                  inert={item.props['aria-hidden'] ? inertValue : undefined}
                >
                  {item}
                </div>
              )
          )}
        </div>
        {showMask && (
          <div
            aria-hidden="true"
            inert={inertValue}
            className={prefix('slider-after', { 'slider-after-vertical': vertical })}
            style={{ [lengthKey]: '200%' }}
          >
            {[items[items.length - 1], items[0]].map(node =>
              React.cloneElement(node, {
                key: node.key,
                style: { ...node.props.style, [lengthKey]: '50%' }
              })
            )}
          </div>
        )}
      </div>
      <div className={prefix('toolbar')}>
        <ul role="radiogroup" aria-label={locale?.selectSlide || enGB.Carousel.selectSlide}>
          {labels}
        </ul>
      </div>
    </Box>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
