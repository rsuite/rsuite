import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import ProgressInfo from './ProgressInfo';
import ProgressStroke from './ProgressStroke';
import ProgressSections from './ProgressSections';
import { forwardRef, mergeStyles, getCssValue } from '@/internals/utils';
import { useStyles, useCustom } from '@/internals/hooks';
import type { ProgressSection } from './types';

export interface ProgressLineProps extends BoxProps {
  /** Whether to show indeterminate loading animation */
  indeterminate?: boolean;

  /** Percent of progress */
  percent?: number;

  /** The placement of the percent info */
  percentPlacement?: 'start' | 'end' | 'insideStart' | 'insideEnd' | 'insideCenter';

  /** Line color */
  strokeColor?: string;

  /** Line width */
  strokeWidth?: number;

  /** Show text */
  showInfo?: boolean;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';

  /** Whether to apply a striped effect to the progress bar */
  striped?: boolean;

  /** Multiple sections with different colors */
  sections?: ProgressSection[];

  /** Trail color */
  trailColor?: string;

  /** Trail width */
  trailWidth?: number;

  /**  The progress bar is displayed vertically */
  vertical?: boolean;

  /** The radius of the progress bar */
  radius?: number | string;

  /** Custom render function for info content */
  renderInfo?: (percent: number, status?: 'success' | 'fail' | 'active') => React.ReactNode;
}

/**
 * The `Progress.Line` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#line
 */
const ProgressLine = forwardRef<'div', ProgressLineProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('ProgressLine', props);
  const {
    as,
    className,
    classPrefix = 'progress-line',
    percent = 0,
    percentPlacement = 'end',
    radius,
    strokeColor,
    strokeWidth,
    status,
    striped,
    style,
    showInfo = true,
    trailColor,
    trailWidth,
    vertical,
    sections,
    renderInfo,
    indeterminate,
    ...rest
  } = propsWithDefaults;

  const { merge, prefix, withPrefix, cssVar } = useStyles(classPrefix);

  const classes = merge(className, withPrefix({ vertical, striped, indeterminate }));

  const totalPercent = sections
    ? sections.reduce((sum, section) => sum + section.percent, 0)
    : percent;

  const styles = mergeStyles(
    cssVar('trail-size', getCssValue(trailWidth || strokeWidth)),
    cssVar('trail-color', trailColor),
    cssVar('stroke', `${totalPercent}%`),
    cssVar('size', getCssValue(strokeWidth)),
    cssVar('color', strokeColor),
    cssVar('radius', getCssValue(radius)),
    style
  );

  const info = (
    <ProgressInfo
      percent={percent}
      renderInfo={renderInfo}
      status={status}
      classPrefix={classPrefix}
    />
  );

  // Determine if the info should be placed inside the stroke
  const isInsidePlacement = percentPlacement?.startsWith('inside');
  return (
    <Box
      as={as}
      ref={ref}
      className={classes}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={totalPercent}
      data-status={status}
      data-placement={percentPlacement}
      style={styles}
      {...rest}
    >
      <div className={prefix('outer')}>
        <div className={prefix('trail')}>
          {sections ? (
            <ProgressSections classPrefix={classPrefix} sections={sections} vertical={vertical} />
          ) : (
            <ProgressStroke
              classPrefix={classPrefix}
              percent={indeterminate ? 100 : percent}
              vertical={vertical}
            >
              {showInfo && isInsidePlacement ? info : null}
            </ProgressStroke>
          )}
        </div>
      </div>
      {showInfo && !isInsidePlacement ? info : null}
    </Box>
  );
});

ProgressLine.displayName = 'ProgressLine';

export default ProgressLine;
