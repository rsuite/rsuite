import React from 'react';
import { PROGRESS_STATUS_ICON } from '@/internals/constants/statusIcons';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';

export interface ProgressLineProps extends WithAsProps {
  /** Line color */
  strokeColor?: string;

  /** Percent of progress */
  percent?: number;

  /** Line width */
  strokeWidth?: number;

  /** Trail color */
  trailColor?: string;

  /** Trail width */
  trailWidth?: number;

  /** Show text */
  showInfo?: boolean;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';

  /**  The progress bar is displayed vertically */
  vertical?: boolean;
}

/**
 * The `Progress.Line` component is used to display the progress of current operation.
 * @see https://rsuitejs.com/components/progress/#line
 */
const ProgressLine = forwardRef<'div', ProgressLineProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('ProgressLine', props);
  const {
    as: Component = 'div',
    className,
    percent = 0,
    strokeColor,
    strokeWidth,
    trailColor,
    trailWidth,
    status,
    showInfo = true,
    classPrefix = 'progress',
    vertical,
    ...rest
  } = propsWithDefaults;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

  const lineInnerStyle = {
    backgroundColor: trailColor,
    [vertical ? 'width' : 'height']: trailWidth || strokeWidth
  };
  const percentStyle = {
    [vertical ? 'height' : 'width']: `${percent}%`,
    backgroundColor: strokeColor,
    [vertical ? 'width' : 'height']: strokeWidth
  };

  const classes = merge(
    className,
    withClassPrefix('line', {
      'line-vertical': vertical,
      [`line-${status}`]: !!status
    })
  );

  const showIcon = status && status !== 'active';
  const info = showIcon ? (
    <span className={prefix(`icon-${status || ''}`)}>{PROGRESS_STATUS_ICON[status]}</span>
  ) : (
    <span className={prefix('info-status')}>{percent}%</span>
  );

  return (
    <Component
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={percent}
      {...rest}
      ref={ref}
      className={classes}
    >
      <div className={prefix('line-outer')}>
        <div className={prefix('line-inner')} style={lineInnerStyle}>
          <div className={prefix('line-bg')} style={percentStyle} />
        </div>
      </div>
      {showInfo ? <div className={prefix('info')}>{info}</div> : null}
    </Component>
  );
});

ProgressLine.displayName = 'ProgressLine';

export default ProgressLine;
