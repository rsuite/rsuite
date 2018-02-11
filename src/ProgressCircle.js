// @flow

import * as React from 'react';
import classNames from 'classnames';

import prefix, { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  strokeColor?: string,
  strokeLinecap: 'butt' | 'round' | 'square',
  trailColor?: string,
  percent: number,
  strokeWidth: number,
  trailWidth: number,
  gapDegree: number,
  gapPosition: 'top' | 'bottom' | 'left' | 'right',
  infoShow?: boolean,
  status?: 'success' | 'fail' | 'error',
  classPrefix?: string
};

class ProgressCircle extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}progress`,
    percent: 0,
    strokeLinecap: 'round',
    strokeWidth: 1,
    trailWidth: 1,
    gapDegree: 0,
    gapPosition: 'top',
  };

  getPathStyles() {

    const {
      percent,
      strokeWidth,
      gapDegree,
      gapPosition,
      trailColor,
      strokeColor
    } = this.props;

    const radius = 50 - (strokeWidth / 2);

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
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
    };

    const strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s', // eslint-disable-line
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
      strokeColor,
      percent,
      trailColor,
      strokeLinecap,
      className,
      infoShow,
      status,
      gapDegree,
      gapPosition,
      classPrefix,
      ...rest
    } = this.props;

    const {
      pathString,
      trailPathStyle,
      strokePathStyle
    } = this.getPathStyles();


    const addPrefix = prefix(classPrefix);

    const classes = classNames(
      classPrefix,
      addPrefix('circle'),
      className
    );

    return (
      <div className={classes}>
        <span className={addPrefix('circle-info')}>
          {status ? <span className={addPrefix(`icon-${status}`)} /> : null}
          {infoShow ? <span key={1}>{percent}%</span> : null}
        </span>
        <svg
          className={addPrefix('svg')}
          viewBox="0 0 100 100"
          {...rest}
        >
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

export default ProgressCircle;
