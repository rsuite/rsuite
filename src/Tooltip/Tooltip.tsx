import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { prefix, defaultProps } from '../utils';
import { TooltipProps } from './Tooltip.d';

class Tooltip extends React.Component<TooltipProps> {
  static propTypes = {
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    visible: PropTypes.bool,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func
  };
  render() {
    let {
      className,
      positionLeft,
      positionTop,
      classPrefix,
      children,
      style,
      visible,
      onMouseLeave,
      onMouseEnter
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);
    const styles = {
      left: positionLeft,
      top: positionTop,
      opacity: visible ? 1 : undefined,
      ...style
    };

    return (
      <div
        role="tooltip"
        className={classes}
        style={styles}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <div className={addPrefix('arrow')} />
        <div className={addPrefix('inner')}>{children}</div>
      </div>
    );
  }
}

export default defaultProps<TooltipProps>({
  classPrefix: 'tooltip'
})(Tooltip);
