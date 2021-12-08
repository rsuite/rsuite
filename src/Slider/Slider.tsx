import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import getWidth from 'dom-lib/getWidth';
import getHeight from 'dom-lib/getHeight';
import getOffset from 'dom-lib/getOffset';
import ProgressBar from './ProgressBar';
import Handle from './Handle';
import Graduated from './Graduated';
import { useClassNames, useControlled, useCustom } from '../utils';
import { precisionMath, checkValue } from './utils';
import { WithAsProps, FormControlBaseProps } from '../@types/common';
import Plaintext from '../Plaintext';

export interface LocaleType {
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  loading?: string;
}

export interface SliderProps<T = number> extends WithAsProps, FormControlBaseProps<T> {
  /**
   * The label of the slider.
   */
  'aria-label'?: string;
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby'?: string;
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext'?: string;

  /** Minimum value of sliding range */
  min?: number;

  /** Maximum sliding range */
  max?: number;

  /** Slide the value of one step */
  step?: number;

  /** A css class to apply to the Handle node. */
  handleClassName?: string;

  /** Customizing what is displayed inside a handle */
  handleTitle?: React.ReactNode;

  /** 	A css class to apply to the Bar DOM node */
  barClassName?: string;

  /** custom style */
  handleStyle?: React.CSSProperties;

  /** Show Ticks */
  graduated?: boolean;

  /** Whether to show Tooltip when sliding */
  tooltip?: boolean;

  /** Show sliding progress bar */
  progress?: boolean;

  /** Vertical Slide */
  vertical?: boolean;

  /** Customize labels on the render ruler */
  renderMark?: (mark: number) => React.ReactNode;

  /** Customize the content of the rendered Tooltip. */
  renderTooltip?: (value: number | undefined) => React.ReactNode;

  /** Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider. */
  getAriaValueText?: (value: number, eventKey?: 'start' | 'end') => string;

  /** Callback function that is fired when the mouseup is triggered. */
  onChangeCommitted?: (value: T, event: React.MouseEvent) => void;
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
  plaintext: PropTypes.bool,
  readOnly: PropTypes.bool,
  graduated: PropTypes.bool,
  tooltip: PropTypes.bool,
  progress: PropTypes.bool,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeCommitted: PropTypes.func,
  renderMark: PropTypes.func,
  renderTooltip: PropTypes.func,
  getAriaValueText: PropTypes.func
};

const Slider = React.forwardRef((props: SliderProps, ref) => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    as: Componnet = 'div',
    graduated,
    className,
    barClassName,
    progress,
    vertical,
    disabled,
    readOnly,
    plaintext,
    classPrefix = 'slider',
    min = 0,
    handleClassName,
    handleStyle,
    handleTitle,
    tooltip = true,
    step = 1,
    defaultValue = 0,
    value: valueProp,
    max: maxProp = 100,
    getAriaValueText,
    renderTooltip,
    renderMark,
    onChange,
    onChangeCommitted,
    ...rest
  } = props;

  const barRef = useRef<HTMLDivElement>(null);
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const { rtl } = useCustom('Slider');

  const classes = merge(
    className,
    withClassPrefix({ vertical, disabled, readOnly, graduated, 'with-mark': renderMark })
  );

  const max = useMemo(
    () => precisionMath(Math.floor((maxProp - min) / step) * step + min),
    [maxProp, min, step]
  );

  /**
   * Returns a valid value that does not exceed the specified range of values.
   */
  const getValidValue = useCallback(
    (value: number | undefined) => {
      return checkValue(value, min, max);
    },
    [max, min]
  );

  const [value, setValue] = useControlled(getValidValue(valueProp), getValidValue(defaultValue)!);
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
      const barOffset = getOffset(barRef.current!)!;
      const offset = vertical
        ? barOffset.top + barOffset.height - event.pageY
        : event.pageX - barOffset.left;
      const offsetValue = rtl && !vertical ? barOffset.width - offset : offset;

      return getValueByOffset(offsetValue) + min;
    },
    [getValueByOffset, min, rtl, vertical]
  );

  /**
   * Callback function that is fired when the mousemove is triggered
   */
  const handleChangeValue = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || readOnly) {
        return;
      }
      const nextValue: number = getValidValue(getValueByPosition(event))!;
      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [disabled, getValidValue, getValueByPosition, onChange, readOnly, setValue]
  );

  /**
   * Callback function that is fired when the mouseup is triggered
   */
  const handleChangeCommitted = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || readOnly) {
        return;
      }
      const nextValue: number = getValidValue(getValueByPosition(event))!;

      onChangeCommitted?.(nextValue, event);
    },
    [disabled, getValidValue, getValueByPosition, onChangeCommitted, readOnly]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let nextValue;
      const increaseKey = rtl ? 'ArrowLeft' : 'ArrowRight';
      const decreaseKey = rtl ? 'ArrowRight' : 'ArrowLeft';

      switch (event.key) {
        case 'Home':
          nextValue = min;
          break;
        case 'End':
          nextValue = max;
          break;
        case increaseKey:
        case 'ArrowUp':
          nextValue = Math.min(max, value + step);
          break;

        case decreaseKey:
        case 'ArrowDown':
          nextValue = Math.max(min, value - step);
          break;
        default:
          return;
      }

      // Prevent scroll of the page
      event.preventDefault();

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [max, min, onChange, rtl, setValue, step, value]
  );

  if (plaintext) {
    return (
      <Plaintext localeKey="notSelected" ref={ref}>
        {value}
      </Plaintext>
    );
  }

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
          onKeyDown={handleKeyDown}
          onDragEnd={handleChangeCommitted}
          tabIndex={disabled || readOnly ? undefined : 0}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          aria-valuenow={value}
          aria-disabled={disabled}
          aria-valuetext={getAriaValueText ? getAriaValueText(value) : ariaValuetext}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
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
Slider.propTypes = sliderPropTypes;

export default Slider;
