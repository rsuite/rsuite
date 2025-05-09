import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import ProgressInfo from '../Progress/ProgressInfo';
import ProgressCircleSections from './ProgressCircleSections';
import useProgressCirclePath from './hooks/useProgressCirclePath';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { ProgressSection } from '../Progress';

export interface ProgressCircleProps extends BoxProps {
  /** Circular progress bar degree */
  gapDegree?: number;

  /** Circular progress bar Notch position */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';

  /** Percent of progress */
  percent?: number;

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

  /** Multiple sections with different colors */
  sections?: Pick<ProgressSection, 'percent' | 'color'>[];

  /** Custom render function for info content */
  renderInfo?: (percent: number, status?: 'success' | 'fail' | 'active') => React.ReactNode;
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
    trailWidth = strokeWidth,
    sections,
    ...rest
  } = propsWithDefaults;

  // Calculate total percent from sections if provided
  const totalPercent = useMemo(() => {
    if (!sections) return percent;
    return Math.min(
      100,
      sections.reduce((acc, section) => acc + section.percent, 0)
    );
  }, [percent, sections]);

  const { pathString, trailPathStyle, strokePathStyle } = useProgressCirclePath({
    gapDegree,
    gapPosition,
    totalPercent,
    strokeColor,
    strokeWidth,
    trailColor
  });

  const { prefix, merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ [`${status || ''}`]: !!status }));

  return (
    <Box
      as={as}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={totalPercent}
      ref={ref}
      className={classes}
      style={style}
      {...rest}
    >
      {showInfo && (
        <ProgressInfo
          percent={totalPercent}
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
        {sections ? (
          <ProgressCircleSections
            classPrefix={classPrefix}
            sections={sections}
            pathString={pathString}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth}
            gapDegree={gapDegree}
            totalPercent={totalPercent}
          />
        ) : (
          // Render single stroke
          <path
            d={pathString}
            strokeLinecap={strokeLinecap}
            className={prefix('stroke')}
            strokeWidth={totalPercent === 0 ? 0 : strokeWidth}
            fillOpacity="0"
            style={strokePathStyle}
          />
        )}
      </svg>
    </Box>
  );
});

ProgressCircle.displayName = 'ProgressCircle';

export default ProgressCircle;
