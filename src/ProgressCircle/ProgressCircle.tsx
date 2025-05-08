import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import ProgressInfo from '../Progress/ProgressInfo';
import { ProgressSection } from '../Progress/ProgressLine';

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

  /** Custom render function for info content */
  renderInfo?: (percent: number, status?: 'success' | 'fail' | 'active') => React.ReactNode;

  /** Multiple sections with different colors */
  sections?: ProgressSection[];
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
    // Convert gapDegree from degrees to a proportion of the circumference
    const gapLength = (gapDegree / 360) * len;

    const trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: `${len - gapLength}px ${len}px`,
      strokeDashoffset: `-${gapLength / 2}px`
    };

    const strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(totalPercent / 100) * (len - gapLength)}px ${len}px`,
      strokeDashoffset: `-${gapLength / 2}px`
    };

    return {
      pathString,
      trailPathStyle,
      strokePathStyle
    };
  }, [gapDegree, gapPosition, totalPercent, strokeColor, strokeWidth, trailColor]);

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
          // Render multiple sections
          <>
            {(() => {
              let startPercent = 0;
              return sections.map((section, index) => {
                const sectionLen = Math.PI * 2 * (50 - strokeWidth / 2);
                const gapLength = (gapDegree / 360) * sectionLen;
                const sectionPercent = section.percent;
                const endPercent = startPercent + sectionPercent;

                // Calculate the stroke dash array and offset for this section
                const sectionStyle = {
                  stroke: section.color,
                  strokeDasharray: `${(sectionPercent / 100) * (sectionLen - gapLength)}px ${sectionLen}px`,
                  strokeDashoffset: `-${gapLength / 2 + (startPercent / 100) * (sectionLen - gapLength)}px`
                };

                const sectionPath = (
                  <path
                    key={index}
                    d={pathString}
                    strokeLinecap={strokeLinecap}
                    className={prefix('stroke')}
                    strokeWidth={totalPercent === 0 ? 0 : strokeWidth}
                    fillOpacity="0"
                    style={sectionStyle}
                  />
                );

                startPercent = endPercent;
                return sectionPath;
              });
            })()}
          </>
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
