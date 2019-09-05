import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps, getUnhandledProps } from '../utils';
import { ProgressLineProps } from './ProgressLine.d';

class ProgressLine extends React.Component<ProgressLineProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    percent: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    showInfo: PropTypes.bool,
    status: PropTypes.oneOf(['success', 'fail', 'active'])
  };
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
    const strokeWidthStyle = { height: strokeWidth };
    const percentStyle = {
      width: `${percent}%`,
      backgroundColor: strokeColor,
      ...strokeWidthStyle
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
          <div className={addPrefix('line-inner')} style={strokeWidthStyle}>
            <div className={addPrefix('line-bg')} style={percentStyle} />
          </div>
        </div>
        {showInfo ? <div className={addPrefix('info')}>{info}</div> : null}
      </div>
    );
  }
}

export default defaultProps<ProgressLineProps>({
  classPrefix: 'progress'
})(ProgressLine);
