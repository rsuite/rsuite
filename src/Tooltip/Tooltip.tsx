import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { prefix, defaultProps } from '../utils';
import { TooltipProps } from './Tooltip.d';
import { overlayProps } from '../Whisper/Whisper';

class Tooltip extends React.Component<TooltipProps> {
  static propTypes = {
    positionLeft: PropTypes.number,
    positionTop: PropTypes.number,
    visible: PropTypes.bool,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
  };
  render() {
    const {
      className,
      positionLeft,
      positionTop,
      classPrefix,
      children,
      style,
      visible,
      ...rest
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
      <div {..._.omit(rest, overlayProps)} role="tooltip" className={classes} style={styles}>
        <div className={addPrefix('arrow')} />
        <div className={addPrefix('inner')}>{children}</div>
      </div>
    );
  }
}

export default defaultProps<TooltipProps>({
  classPrefix: 'tooltip'
})(Tooltip);
