import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useClassNames, useCustom, guid, ReactChildren, useTimeout } from '../utils';
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

  /** Callback fired when the active item changes */
  onSelect: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback fired when a slide transition starts */
  onSlideStart?: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Callback fired when a slide transition ends */
  onSlideEnd?: (index: number, event: React.TransitionEvent<HTMLDivElement>) => void;
}

const defaultProps: Partial<CarouselProps> = {
  as: 'div',
  classPrefix: 'carousel',
  autoplayInterval: 4000,
  placement: 'bottom',
  shape: 'dot'
};

const Carousel: RsRefForwardingComponent<'div', CarouselProps> = React.forwardRef(
  (props: CarouselProps, ref) => {
    const {
      as: Component,
      children,
      classPrefix,
      className,
      placement,
      shape,
      autoplay,
      autoplayInterval,
      onSelect,
      onSlideStart,
      onSlideEnd,
      ...rest
    } = props;

    const { rtl } = useCustom('Carousel');
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const count = ReactChildren.count(children as React.ReactChildren);
    const labels = [];
    const vertical = placement === 'left' || placement === 'right';
    const lengthKey = vertical ? 'height' : 'width';

    const [activeIndex, setActiveIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(0);

    const handleSlide = (nextActiveIndex?: number, event?: React.ChangeEvent<HTMLInputElement>) => {
      clear();
      const index = nextActiveIndex ?? activeIndex + 1;

      // When index is greater than count, start from 1 again.
      const nextIndex = index % count;

      setActiveIndex(nextIndex);
      onSlideStart?.(nextIndex, event);
      setLastIndex(nextActiveIndex == null ? activeIndex : nextIndex);
      reset();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const activeIndex = +event.target.value;
      handleSlide(activeIndex);
      onSelect?.(activeIndex, event);
    };

    const handleTransitionEnd = useCallback(
      (event: React.TransitionEvent<HTMLDivElement>) => {
        onSlideEnd?.(activeIndex, event);
      },
      [activeIndex, onSlideEnd]
    );

    // Set a timer for automatic playback.
    // `autoplay` needs to be cast to boolean type to avoid undefined parameters.
    const { clear, reset } = useTimeout(handleSlide, autoplayInterval, !!autoplay && count > 1);

    const uniqueId = useMemo(() => guid(), []);
    const items = React.Children.map(
      children,
      (child: React.DetailedReactHTMLElement<any, HTMLElement>, index) => {
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
      <Component {...rest} ref={ref} className={classes}>
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
Carousel.defaultProps = defaultProps;
Carousel.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  autoplay: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  shape: PropTypes.oneOf(['dot', 'bar']),
  onSelect: PropTypes.func,
  onSlideStart: PropTypes.func,
  onSlideEnd: PropTypes.func
};

export default Carousel;
