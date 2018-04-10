// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom'; /* eslint-disable react/no-find-dom-node */
import classNames from 'classnames';
import _ from 'lodash';
import { on, DOMMouseMoveTracker, addStyle, getWidth, getHeight, getOffset } from 'dom-lib';

import { getUnhandledProps, defaultProps, prefix } from './utils';
import Tooltip from './Tooltip';

type Props = {
  min: number,
  max: number,
  step: number,
  value?: number,
  defaultValue: number,
  className?: string,
  classPrefix?: string,
  handleClassName?: string,
  handleTitle?: React.Node,
  barClassName?: string,
  hanldeStyle?: Object,
  disabled?: boolean,
  graduated?: boolean,
  tooltip?: boolean,
  progress?: boolean,
  vertical?: boolean,
  onChange?: (value: number) => void,
  renderMark?: (mark: number) => React.Node
};

type State = {
  value: number,
  barWidth: number,
  barHeight: number,
  handleDown?: boolean
};

class Slider extends React.Component<Props, State> {
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    tooltip: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.checkValue(props.defaultValue, props),
      barWidth: 0,
      barHeight: 0
    };
  }

  componentDidMount() {
    this.updateBar();
    this.onWindowResizeListener = on(window, 'resize', _.debounce(this.handleWindowResize, 100));
  }

  componentWillUnmount() {
    this.releaseMouseMoves();
    this.onWindowResizeListener && this.onWindowResizeListener.off();
  }

  onWindowResizeListener = null;
  getMouseMoveTracker() {
    return (
      this.mouseMoveTracker ||
      new DOMMouseMoveTracker(this.hanldeDragMove, this.hanldeDragEnd, document.body)
    );
  }

  getSplitCount() {
    const { min, step } = this.props;
    const max = this.getMax();
    return (max - min) / step;
  }

  getMax(props?: Props) {
    const { max, min, step } = props || this.props;
    return Math.floor((max - min) / step) * step + min;
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
    onChange && onChange(value);
  }

  setTooltipPosition() {
    const { tooltip } = this.props;
    if (tooltip) {
      const handle: any = findDOMNode(this.handle);
      const tip = handle.querySelector(`.${this.addPrefix('tooltip')}`);
      const width = getWidth(tip);
      addStyle(tip, 'left', `-${width / 2}px`);
    }
  }

  checkValue(value: number, props?: Props) {
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

  /**
   * 通过偏移量计算值
   * @param {number} offset 偏移量
   */
  calculateValue(offset: number) {
    const { step, vertical } = this.props;
    const { barWidth, barHeight } = this.state;
    const count = this.getSplitCount();

    let value = 0;

    if (isNaN(offset)) {
      return value;
    }

    if (vertical) {
      value = Math.round(offset / (barHeight / count)) * step;
    } else {
      value = Math.round(offset / (barWidth / count)) * step;
    }

    return value;
  }

  hanldeClick = (event: SyntheticDragEvent<*>) => {
    if (this.props.disabled) {
      return;
    }

    const { vertical, min } = this.props;
    const barOffset = getOffset(this.bar);
    const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
    this.setValue(this.calculateValue(offset) + min);
  };

  mouseMoveTracker = null;
  bar = null;
  handle = null;

  hanldeMouseDown = (event: SyntheticEvent<*>) => {
    if (this.props.disabled) {
      return;
    }
    this.mouseMoveTracker = this.getMouseMoveTracker();
    this.mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      handleDown: true
    });
  };

  hanldeDragEnd = () => {
    this.releaseMouseMoves();
    this.setState({
      handleDown: false
    });
  };

  hanldeDragMove = (deltaX: number, deltaY: number, event: SyntheticDragEvent<*>) => {
    if (!this.mouseMoveTracker || !this.mouseMoveTracker.isDragging()) {
      return;
    }

    const { vertical, min } = this.props;
    const barOffset = getOffset(this.bar);
    const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;

    this.setValue(this.calculateValue(offset) + min);
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

  handleWindowResize = () => {
    this.updateBar();
  };

  updateBar() {
    this.setState({
      barWidth: getWidth(this.bar),
      barHeight: getHeight(this.bar)
    });
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleRef = ref => {
    this.handle = ref;
  };

  barRef = ref => {
    this.bar = ref;
  };

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

  /**
   * 渲染标尺
   */
  renderGraduated() {
    const { vertical, step, min } = this.props;
    const max = this.getMax();
    const count = this.getSplitCount();
    const { barHeight } = this.state;
    const value = this.getValue();
    const graduatedItems = [];
    const pass = value / step - min / step;
    const active = Math.ceil((value - min) / (max - min) * count);

    for (let i = 0; i < count; i += 1) {
      let style = {};
      let classes = classNames({
        [this.addPrefix('pass')]: i <= pass,
        [this.addPrefix('active')]: i === active
      });

      if (barHeight && vertical) {
        style.height = barHeight / count;
      }
      let mark = i * step + min;
      let last = i === count - 1;

      graduatedItems.push(
        <li className={classes} style={style} key={i}>
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
    const { handleClassName, handleTitle, min, vertical, tooltip, hanldeStyle } = this.props;
    const max = this.getMax();
    const { handleDown } = this.state;
    const value = this.getValue();

    const direction = vertical ? 'top' : 'left';
    const style = {
      ...hanldeStyle,
      // 通过 value 计算出手柄位置
      [direction]: `${(value - min) / (max - min) * 100}%`
    };
    const handleClasses = classNames(this.addPrefix('handle'), handleClassName, {
      [this.addPrefix('showtip')]: handleDown
    });

    return (
      <div
        className={handleClasses}
        role="presentation"
        onMouseDown={this.hanldeMouseDown}
        style={style}
        ref={this.handleRef}
      >
        {tooltip && (
          <Tooltip placement="top" className={this.addPrefix('tooltip')}>
            {value}
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
      [key]: `${(value - min) / (max - min) * 100}%`
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
      <div {...unhandled} className={classes} onClick={this.hanldeClick} role="presentation">
        <div className={classNames(this.addPrefix('bar'), barClassName)} ref={this.barRef}>
          {progress && this.renderProgress()}
          {graduated && this.renderGraduated()}
        </div>
        {this.renderHanlde()}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'slider'
})(Slider);
