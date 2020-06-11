import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';
import ReactChildren from '../utils/ReactChildren';
import { CarouselProps } from './Carousel.d';

interface CarouselState {
  activeIndex: number;
  lastIndex: number;
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    componentClass: PropTypes.elementType,
    autoplay: PropTypes.bool,
    autoplayInterval: PropTypes.number,
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    shape: PropTypes.oneOf(['dot', 'bar'])
  };

  static defaultProps = {
    autoplayInterval: 4000,
    placement: 'bottom',
    shape: 'dot',
    locale: {}
  };

  _autoplayTimer = null;
  _key: string = (Math.random() * 1e18).toString(36).slice(0, 6);

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      lastIndex: 0
    };
  }

  componentDidMount() {
    this.triggerAutoPlay();
  }

  componentDidUpdate() {
    this.triggerAutoPlay();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  triggerAutoPlay() {
    const { autoplay, autoplayInterval, children } = this.props;
    const count = ReactChildren.count(children as React.ReactChildren);

    if (!this._autoplayTimer && autoplay && count > 1) {
      this._autoplayTimer = setTimeout(this.handleAutoplay, autoplayInterval);
    }
  }

  clearTimer() {
    clearTimeout(this._autoplayTimer);
    this._autoplayTimer = null;
  }

  handleAutoplay = (nextActiveIndex?: number) => {
    const { children } = this.props;
    const { activeIndex } = this.state;
    this.clearTimer();
    const count = ReactChildren.count(children as React.ReactChildren);
    const nextIndex = nextActiveIndex ?? activeIndex + 1;
    this.setState({
      activeIndex: nextIndex % count,
      lastIndex: nextActiveIndex == null ? activeIndex : nextIndex % count
    });
    this.triggerAutoPlay();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activeIndex = +event.target.value;
    this.handleAutoplay(activeIndex);
  };

  render() {
    const {
      componentClass: Component,
      children,
      classPrefix,
      className,
      placement,
      shape,
      locale,
      ...rest
    } = this.props;

    const { activeIndex, lastIndex } = this.state;
    const addPrefix = prefix(classPrefix);
    const count = ReactChildren.count(children as React.ReactChildren);
    const labels = [];
    const vertical = placement === 'left' || placement === 'right';
    const lengthKey = vertical ? 'height' : 'width';

    const items = React.Children.map(
      children,
      (child: React.DetailedReactHTMLElement<any, HTMLElement>, index) => {
        if (!child) {
          return;
        }
        const inputKey = `indicator_${this._key}_${index}`;
        labels.push(
          <li key={`label${index}`} className={addPrefix('label-wrapper')}>
            <input
              name={inputKey}
              id={inputKey}
              type="radio"
              onChange={this.handleChange}
              value={index}
              checked={activeIndex === index}
            />
            <label htmlFor={inputKey} className={addPrefix('label')} />
          </li>
        );

        return React.cloneElement(child, {
          key: `slider-item${index}`,
          style: {
            ...child.props.style,
            [lengthKey]: `${100 / count}%`
          },
          className: classNames(addPrefix('slider-item'), child.props.className)
        });
      }
    );

    const classes = classNames(
      className,
      classPrefix,
      addPrefix(`placement-${placement}`),
      addPrefix(`shape-${shape}`)
    );
    const unhandled = getUnhandledProps(Carousel, rest);

    const positiveOrder = vertical || !locale?.rtl;
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
      <Component className={classes} {...unhandled}>
        <div className={addPrefix('content')}>
          <div className={addPrefix('slider')} style={sliderStyles}>
            {items}
          </div>
          {showMask && (
            <div
              className={classNames(addPrefix('slider-after'), {
                [addPrefix('slider-after-vertical')]: vertical
              })}
              style={{
                [lengthKey]: '200%'
              }}
            >
              {[items[items.length - 1], items[0]].map(node =>
                React.cloneElement(node, {
                  key: node.key,
                  style: {
                    ...node.props.style,
                    [lengthKey]: '50%'
                  }
                })
              )}
            </div>
          )}
        </div>
        <div className={addPrefix('toolbar')}>
          <ul>{labels}</ul>
        </div>
      </Component>
    );
  }
}

export default defaultProps<CarouselProps>({
  classPrefix: 'carousel',
  componentClass: 'div'
})(Carousel);
