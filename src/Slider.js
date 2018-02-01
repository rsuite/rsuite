// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { on, DOMMouseMoveTracker, getWidth, getHeight, getOffset } from 'dom-lib';

import getUnhandledProps from './utils/getUnhandledProps';
import prefix, { globalKey } from './utils/prefix';
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
  customStyle?: Object,
  disabled?: boolean,
  graduated?: boolean,
  tooltip?: boolean,
  progress?: boolean,
  vertical?: boolean,
  onChange?: (value: number) => void
}

type States = {
  value: number,
  barWidth: number,
  barHeight: number,
  barOffset: Object,
  handleDown?: boolean
}


class Slider extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${globalKey}slider`,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    tooltip: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.checkValue(props.value || props.defaultValue),
      barWidth: 0,
      barHeight: 0,
      barOffset: {}
    };
  }

  componentDidMount() {
    this.updateBar();
    this.onWindowResizeListener = on(window, 'resize', _.debounce(this.handleWindowResize, 100));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentWillUnmount() {
    this.releaseMouseMoves();
    this.onWindowResizeListener && this.onWindowResizeListener.off();
  }

  onWindowResizeListener = null;
  getMouseMoveTracker() {
    return this.mouseMoveTracker || new DOMMouseMoveTracker(
      this.hanldeDragMove,
      this.hanldeDragEnd,
      document.body
    );
  }

  getSplitCount() {
    const { max, min, step } = this.props;
    return (max - min) / step;
  }

  setValue(value: number) {
    const { onChange, min, max } = this.props;
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    this.setState({ value });
    onChange && onChange(value);
  }


  checkValue(value: number) {
    const { max, min } = this.props;
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

    const { vertical } = this.props;
    const { barOffset } = this.state;
    const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
    this.setValue(this.calculateValue(offset));
  }

  mouseMoveTracker = null;
  bar = null;

  hanldeMouseDown = (event: SyntheticEvent<*>) => {

    if (this.props.disabled) {
      return;
    }

    this.mouseMoveTracker = this.getMouseMoveTracker();
    this.mouseMoveTracker.captureMouseMoves(event);
    this.setState({
      handleDown: true
    });

  }

  hanldeDragEnd = () => {
    this.releaseMouseMoves();
    this.setState({
      handleDown: false
    });
  }

  hanldeDragMove = (deltaX: number, deltaY: number, event: SyntheticDragEvent<*>) => {

    if (!this.mouseMoveTracker || !this.mouseMoveTracker.isDragging()) {
      return;
    }

    const { vertical } = this.props;
    const { barOffset } = this.state;
    const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;

    this.setValue(this.calculateValue(offset));
  }

  /**
   * 释放鼠标移动事件
   */
  releaseMouseMoves = () => {
    if (this.mouseMoveTracker) {
      this.mouseMoveTracker.releaseMouseMoves();
      this.mouseMoveTracker = null;
    }
  }

  handleWindowResize = () => {
    this.updateBar();
  }

  updateBar() {
    this.setState({
      barOffset: getOffset(this.bar),
      barWidth: getWidth(this.bar),
      barHeight: getHeight(this.bar),
    });
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name)

  /**
   * 渲染标尺
   */
  renderGraduated() {
    const { vertical } = this.props;
    const count = this.getSplitCount();
    const { barHeight } = this.state;
    const graduatedItems = [];

    for (let i = 0; i < count; i += 1) {
      let style = {};

      if (barHeight && vertical) {
        style.height = barHeight / count;
      }
      graduatedItems.push(<li style={style} key={i}>{' '}</li>);
    }
    return (
      <div className={this.addPrefix('graduator')}>
        <ul>{graduatedItems}</ul>
      </div>
    );

  }


  renderHanlde() {
    const { handleClassName, handleTitle, min, step, vertical, tooltip, customStyle } = this.props;
    const { value, barWidth, barHeight, handleDown } = this.state;

    // 标尺分割数量
    const count = this.getSplitCount();

    const offset = vertical ? 'top' : 'left';
    const width = vertical ? barHeight : barWidth;

    const style = customStyle ? Object.assign({}, customStyle, {
      [offset]: ((value - min) / step) * (width / count)
    }) :
      { [offset]: ((value - min) / step) * (width / count) };

    // 通过 value 计算出手柄位置
    return (
      <div
        className={classNames(this.addPrefix('handle'), handleClassName, {
          [this.addPrefix('showtip')]: handleDown
        })}
        role="presentation"
        onMouseDown={this.hanldeMouseDown}
        style={style}
      >
        {tooltip && <Tooltip placement="top"> {value} </Tooltip>}
        {handleTitle}
      </div>
    );
  }

  renderProgress() {
    const { vertical } = this.props;
    const { value, barWidth, barHeight } = this.state;
    const { step } = this.props;
    const count = this.getSplitCount();

    const key = vertical ? 'height' : 'width';
    const length = vertical ? barHeight : barWidth;
    const offset = (value / step) * (length / count);

    const style = {
      [key]: offset
    };

    return (
      <div style={style} className={this.addPrefix('progress-bar')} />
    );
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
      ...rest
    } = this.props;

    const { handleDown } = this.state;
    const classes = classNames(classPrefix, className, {
      [this.addPrefix('vertical')]: vertical,
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('graduated')]: graduated,
      [this.addPrefix('dragging')]: handleDown
    });

    const unhandled = getUnhandledProps(Slider, rest);

    return (
      <div
        {...unhandled}
        className={classes}
        onClick={this.hanldeClick}
        role="presentation"
      >
        <div
          className={classNames(this.addPrefix('bar'), barClassName)}
          ref={(ref) => {
            this.bar = ref;
          }}
        >
          {progress && this.renderProgress()}
          {graduated && this.renderGraduated()}
        </div>
        {this.renderHanlde()}
      </div>
    );
  }
}

export default Slider;

