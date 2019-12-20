import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';
import Animation from '../Animation';
import IntlContext from '../IntlProvider/IntlContext';

import { CarouselProps } from './Carousel.d';

interface CarouselState {
  active: number;
  last?: boolean;
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
    shape: 'dot'
  };

  _key: string = (Math.random() * 1e18).toString(36).slice(0, 6);
  _timeListener = null;
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      last: false
    };
  }

  componentDidMount() {
    const { autoplay, autoplayInterval, children } = this.props;
    const count = React.Children.count(children);

    if (autoplay && count) {
      this._timeListener = setInterval(() => {
        const { active } = this.state;
        const nextActive = active === count - 1 ? 0 : active + 1;
        this.setState({
          last: nextActive === count - 1,
          active: nextActive
        });
      }, autoplayInterval);
    }
  }
  componentWillUnmount() {
    if (this._timeListener) {
      clearInterval(this._timeListener);
    }
  }

  handleChange = event => {
    const active = +event.target.value;
    this.setState({ active });
  };
  render() {
    const {
      componentClass: Component,
      children,
      classPrefix,
      className,
      placement,
      shape,
      ...rest
    } = this.props;
    const { active, last } = this.state;
    const addPrefix = prefix(classPrefix);
    const count = React.Children.count(children);
    const labels = [];
    const items = [];
    const vertical = placement === 'left' || placement === 'right';
    const lengthKey = vertical ? 'height' : 'width';

    React.Children.forEach(
      children,
      (child: React.DetailedReactHTMLElement<any, HTMLElement>, index) => {
        const id = `${this._key}-${index}`;
        labels.push(
          <li key={`label${index}`} className={addPrefix('label-wrapper')}>
            <input
              name={this._key}
              id={id}
              type="radio"
              onChange={this.handleChange}
              value={index}
              checked={active === index}
            />
            <label htmlFor={id} className={addPrefix('label')} />
          </li>
        );

        items.push(
          React.cloneElement(child, {
            key: `slider-item${index}`,
            style: {
              ...child.props.style,
              [lengthKey]: `${100 / count}%`
            },
            className: classNames(addPrefix('slider-item'), child.props.className)
          })
        );
      }
    );

    const classes = classNames(
      className,
      classPrefix,
      addPrefix(`placement-${placement}`),
      addPrefix(`shape-${shape}`)
    );
    const unhandled = getUnhandledProps(Carousel, rest);

    return (
      <Animation.Transition
        enteredClassName={addPrefix('last')}
        exitingClassName={addPrefix('reset')}
        in={last}
      >
        <Component className={classes} {...unhandled}>
          <div className={addPrefix('content')}>
            <IntlContext.Consumer>
              {context => {
                const activeRatio = `${!vertical && context?.rtl ? '' : '-'}${(100 / count) *
                  active}%`;
                const sliderStyles = {
                  [lengthKey]: `${count * 100}%`,
                  transform: vertical
                    ? `translate3d(0, ${activeRatio} ,0)`
                    : `translate3d(${activeRatio}, 0 ,0)`
                };
                return (
                  <div className={addPrefix('slider')} style={sliderStyles}>
                    {items}
                  </div>
                );
              }}
            </IntlContext.Consumer>
            {count ? (
              <div className={addPrefix('slider-after')}>{[items[items.length - 1], items[0]]}</div>
            ) : null}
          </div>
          <div className={addPrefix('toolbar')}>
            <ul>{labels}</ul>
          </div>
        </Component>
      </Animation.Transition>
    );
  }
}

export default defaultProps<CarouselProps>({
  classPrefix: 'carousel',
  componentClass: 'div'
})(Carousel);
