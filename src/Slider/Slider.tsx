import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getWidth, getHeight, getOffset } from 'dom-lib';
import { getUnhandledProps, defaultProps, prefix } from '../utils';
import { SliderProps } from './Slider.d';
import ProgressBar from './ProgressBar';
import Handle from './Handle';
import Graduated from './Graduated';

import { precisionMath, checkValue } from './utils';

interface SliderState {
  value: number;
}

export const sliderPropTypes = {
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

class Slider extends React.Component<SliderProps, SliderState> {
  static propTypes = sliderPropTypes;
  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    tooltip: true,
    locale: {}
  };
  barRef: React.RefObject<HTMLDivElement>;
  mouseMoveTracker = null;
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

  getMax(props?: SliderProps) {
    const { max, min, step } = props || this.props;
    return precisionMath(Math.floor((max - min) / step) * step + min);
  }

  getValue() {
    const { value } = this.props;
    return typeof value === 'undefined' ? this.state.value : this.checkValue(value);
  }

  setValue(value: number, event: React.MouseEvent) {
    const nextValue = this.checkValue(value);
    this.setState({ value: nextValue });
    this.props.onChange?.(nextValue, event);
  }

  checkValue(value: number, props?: SliderProps) {
    const { min } = props || this.props;
    const max = this.getMax(props);
    return checkValue(value, min, max);
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

  handleClick = (event: React.MouseEvent) => {
    if (this.props.disabled) {
      return;
    }
    const value = this.getValueByPosition(event);
    this.setValue(value, event);
  };
  handleDragMove = (event: React.MouseEvent) => {
    this.setValue(this.getValueByPosition(event), event);
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
    const value = this.getValue();

    return (
      <Handle
        position={((value - min) / (max - min)) * 100}
        className={handleClassName}
        style={handleStyle}
        disabled={disabled}
        vertical={vertical}
        tooltip={tooltip}
        renderTooltip={renderTooltip}
        rtl={locale.rtl}
        value={value}
        onDragMove={this.handleDragMove}
      >
        {handleTitle}
      </Handle>
    );
  }

  renderProgress() {
    const { vertical, min, locale } = this.props;
    const max = this.getMax();
    const value = this.getValue();
    return (
      <ProgressBar
        rtl={locale.rtl}
        vertical={vertical}
        start={0}
        end={((value - min) / (max - min)) * 100}
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

    const unhandled = getUnhandledProps(Slider, rest);

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

export default defaultProps<SliderProps>({
  classPrefix: 'slider'
})(Slider);
