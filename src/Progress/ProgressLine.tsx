import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames, PROGRESS_STATUS_ICON } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

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

const defaultProps: Partial<ProgressLineProps> = {
  as: 'div',
  classPrefix: 'progress',
  showInfo: true,
  percent: 0
};

const ProgressLine: RsRefForwardingComponent<'div', ProgressLineProps> = React.forwardRef(
  (props: ProgressLineProps, ref) => {
    const {
      as: Component,
      className,
      percent,
      strokeColor,
      strokeWidth,
      trailColor,
      trailWidth,
      status,
      showInfo,
      classPrefix,
      vertical,
      ...rest
    } = props;

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
  }
);

ProgressLine.displayName = 'ProgressLine';
ProgressLine.defaultProps = defaultProps;
ProgressLine.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  percent: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  trailColor: PropTypes.string,
  trailWidth: PropTypes.number,
  showInfo: PropTypes.bool,
  vertical: PropTypes.bool,
  status: PropTypes.oneOf(['success', 'fail', 'active'])
};

export default ProgressLine;
