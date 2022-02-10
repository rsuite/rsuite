import React, { useState, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  useClassNames,
  useCustom,
  guid,
  ReactChildren,
  useTimeout,
  mergeRefs,
  useControlled
} from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

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

const Carousel: RsRefForwardingComponent<'div', CarouselProps> = React.forwardRef(
  (props: CarouselProps, ref) => {
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
    } = props;

    const { rtl } = useCustom('Carousel');
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const count = ReactChildren.count(children as React.ReactChildren);
    const labels: React.ReactElement[] = [];
    const vertical = placement === 'left' || placement === 'right';
    const lengthKey = vertical ? 'height' : 'width';

    const [activeIndex, setActiveIndex] = useControlled(activeIndexProp, defaultActiveIndex);
    const [lastIndex, setLastIndex] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);

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
    const items = React.Children.map(
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
      transform: vertical
        ? `translate3d(0, ${activeRatio} ,0)`
        : `translate3d(${activeRatio}, 0 ,0)`
    };
    const showMask = count > 1 && activeIndex === 0 && activeIndex !== lastIndex;

    return (
      <Component {...rest} ref={mergeRefs(ref, rootRef)} className={classes}>
        <div className={prefix('content')}>
          <div
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
  }
);

Carousel.displayName = 'Carousel';
Carousel.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  shape: PropTypes.oneOf(['dot', 'bar']),
  onSelect: PropTypes.func,
  onSlideStart: PropTypes.func,
  onSlideEnd: PropTypes.func
};

export default Carousel;
