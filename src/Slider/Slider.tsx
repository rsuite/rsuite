import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { getWidth, getHeight, getOffset } from 'dom-lib';
import ProgressBar from './ProgressBar';
import Handle from './Handle';
import Graduated from './Graduated';
import { useClassNames, useControlled, useCustom } from '../utils';
import { precisionMath, checkValue } from './utils';
import { WithAsProps } from '../@types/common';

export interface LocaleType {
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  loading?: string;
}

export interface SliderProps<T = number> extends WithAsProps {
  /** Minimum value of sliding range */
  min?: number;

  /** Maximum sliding range */
  max?: number;

  /** Slide the value of one step */
  step?: number;

  /** Value (Controlled) */
  value?: T;

  /** Default value */
  defaultValue?: T;

  /** A css class to apply to the Handle node. */
  handleClassName?: string;

  /** Customizing what is displayed inside a handle */
  handleTitle?: React.ReactNode;

  /** 	A css class to apply to the Bar DOM node */
  barClassName?: string;

  /** custom style */
  handleStyle?: React.CSSProperties;

  /** The disabled of component */
  disabled?: boolean;

  /** Show Ticks */
  graduated?: boolean;

  /** Whether to show Tooltip when sliding */
  tooltip?: boolean;

  /** Show sliding progress bar */
  progress?: boolean;

  /** Vertical Slide */
  vertical?: boolean;

  /** Callback function that changes data */
  onChange?: (value: T, event: React.MouseEvent) => void;

  /** Customize labels on the render ruler */
  renderMark?: (mark: number) => React.ReactNode;

  /** Customize the content of the rendered Tooltip. */
  renderTooltip?: (value: number) => React.ReactNode;
}

const defaultProps: Partial<SliderProps> = {
  as: 'div',
  classPrefix: 'slider',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 0,
  tooltip: true
};

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
  renderTooltip: PropTypes.func
};

const Slider = React.forwardRef((props: SliderProps, ref) => {
  const {
    as: Componnet,
    graduated,
    className,
    barClassName,
    progress,
    vertical,
    disabled,
    classPrefix,
    min,
    handleClassName,
    handleStyle,
    handleTitle,
    tooltip,
    step,
    defaultValue,
    value: valueProp,
    max: maxProp,
    renderTooltip,
    renderMark,
    onChange,
    ...rest
  } = props;

  const barRef = useRef<HTMLDivElement>();
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const { rtl } = useCustom('Slider');

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
    (value: number) => {
      return checkValue(value, min, max);
    },
    [max, min]
  );

  const [value, setValue] = useControlled(getValidValue(valueProp), getValidValue(defaultValue));
  const count = useMemo(() => precisionMath((max - min) / step), [max, min, step]);

  // Get the height of the progress bar
  const getBarHeight = useCallback(() => (barRef.current ? getHeight(barRef.current) : 0), []);
  // Get the width of the progress bar
  const getBarWidth = useCallback(() => (barRef.current ? getWidth(barRef.current) : 0), []);

  const getValueByOffset = useCallback(
    (offset: number) => {
      let value = 0;

      if (isNaN(offset)) {
        return value;
      }

      if (vertical) {
        const barHeight = getBarHeight();
        value = Math.round(offset / (barHeight / count)) * step;
      } else {
        const barWidth = getBarWidth();
        value = Math.round(offset / (barWidth / count)) * step;
      }

      return precisionMath(value);
    },
    [count, getBarHeight, getBarWidth, step, vertical]
  );

  /**
   * A value within the valid range is calculated from the position triggered by the event.
   */
  const getValueByPosition = useCallback(
    (event: React.MouseEvent) => {
      const barOffset = getOffset(barRef.current);
      const offset = vertical ? event.pageY - barOffset.top : event.pageX - barOffset.left;
      const offsetValue = rtl && !vertical ? barOffset.width - offset : offset;

      return getValueByOffset(offsetValue) + min;
    },
    [getValueByOffset, min, rtl, vertical]
  );

  const handleChangeValue = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      const nextValue = getValidValue(getValueByPosition(event));
      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [disabled, getValidValue, getValueByPosition, onChange, setValue]
  );

  return (
    <Componnet {...rest} ref={ref} className={classes} role="presentation">
      <div ref={barRef} className={merge(barClassName, prefix('bar'))} onClick={handleChangeValue}>
        {progress && (
          <ProgressBar
            rtl={rtl}
            vertical={vertical}
            start={0}
            end={((value - min) / (max - min)) * 100}
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
      {
        <Handle
          position={((value - min) / (max - min)) * 100}
          className={handleClassName}
          style={handleStyle}
          disabled={disabled}
          vertical={vertical}
          tooltip={tooltip}
          rtl={rtl}
          value={value}
          renderTooltip={renderTooltip}
          onDragMove={handleChangeValue}
          aria-valuemax={max}
          aria-valuemin={min}
        >
          {handleTitle}
        </Handle>
      }
    </Componnet>
  );
});

Slider.displayName = 'Slider';
Slider.defaultProps = defaultProps;
Slider.propTypes = sliderPropTypes;

export default Slider;
