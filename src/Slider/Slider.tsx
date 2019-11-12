import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { DOMMouseMoveTracker, addStyle, getWidth, getHeight, getOffset } from 'dom-lib';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import Tooltip from '../Tooltip';
import { SliderProps } from './Slider.d';

interface SliderState {
  value: number;
  handleDown?: boolean;
}

const precisionMath = value => parseFloat(value.toFixed(10));

class Slider extends React.Component<SliderProps, SliderState> {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    handleClassName: PropTypes.string,
    handleTitle: PropTypes.node,
    barClassName: PropTypes.string,
    handleStyle: PropTypes.object,
    disabled: PropTypes.bool,
    graduated: PropTypes.bool,
    tooltip: PropTypes.bool,
    progress: PropTypes.bool,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
    renderMark: PropTypes.func,
    renderTooltip: PropTypes.func,
    locale: PropTypes.object
  };
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    tooltip: true,
    locale: {}
  };
  handleRef: React.RefObject<HTMLDivElement>;
  barRef: React.RefObject<HTMLDivElement>;
  mouseMoveTracker = null;
  constructor(props) {
    super(props);

    this.state = {
      value: this.checkValue(props.defaultValue, props)
    };

    this.handleRef = React.createRef();
    this.barRef = React.createRef();
  }

  componentWillUnmount() {
    this.releaseMouseMoves();
  }
  getMouseMoveTracker() {
    return (
      this.mouseMoveTracker ||
      new DOMMouseMoveTracker(this.handleDragMove, this.handleDragEnd, document.body)
    );
  }

  getSplitCount() {
    const { min, step } = this.props;
    const max = this.getMax();
    return precisionMath((max - min) / step);
  }

  getMax(props?: SliderProps) {
    const { max, min, step } = props || this.props;
    return precisionMath(Math.floor((max - min) / step) * step + min);
  }

  getValue() {
    const { value } = this.props;
    return typeof value === 'undefined' ? this.state.value : this.checkValue(value);
  }

  setValue(value: number) {
    const { onChange, min } = this.props;
    const max = this.getMax();
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }

    this.setState({ value });
    onChange?.(value);
  }

  setTooltipPosition() {
    const { tooltip } = this.props;

    if (tooltip) {
      const handle = this.handleRef.current;
      const tip = handle.querySelector(`.${this.addPrefix('tooltip')}`);
      const width = getWidth(tip);
      addStyle(tip, 'left', `-${width / 2}px`);
    }
  }

  checkValue(value: number, props?: SliderProps) {
    const { min } = props || this.props;
    const max = this.getMax(props);
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }

  getHeight() {
    if (this.barRef.current) {
      return getHeight(this.barRef.current);
    }
    return 0;
  }

  getWidth() {
    if (this.barRef.current) {
      return getWidth(this.barRef.current);
    }
    return 0;
  }

  /**
   * 通过偏移量计算值
   * @param {number} offset 偏移量
   */
  calculateValue(offset: number) {
    const { step, vertical } = this.props;
    const count = this.getSplitCount();

    let value = 0;

    if (isNaN(offset)) {
      return value;
    }

    if (vertical) {
      const barHeight = this.getHeight();
      value = Math.round(offset / (barHeight / count)) * step;
    } else {
      const barWidth = this.getWidth();
      value = Math.round(offset / (barWidth / count)) * step;
    }

    return precisionMath(value);
  }

  updatePosition(event: React.MouseEvent) {
    const { vertical, min, locale } = this.props;
    const barOffset = getOffset(this.barRef.current);
    const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
    const value = locale.rtl && !vertical ? barOffset.width - offset : offset;

    this.setValue(this.calculateValue(value) + min);
  }

  handleClick = (event: React.MouseEvent) => {
    if (this.props.disabled) {
      return;
    }

    this.updatePosition(event);
  };

  handleMouseDown = (event: React.MouseEvent) => {
    if (this.props.disabled) {
      return;
    }
    this.mouseMoveTracker = this.getMouseMoveTracker();
    this.mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      handleDown: true
    });
  };

  handleMouseEnter = () => {
    this.setTooltipPosition();
  };

  handleDragEnd = () => {
    this.releaseMouseMoves();
    this.setState({
      handleDown: false
    });
  };

  handleDragMove = (_deltaX: number, _deltaY: number, event: React.DragEvent) => {
    if (!this.mouseMoveTracker || !this.mouseMoveTracker.isDragging()) {
      return;
    }

    this.updatePosition(event);
    this.setTooltipPosition();
  };

  /**
   * 释放鼠标移动事件
   */
  releaseMouseMoves = () => {
    if (this.mouseMoveTracker) {
      this.mouseMoveTracker.releaseMouseMoves();
      this.mouseMoveTracker = null;
    }
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderMark(mark: number, last?: boolean) {
    const { renderMark } = this.props;
    const classes = classNames(this.addPrefix('mark'), {
      [this.addPrefix('last-mark')]: last
    });

    if (renderMark) {
      return (
        <span className={classes}>
          <span className={this.addPrefix('mark-content')}>{renderMark(mark)}</span>
        </span>
      );
    }

    return null;
  }

  renderGraduated() {
    const { step, min } = this.props;
    const max = this.getMax();
    const count = this.getSplitCount();
    const value = this.getValue();
    const graduatedItems = [];
    const pass = precisionMath(value / step - min / step);
    const active = precisionMath(Math.ceil(((value - min) / (max - min)) * count));

    for (let i = 0; i < count; i += 1) {
      let classes = classNames({
        [this.addPrefix('pass')]: i <= pass,
        [this.addPrefix('active')]: i === active
      });

      let mark = precisionMath(i * step + min);
      let last = i === count - 1;

      graduatedItems.push(
        <li className={classes} key={i}>
          {this.renderMark(mark)}
          {last && this.renderMark(max, true)}
        </li>
      );
    }

    return (
      <div className={this.addPrefix('graduator')}>
        <ul>{graduatedItems}</ul>
      </div>
    );
  }

  renderHanlde() {
    const {
      handleClassName,
      handleTitle,
      min,
      vertical,
      tooltip,
      handleStyle,
      renderTooltip,
      locale
    } = this.props;
    const max = this.getMax();
    const { handleDown } = this.state;
    const value = this.getValue();

    const horizontalKey = locale.rtl ? 'right' : 'left';
    const direction = vertical ? 'top' : horizontalKey;
    const style = {
      ...handleStyle,
      // 通过 value 计算出手柄位置
      [direction]: `${((value - min) / (max - min)) * 100}%`
    };
    const handleClasses = classNames(this.addPrefix('handle'), handleClassName, {
      [this.addPrefix('showtip')]: handleDown
    });

    return (
      <div
        className={handleClasses}
        role="presentation"
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        style={style}
        ref={this.handleRef}
      >
        {tooltip && (
          <Tooltip className={classNames(this.addPrefix('tooltip'), 'placement-top')}>
            {renderTooltip ? renderTooltip(value) : value}
          </Tooltip>
        )}
        {handleTitle}
      </div>
    );
  }

  renderProgress() {
    const { vertical, min } = this.props;
    const max = this.getMax();
    const value = this.getValue();
    const key = vertical ? 'height' : 'width';
    const style = {
      [key]: `${((value - min) / (max - min)) * 100}%`
    };

    return <div style={style} className={this.addPrefix('progress-bar')} />;
  }

  render() {
    const {
      graduated,
      className,
      barClassName,
      progress,
      vertical,
      disabled,
      classPrefix,
      renderMark,
      ...rest
    } = this.props;

    const { handleDown } = this.state;
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('vertical')]: vertical,
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('graduated')]: graduated,
      [this.addPrefix('dragging')]: handleDown,
      [this.addPrefix('with-mark')]: _.isFunction(renderMark)
    });

    const unhandled = getUnhandledProps(Slider, rest);

    return (
      <div {...unhandled} className={classes} onClick={this.handleClick} role="presentation">
        <div className={classNames(this.addPrefix('bar'), barClassName)} ref={this.barRef}>
          {progress && this.renderProgress()}
          {graduated && this.renderGraduated()}
        </div>
        {this.renderHanlde()}
      </div>
    );
  }
}

export default defaultProps<SliderProps>({
  classPrefix: 'slider'
})(Slider);
