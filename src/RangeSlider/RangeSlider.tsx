import React, { useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getWidth, getHeight, getOffset } from 'dom-lib';
import { useClassNames, useCustom, useControlled, useEventCallback } from '../utils';
import { sliderPropTypes } from '../Slider/Slider';
import ProgressBar from '../Slider/ProgressBar';
import Handle from '../Slider/Handle';
import Graduated from '../Slider/Graduated';
import { precisionMath, checkValue } from '../Slider/utils';
import { SliderProps } from '../Slider';

export type ValueType = number[];
export type RangeSliderProps = SliderProps<ValueType>;

const defaultProps: Partial<RangeSliderProps> = {
  as: 'div',
  classPrefix: 'slider',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: [0, 0],
  tooltip: true,
  progress: true
};

const RangeSlider = React.forwardRef((props: RangeSliderProps, ref) => {
  const {
    as: Component,
    barClassName,
    className,
    defaultValue,
    graduated,
    progress,
    vertical,
    disabled,
    classPrefix,
    min,
    max: maxProp,
    step,
    value: valueProp,
    handleClassName,
    handleStyle,
    handleTitle,
    tooltip,
    renderTooltip,
    renderMark,
    onChange,
    ...rest
  } = props;

  const barRef = useRef<HTMLDivElement>();

  // Define the parameter position of the handle
  const handleIndexs = useRef([0, 1]);
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const { rtl } = useCustom('RangeSlider');
  const classes = merge(
    className,
    withClassPrefix({ vertical, disabled, graduated, 'with-mark': renderMark })
  );

  const max = useMemo(() => precisionMath(Math.floor((maxProp - min) / step) * step + min), [
    maxProp,
    min,
    step
  ]);

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  const getValidValue = useCallback(
    (value: ValueType): ValueType => {
      if (typeof value === 'undefined') {
        return;
      }

      return [checkValue(value[0], min, max), checkValue(value[1], min, max)];
    },
    [max, min]
  );

  const [value, setValue] = useControlled<ValueType>(
    getValidValue(valueProp),
    getValidValue(defaultValue)
  );

  // The count of values ​​that can be entered.
  const count = useMemo(() => precisionMath((max - min) / step), [max, min, step]);

  // Get the height of the progress bar
  const getBarHeight = useCallback(() => (barRef.current ? getHeight(barRef.current) : 0), []);
  // Get the width of the progress bar
  const getBarWidth = useCallback(() => (barRef.current ? getWidth(barRef.current) : 0), []);

  const getValueByOffset = useCallback(
    (offset: number) => {
      let val = 0;

      if (isNaN(offset)) {
        return val;
      }

      if (vertical) {
        const barHeight = getBarHeight();
        val = Math.round(offset / (barHeight / count)) * step;
      } else {
        const barWidth = getBarWidth();
        val = Math.round(offset / (barWidth / count)) * step;
      }

      return precisionMath(val);
    },
    [count, getBarHeight, getBarWidth, step, vertical]
  );

  const getValueByPosition = useCallback(
    (event: React.MouseEvent) => {
      const barOffset = getOffset(barRef.current);
      const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
      const val = rtl && !vertical ? barOffset.width - offset : offset;

      return getValueByOffset(val) + min;
    },
    [getValueByOffset, min, rtl, vertical]
  );

  const getRangeValue = useCallback(
    (value: ValueType, key: string, event: React.MouseEvent) => {
      // Get the corresponding value according to the cursor position
      const v = getValueByPosition(event);

      // Judge the handle key and put the corresponding value at the start or end.
      if (key === 'start') {
        return [v, value[1]];
      } else if (key === 'end') {
        return [value[0], v];
      }
      return value;
    },
    [getValueByPosition]
  );

  const handleDragMove = useEventCallback((event: React.MouseEvent, dataset: DOMStringMap) => {
    const { key: eventKey, range } = dataset;
    const value = range.split(',').map(i => +i);
    const nextValue = getValidValue(getRangeValue(value, eventKey, event));
    if (nextValue[0] >= nextValue[1]) {
      /**
       * When the value of `start` is greater than the value of` end`,
       * the position of the handle is reversed.
       */
      handleIndexs.current.reverse();

      if (eventKey === 'start') {
        nextValue[0] = value[1];
      } else {
        nextValue[1] = value[0];
      }
    }

    setValue(nextValue);
    onChange?.(nextValue, event);
  });

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    let [start, end] = value;
    const v = getValueByPosition(event);

    /**
     * Judging that the current click value is closer to the values ​​of `start` and` end`.
     */
    if (Math.abs(start - v) < Math.abs(end - v)) {
      start = v;
    } else {
      end = v;
    }

    const nextValue = getValidValue([start, end]);

    setValue(nextValue);
    onChange?.(nextValue, event);
  };

  const handleProps = useMemo(
    () => [
      {
        value: value[0],
        eventKey: 'start',
        position: ((value[0] - min) / (max - min)) * 100
      },
      {
        value: value[1],
        eventKey: 'end',
        position: ((value[1] - min) / (max - min)) * 100
      }
    ],
    [max, min, value]
  );

  const handleCommonProps = {
    rtl,
    disabled,
    vertical,
    tooltip,
    className: handleClassName,
    style: handleStyle,
    renderTooltip,
    onDragMove: handleDragMove,
    'data-range': value,
    'aria-valuemax': max,
    'aria-valuemin': min
  };

  return (
    <Component {...rest} ref={ref} className={classes}>
      <div className={merge(barClassName, prefix('bar'))} ref={barRef} onClick={handleClick}>
        {progress && (
          <ProgressBar
            rtl={rtl}
            vertical={vertical}
            start={((value[0] - min) / (max - min)) * 100}
            end={((value[1] - min) / (max - min)) * 100}
          />
        )}
        {graduated && (
          <Graduated
            step={step}
            min={min}
            max={max}
            count={count}
            value={value}
            renderMark={renderMark}
          />
        )}
      </div>
      <Handle {...handleCommonProps} {...handleProps[handleIndexs.current[0]]}>
        {handleTitle}
      </Handle>

      <Handle {...handleCommonProps} {...handleProps[handleIndexs.current[1]]}>
        {handleTitle}
      </Handle>
    </Component>
  );
});

RangeSlider.displayName = 'RangeSlider';
RangeSlider.defaultProps = defaultProps;
RangeSlider.propTypes = {
  ...sliderPropTypes,
  value: PropTypes.arrayOf(PropTypes.number),
  defaultValue: PropTypes.arrayOf(PropTypes.number)
};

export default RangeSlider;
