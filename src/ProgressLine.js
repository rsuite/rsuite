// @flow
import * as React from 'react';
import classNames from 'classnames';

import { prefix, defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  percent: number,
  strokeColor?: string,
  strokeWidth?: number,
  trailColor?: string,
  trailWidth?: number,
  showInfo?: boolean,
  status?: 'success' | 'fail' | 'active'
};

class ProgressLine extends React.Component<Props> {
  static defaultProps = {
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
      {
        [addPrefix(`line-${status || ''}`)]: !!status
      },
      className
    );

    const showIcon = status && status !== 'active';
    const info = showIcon ? (
      <span className={addPrefix(`icon-${status || ''}`)} />
    ) : (
      <span className={addPrefix('info-status')}>{percent}%</span>
    );

    return (
      <div className={classes} {...rest}>
        <div className={addPrefix('line-outer')}>
          <div className={addPrefix('line-inner')}>
            <div className={addPrefix('line-bg')} style={percentStyle} />
          </div>
        </div>
        {showInfo ? <div className={addPrefix('info')}>{info}</div> : null}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'progress'
})(ProgressLine);
