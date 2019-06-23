// @flow
import * as React from 'react';
import classNames from 'classnames';

import { prefix, defaultProps, getUnhandledProps } from './utils';

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
      status,
      showInfo,
      classPrefix,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(ProgressLine, rest);
    const percentStyle = {
      width: `${percent}%`,
      height: strokeWidth,
      backgroundColor: strokeColor
    };

    const classes = classNames(classPrefix, addPrefix('line'), className, {
      [addPrefix(`line-${status || ''}`)]: !!status
    });

    const showIcon = status && status !== 'active';
    const info = showIcon ? (
      <span className={addPrefix(`icon-${status || ''}`)} />
    ) : (
      <span className={addPrefix('info-status')}>{percent}%</span>
    );

    return (
      <div className={classes} {...unhandled}>
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
