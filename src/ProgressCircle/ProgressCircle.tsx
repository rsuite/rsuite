import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import ProgressInfo from '../Progress/ProgressInfo';

export interface ProgressCircleProps extends BoxProps {
  /** Circular progress bar degree */
  gapDegree?: number;

  /** Circular progress bar Notch position */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';

  /** Percent of progress */
  percent?: number;

  /** Custom render function for info content */
  renderInfo?: (percent: number, status?: 'success' | 'fail' | 'active') => React.ReactNode;

  /** Show text */
  showInfo?: boolean;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';

  /** Line color */
  strokeColor?: string;

  /** The end of different types of open paths */
  strokeLinecap?: 'butt' | 'round' | 'square';

  /** Line width */
  strokeWidth?: number;

  /** Tail color */
  trailColor?: string;

  /** Tail width */
  trailWidth?: number;
}

/**
 * Display circular progress for an operation.
 * @see https://rsuitejs.com/components/progress-circle
 */
const ProgressCircle = forwardRef<'div', ProgressCircleProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('ProgressCircle', props);
  const {
    as,
    classPrefix = 'progress-circle',
    className,
    gapDegree = 0,
    gapPosition = 'top',
    percent = 0,
    renderInfo,
    showInfo = true,
    status,
    strokeColor,
    strokeLinecap = 'round',
    strokeWidth = 6,
    style,
    trailColor,
    trailWidth = 6,
    ...rest
  } = propsWithDefaults;

  const { pathString, trailPathStyle, strokePathStyle } = useMemo(() => {
    const radius = 50 - strokeWidth / 2;

    let x1 = 0;
    let y1 = -radius;
    let x2 = 0;
    let y2 = -2 * radius;

    switch (gapPosition) {
      case 'left':
        x1 = -radius;
        y1 = 0;
        x2 = 2 * radius;
        y2 = 0;
        break;
      case 'right':
        x1 = radius;
        y1 = 0;
        x2 = -2 * radius;
        y2 = 0;
        break;
      case 'bottom':
        y1 = radius;
        y2 = 2 * radius;
        break;
      default:
    }

    const pathString = `M 50,50 m ${x1},${y1} a ${radius},${radius} 0 1 1 ${x2},${-y2} a ${radius},${radius} 0 1 1 ${-x2},${y2}`;

    const len = Math.PI * 2 * radius;
    const trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`
    };

    const strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`
    };

    return {
      pathString,
      trailPathStyle,
      strokePathStyle
    };
  }, [gapDegree, gapPosition, percent, strokeColor, strokeWidth, trailColor]);

  const { prefix, merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ [`${status || ''}`]: !!status }));

  return (
    <Box
      as={as}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={percent}
      ref={ref}
      className={classes}
      style={style}
      {...rest}
    >
      {showInfo && (
        <ProgressInfo
          percent={percent}
          renderInfo={renderInfo}
          status={status}
          classPrefix={classPrefix}
        />
      )}
      <svg className={prefix('svg')} viewBox="0 0 100 100">
        <path
          className={prefix('trail')}
          d={pathString}
          strokeWidth={trailWidth || strokeWidth}
          fillOpacity="0"
          style={trailPathStyle}
        />
        <path
          d={pathString}
          strokeLinecap={strokeLinecap}
          className={prefix('stroke')}
          strokeWidth={percent === 0 ? 0 : strokeWidth}
          fillOpacity="0"
          style={strokePathStyle}
        />
      </svg>
    </Box>
  );
});

ProgressCircle.displayName = 'ProgressCircle';

export default ProgressCircle;
