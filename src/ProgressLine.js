// @flow
import * as React from 'react';
import classNames from 'classnames';

import prefix, { globalKey } from './utils/prefix';

type Props = {
  className?: string,
  classPrefix?: string,
  percent: number,
  strokeColor?: string,
  strokeWidth?: number,
  trailColor?: string,
  trailWidth?: number,
  showInfo?: boolean,
  status?: 'success' | 'fail' | 'error',
};

class ProgressLine extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}progress`,
    showInfo: true,
    percent: 0
  };

  render() {
    const {
      className,
      percent,
      strokeColor,
      strokeWidth,
      trailColor,
      trailWidth,
      status,
      showInfo,
      classPrefix,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const percentStyle = {
      width: `${percent}%`,
      height: strokeWidth,
      backgroundColor: strokeColor
    };

    const classes = classNames(
      classPrefix,
      addPrefix('line'),
      className
    );

    const info = status ? (<span className={addPrefix(`icon-${status}`)} />) : (
      <div className={addPrefix('info')}>
        <span className={addPrefix('info-status')}>{percent}%</span>
      </div>
    );

    return (
      <div
        className={classes}
        {...rest}
      >
        <div className={addPrefix('line-outer')}>
          <div className={addPrefix('line-inner')}>
            <div className={addPrefix('line-bg')} style={percentStyle} />
          </div>
        </div>
        {showInfo ? info : null}
      </div>
    );
  }
}

export default ProgressLine;
