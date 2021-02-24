import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getWidth, getHeight, getOffset } from 'dom-lib';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import { RangeSliderProps, ValueType } from './RangeSlider.d';
import { sliderPropTypes } from '../Slider/Slider';
import ProgressBar from '../Slider/ProgressBar';
import Handle from '../Slider/Handle';
import Graduated from '../Slider/Graduated';
import { precisionMath, checkValue } from '../Slider/utils';

interface RangeSliderState {
  value: ValueType;
}

const rangeSliderPropTypes = {
  ...sliderPropTypes,
  value: PropTypes.arrayOf(PropTypes.number),
  defaultValue: PropTypes.arrayOf(PropTypes.number)
};

class RangeSlider extends React.Component<RangeSliderProps, RangeSliderState> {
  static propTypes = rangeSliderPropTypes;
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [0, 0],
    tooltip: true,
    progress: true,
    locale: {}
  };
  barRef: React.RefObject<HTMLDivElement>;
  mouseMoveTracker = null;
  handleIndexs = [0, 1]; // Define the parameter position of the handle
  constructor(props) {
    super(props);
    this.state = {
      value: this.checkValue(props.defaultValue, props)
    };

    this.barRef = React.createRef();
  }

  getSplitCount() {
    const { min, step } = this.props;
    const max = this.getMax();
    return precisionMath((max - min) / step);
  }

  getMax(props?: RangeSliderProps) {
    const { max, min, step } = props || this.props;
    return precisionMath(Math.floor((max - min) / step) * step + min);
  }

  getValue() {
    const { value } = this.props;
    return typeof value === 'undefined' ? this.state.value : this.checkValue(value);
  }

  setValue(value: ValueType, event: React.MouseEvent) {
    const nextValue = this.checkValue(value);
    this.setState({ value: nextValue });
    this.props.onChange?.(nextValue, event);
  }

  checkValue(value: ValueType, props?: RangeSliderProps): ValueType {
    const { min } = props || this.props;
    const max = this.getMax(props);
    const [start, end] = value;
    return [checkValue(start, min, max), checkValue(end, min, max)];
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

  getValueByOffset(offset: number) {
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

  getValueByPosition = (event: React.MouseEvent) => {
    const { vertical, min, locale } = this.props;
    const barOffset = getOffset(this.barRef.current);
    const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
    const value = locale.rtl && !vertical ? barOffset.width - offset : offset;

    return this.getValueByOffset(value) + min;
  };

  getRangeValue = (key: 'start' | 'end', event: React.MouseEvent) => {
    let [start, end] = this.getValue();
    const value = this.getValueByPosition(event);

    if (key === 'start') {
      start = value;
    } else if (key === 'end') {
      end = value;
    }

    return [start, end];
  };

  handleClick = (event: React.MouseEvent) => {
    if (this.props.disabled) {
      return;
    }

    let [start, end] = this.getValue();
    const value = this.getValueByPosition(event);

    /**
     * Judging that the current click value is closer to the values ​​of `start` and` end`.
     */
    if (Math.abs(start - value) < Math.abs(end - value)) {
      start = value;
    } else {
      end = value;
    }

    this.setValue([start, end].sort() as ValueType, event);
  };

  handleDragMove = (key: 'start' | 'end', event: React.MouseEvent) => {
    let [start, end] = this.getRangeValue(key, event);

    if (start >= end) {
      /**
       * When the value of `start` is greater than the value of` end`,
       * the position of the handle is reversed.
       */
      this.handleIndexs.reverse();
      if (key === 'start') {
        start = this.getValue()[1];
      } else {
        end = this.getValue()[0];
      }
    }

    this.setValue([start, end], event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderGraduated() {
    const { step, min, renderMark } = this.props;
    const max = this.getMax();
    const count = this.getSplitCount();
    const value = this.getValue();

    return (
      <Graduated
        step={step}
        min={min}
        max={max}
        count={count}
        value={value}
        renderMark={renderMark}
      />
    );
  }

  renderHandle() {
    const {
      handleClassName,
      handleStyle,
      handleTitle,
      min,
      vertical,
      tooltip,
      renderTooltip,
      locale,
      disabled
    } = this.props;

    const max = this.getMax();
    const [start, end] = this.getValue();

    const commonProps = {
      disabled,
      vertical,
      tooltip,
      renderTooltip,
      rtl: locale.rtl,
      className: handleClassName,
      style: handleStyle
    };

    const handleProps = [
      {
        value: start,
        position: ((start - min) / (max - min)) * 100,
        onDragMove: this.handleDragMove.bind(this, 'start')
      },
      {
        value: end,
        position: ((end - min) / (max - min)) * 100,
        onDragMove: this.handleDragMove.bind(this, 'end')
      }
    ];

    return (
      <React.Fragment>
        <Handle {...commonProps} {...handleProps[this.handleIndexs[0]]}>
          {handleTitle}
        </Handle>

        <Handle {...commonProps} {...handleProps[this.handleIndexs[1]]}>
          {handleTitle}
        </Handle>
      </React.Fragment>
    );
  }

  renderProgress() {
    const { vertical, min, locale } = this.props;
    const max = this.getMax();
    const [start, end] = this.getValue();
    return (
      <ProgressBar
        rtl={locale.rtl}
        vertical={vertical}
        start={((start - min) / (max - min)) * 100}
        end={((end - min) / (max - min)) * 100}
      />
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
      renderMark,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className, {
      [this.addPrefix('vertical')]: vertical,
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('graduated')]: graduated,
      [this.addPrefix('with-mark')]: renderMark
    });

    const unhandled = getUnhandledProps(RangeSlider, rest);

    return (
      <div {...unhandled} className={classes} role="presentation">
        <div
          className={classNames(this.addPrefix('bar'), barClassName)}
          ref={this.barRef}
          onClick={this.handleClick}
        >
          {progress && this.renderProgress()}
          {graduated && this.renderGraduated()}
        </div>
        {this.renderHandle()}
      </div>
    );
  }
}

export default defaultProps<RangeSliderProps>({
  classPrefix: 'slider'
})(RangeSlider);
