import React, { useState, useMemo, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { useClassNames, useControlled, useUpdateEffect, useTimeout } from '@/internals/hooks';
import { forwardRef, guid, ReactChildren, mergeRefs } from '@/internals/utils';
import { WithAsProps } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export interface CarouselProps extends WithAsProps {
  /** Autoplay element */
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
const Carousel = forwardRef<'div', CarouselProps>((props: CarouselProps, ref) => {
  const { rtl, propsWithDefaults } = useCustom('Carousel', props);
  const {
    as: Component = 'div',
    children,
    classPrefix = 'carousel',
    className,
    placement = 'bottom',
    shape = 'dot',
    autoplay,
    autoplayInterval = 4000,
    activeIndex: activeIndexProp,
    defaultActiveIndex = 0,
    onSelect,
    onSlideStart,
    onSlideEnd,
    ...rest
  } = propsWithDefaults;

  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  const count = ReactChildren.count(children);
  const labels: React.ReactElement[] = [];
  const vertical = placement === 'left' || placement === 'right';
  const lengthKey = vertical ? 'height' : 'width';

  const [activeIndex, setActiveIndex, isControlled] = useControlled(
    activeIndexProp,
    defaultActiveIndex
  );
  const [lastIndex, setLastIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useUpdateEffect(() => {
    // When the index is controlled, the index is not updated when the number of children changes.
    if (isControlled) {
      return;
    }
    // Reset the index when the number of children changes.
    setActiveIndex(0);
  }, [children, isControlled]);

  // Set a timer for automatic playback.
  // `autoplay` needs to be cast to boolean type to avoid undefined parameters.
  const { clear, reset } = useTimeout(
    () => handleSlide(),
    autoplayInterval,
    !!autoplay && count > 1
  );

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

  const uniqueId = useMemo(() => guid(), []);
  const items = ReactChildren.map(
    children as React.ReactElement[],
    (child: React.ReactElement, index) => {
      if (!child) {
        return;
      }
      const inputKey = `indicator_${uniqueId}_${index}`;
      labels.push(
        <li key={`label${index}`} className={prefix('label-wrapper')}>
          <input
            name={inputKey}
            id={inputKey}
            type="radio"
            onChange={handleChange}
            value={index}
            checked={activeIndex === index}
          />
          <label htmlFor={inputKey} className={prefix('label')} />
        </li>
      );

      return React.cloneElement(child, {
        key: `slider-item${index}`,
        'aria-hidden': activeIndex !== index,
        style: { ...child.props.style, [lengthKey]: `${100 / count}%` },
        className: classNames(prefix('slider-item'), child.props.className)
      });
    }
  );

  const classes = merge(className, withClassPrefix(`placement-${placement}`, `shape-${shape}`));

  const positiveOrder = vertical || !rtl;
  const sign = positiveOrder ? '-' : '';
  const activeRatio = `${sign}${(100 / count) * activeIndex}%`;
  const sliderStyles = {
    [lengthKey]: `${count * 100}%`,
    transform: vertical ? `translate3d(0, ${activeRatio} ,0)` : `translate3d(${activeRatio}, 0 ,0)`
  };
  const showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;

  return (
    <Component {...rest} ref={mergeRefs(ref, rootRef)} className={classes}>
      <div className={prefix('content')}>
        <div
          data-testid="carousel-slider"
          className={prefix('slider')}
          style={sliderStyles}
          onTransitionEnd={handleTransitionEnd}
        >
          {items}
        </div>
        {showMask && (
          <div
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
        <ul>{labels}</ul>
      </div>
    </Component>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
