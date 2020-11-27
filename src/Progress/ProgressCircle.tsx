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

const defaultProps: Partial<ProgressCircleProps> = {
  as: 'div',
  classPrefix: 'progress',
  percent: 0,
  strokeWidth: 6,
  trailWidth: 6,
  gapDegree: 0,
  showInfo: true,
  strokeLinecap: 'round',
  gapPosition: 'top'
};

const ProgressCircle: RsRefForwardingComponent<'div', ProgressCircleProps> = React.forwardRef(
  (props: ProgressCircleProps, ref) => {
    const {
      as: Component,
      strokeWidth,
      trailWidth,
      percent,
      strokeLinecap,
      className,
      showInfo,
      status,
      classPrefix,
      style,
      gapDegree,
      gapPosition,
      trailColor,
      strokeColor,
      ...rest
    } = props;

    const getPathStyles = useCallback(() => {
      const radius = 50 - strokeWidth / 2;

      let beginPositionX = 0;
      let beginPositionY = -radius;
      let endPositionX = 0;
      let endPositionY = -2 * radius;

      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = 2 * radius;
          endPositionY = 0;
          break;
        case 'right':
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = -2 * radius;
          endPositionY = 0;
          break;
        case 'bottom':
          beginPositionY = radius;
          endPositionY = 2 * radius;
          break;
        default:
      }

      const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;

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
ProgressCircle.defaultProps = defaultProps;
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
