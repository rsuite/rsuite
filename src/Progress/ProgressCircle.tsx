import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { prefix, defaultProps, getUnhandledProps } from '../utils';
import { ProgressCircleProps } from './ProgressCircle.d';

class ProgressCircle extends React.Component<ProgressCircleProps> {
  static propTypes = {
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

  static defaultProps = {
    percent: 0,
    strokeWidth: 6,
    trailWidth: 6,
    gapDegree: 0,
    showInfo: true,
    strokeLinecap: 'round',
    gapPosition: 'top'
  };

  getPathStyles() {
    const { percent, strokeWidth, gapDegree, gapPosition, trailColor, strokeColor } = this.props;

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
  }

  render() {
    const {
      strokeWidth,
      trailWidth,
      percent,
      strokeLinecap,
      className,
      showInfo,
      status,
      classPrefix,
      style,
      ...rest
    } = this.props;

    const { pathString, trailPathStyle, strokePathStyle } = this.getPathStyles();

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(ProgressCircle, rest);
    const classes = classNames(classPrefix, addPrefix('circle'), className, {
      [addPrefix(`circle-${status || ''}`)]: !!status
    });

    const showIcon = status && status !== 'active';
    const info = showIcon ? (
      <span className={addPrefix(`icon-${status || ''}`)} />
    ) : (
      <span key={1}>{percent}%</span>
    );

    return (
      <div className={classes} style={style}>
        {showInfo ? <span className={addPrefix('circle-info')}>{info}</span> : null}

        <svg className={addPrefix('svg')} viewBox="0 0 100 100" {...unhandled}>
          <path
            className={addPrefix('trail')}
            d={pathString}
            strokeWidth={trailWidth || strokeWidth}
            fillOpacity="0"
            style={trailPathStyle}
          />
          <path
            d={pathString}
            strokeLinecap={strokeLinecap}
            className={addPrefix('stroke')}
            strokeWidth={this.props.percent === 0 ? 0 : strokeWidth}
            fillOpacity="0"
            style={strokePathStyle}
          />
        </svg>
      </div>
    );
  }
}

export default defaultProps<ProgressCircleProps>({
  classPrefix: 'progress'
})(ProgressCircle);
