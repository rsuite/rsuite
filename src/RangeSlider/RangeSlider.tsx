import React, { useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import getWidth from 'dom-lib/getWidth';
import getHeight from 'dom-lib/getHeight';
import getOffset from 'dom-lib/getOffset';
import { useClassNames, useCustom, useControlled, useEventCallback } from '../utils';
import { sliderPropTypes } from '../Slider/Slider';
import ProgressBar from '../Slider/ProgressBar';
import Handle, { HandleProps } from '../Slider/Handle';
import Graduated from '../Slider/Graduated';
import { precisionMath, checkValue } from '../Slider/utils';
import { SliderProps } from '../Slider';
import { tupleType } from '../utils/propTypeChecker';

export type Range = [number, number];
export type RangeSliderProps = SliderProps<Range>;

type HandleKey = 'start' | 'end';

interface HandleDataset extends DOMStringMap {
  key: HandleKey;
  range: string;
}

const defaultDefaultValue: Range = [0, 0];

const RangeSlider = React.forwardRef((props: RangeSliderProps, ref) => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    as: Component = 'div',
    barClassName,
    className,
    defaultValue = defaultDefaultValue,
    graduated,
    progress = true,
    vertical,
    disabled,
    classPrefix = 'slider',
    min = 0,
    max: maxProp = 100,
    step = 1,
    value: valueProp,
    handleClassName,
    handleStyle,
    handleTitle,
    tooltip = true,
    getAriaValueText,
    renderTooltip,
    renderMark,
    onChange,
    onChangeCommitted,
    ...rest
  } = props;

  const barRef = useRef<HTMLDivElement>(null);

  // Define the parameter position of the handle
  const handleIndexs = useRef([0, 1]);
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const { rtl } = useCustom('RangeSlider');
  const classes = merge(
    className,
    withClassPrefix({ vertical, disabled, graduated, 'with-mark': renderMark })
  );

  const max = useMemo(
    () => precisionMath(Math.floor((maxProp - min) / step) * step + min),
    [maxProp, min, step]
  );

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  const getValidValue = useCallback<
    <T extends Range | undefined>(value: T) => T extends undefined ? undefined : Range
  >(
    (value): any => {
      if (typeof value === 'undefined') {
        return;
      }

      return [checkValue(value[0], min, max), checkValue(value[1], min, max)];
    },
    [max, min]
  );

  const [value, setValue] = useControlled(getValidValue(valueProp), getValidValue(defaultValue));

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
      const barOffset = getOffset(barRef.current!)!;
      const offset = vertical
        ? barOffset.top + barOffset.height - event.pageY
        : event.pageX - barOffset.left;
      const val = rtl && !vertical ? barOffset.width - offset : offset;

      return getValueByOffset(val) + min;
    },
    [getValueByOffset, min, rtl, vertical]
  );

  const getRangeValue = useCallback(
    (value: Range, key: string, event: React.MouseEvent): Range => {
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

  const getNextValue = useCallback(
    (event: React.MouseEvent, dataset: HandleDataset) => {
      const { key: eventKey, range } = dataset;
      const value = range.split(',').map(i => +i) as Range;
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

      return nextValue;
    },
    [getRangeValue, getValidValue]
  );

  /**
   * Callback function that is fired when the mousemove is triggered
   */
  const handleDragMove = useEventCallback((event: React.MouseEvent, dataset: HandleDataset) => {
    const nextValue = getNextValue(event, dataset);
    setValue(nextValue);
    onChange?.(nextValue, event);
  });

  /**
   * Callback function that is fired when the mouseup is triggered
   */
  const handleChangeCommitted = useCallback(
    (event: React.MouseEvent, dataset?: DOMStringMap) => {
      const nextValue = getNextValue(event, dataset! as HandleDataset);
      setValue(nextValue);
      onChangeCommitted?.(nextValue, event);
    },
    [getNextValue, onChangeCommitted, setValue]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = event.target?.['dataset'];
      const nextValue: Range = [...value];
      const increaseKey = rtl ? 'ArrowLeft' : 'ArrowRight';
      const decreaseKey = rtl ? 'ArrowRight' : 'ArrowLeft';
      const valueIndex = key === 'start' ? 0 : 1;

      switch (event.key) {
        case 'Home':
          nextValue[valueIndex] = min;

          break;
        case 'End':
          nextValue[valueIndex] = max;
          break;
        case increaseKey:
        case 'ArrowUp':
          nextValue[valueIndex] = Math.min(max, value[valueIndex] + step);
          break;

        case decreaseKey:
        case 'ArrowDown':
          nextValue[valueIndex] = Math.max(min, value[valueIndex] - step);
          break;
        default:
          return;
      }

      // When the start value is greater than the end value, let the handle and value switch positions.
      if (nextValue[0] >= nextValue[1]) {
        nextValue.reverse();
        handleIndexs.current.reverse();
      }

      // Prevent scroll of the page
      event.preventDefault();

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [max, min, onChange, rtl, setValue, step, value]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }

      let [start, end] = value;
      const v = getValueByPosition(event);

      //  Judging that the current click value is closer to the values ​​of `start` and` end`.
      if (Math.abs(start - v) < Math.abs(end - v)) {
        start = v;
      } else {
        end = v;
      }

      const nextValue = getValidValue([start, end].sort() as Range);

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [disabled, getValidValue, getValueByPosition, onChange, setValue, value]
  );

  const handleProps = useMemo(
    () => [
      {
        value: value[0],
        'data-key': 'start',
        'aria-valuenow': value[0],
        'aria-valuetext': getAriaValueText ? getAriaValueText(value[0], 'start') : ariaValuetext,
        position: ((value[0] - min) / (max - min)) * 100
      },
      {
        value: value[1],
        'data-key': 'end',
        'aria-valuenow': value[1],
        'aria-valuetext': getAriaValueText ? getAriaValueText(value[1], 'end') : ariaValuetext,
        position: ((value[1] - min) / (max - min)) * 100
      }
    ],
    [ariaValuetext, getAriaValueText, max, min, value]
  );

  const handleCommonProps: HandleProps = {
    rtl,
    disabled,
    vertical,
    tooltip,
    className: handleClassName,
    style: handleStyle,
    renderTooltip,
    onDragMove: handleDragMove,
    onDragEnd: handleChangeCommitted,
    onKeyDown: handleKeyDown,
    tabIndex: disabled ? undefined : 0,
    'aria-orientation': vertical ? 'vertical' : 'horizontal',
    'aria-disabled': disabled,
    'aria-valuemax': max,
    'aria-valuemin': min,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby
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
      <Handle data-range={value} {...handleCommonProps} {...handleProps[handleIndexs.current[0]]}>
        {handleTitle}
      </Handle>

      <Handle data-range={value} {...handleCommonProps} {...handleProps[handleIndexs.current[1]]}>
        {handleTitle}
      </Handle>
    </Component>
  );
});

RangeSlider.displayName = 'RangeSlider';
RangeSlider.propTypes = {
  ...sliderPropTypes,
  value: tupleType(PropTypes.number.isRequired, PropTypes.number.isRequired),
  defaultValue: tupleType(PropTypes.number.isRequired, PropTypes.number.isRequired)
};

export default RangeSlider;
