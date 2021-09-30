import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, PROGRESS_STATUS_ICON } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface ProgressCircleProps extends WithAsProps {
  /** Line color */
  strokeColor?: string;

  /** The end of different types of open paths */
  strokeLinecap?: 'butt' | 'round' | 'square';

  /** Tail color */
  trailColor?: string;

  /** Percent of progress */
  percent?: number;

  /** Line width */
  strokeWidth?: number;

  /** Tail width */
  trailWidth?: number;

  /** Circular progress bar degree */
  gapDegree?: number;

  /** Circular progress bar Notch position */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';

  /** Show text */
  showInfo?: boolean;

  /** Progress status */
  status?: 'success' | 'fail' | 'active';
}

const ProgressCircle: RsRefForwardingComponent<'div', ProgressCircleProps> = React.forwardRef(
  (props: ProgressCircleProps, ref) => {
    const {
      as: Component = 'div',
      strokeWidth = 6,
      trailWidth = 6,
      percent = 0,
      strokeLinecap = 'round',
      className,
      showInfo = true,
      status,
      classPrefix = 'progress',
      style,
      gapDegree = 0,
      gapPosition = 'top',
      trailColor,
      strokeColor,
      ...rest
    } = props;

    const getPathStyles = useCallback(() => {
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

    const { pathString, trailPathStyle, strokePathStyle } = getPathStyles();

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix('circle', { [`circle-${status || ''}`]: !!status })
    );

    const showIcon = status && status !== 'active';
    const info = showIcon ? (
      <span className={prefix(`icon-${status || ''}`)}>{PROGRESS_STATUS_ICON[status]}</span>
    ) : (
      <span key={1}>{percent}%</span>
    );

    return (
      <Component
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percent}
        ref={ref}
        className={classes}
        style={style}
      >
        {showInfo ? <span className={prefix('circle-info')}>{info}</span> : null}

        <svg className={prefix('svg')} viewBox="0 0 100 100" {...rest}>
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
      </Component>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';
ProgressCircle.propTypes = {
  className: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
  trailColor: PropTypes.string,
  percent: PropTypes.number,
  strokeWidth: PropTypes.number,
  trailWidth: PropTypes.number,
  gapDegree: PropTypes.number,
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  showInfo: PropTypes.bool,
  status: PropTypes.oneOf(['success', 'fail', 'active']),
  classPrefix: PropTypes.string
};

export default ProgressCircle;
