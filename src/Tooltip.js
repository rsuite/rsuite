// @flow

import * as React from 'react';
import classNames from 'classnames';

import { prefix, defaultProps } from './utils';

type PlacementFourSides = 'top' | 'right' | 'bottom' | 'left';
type PlacementEightPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom';

type Props = {
  placement?: PlacementFourSides | PlacementEightPoints,
  positionLeft?: number,
  positionTop?: number,
  classPrefix?: string,
  className?: string,
  arrowOffsetLeft?: number | string,
  arrowOffsetTop?: number | string,
  style?: Object,
  children?: React.Node,
  onMouseLeave?: (event: SyntheticEvent<*>) => void,
  onMouseEnter?: (event: SyntheticEvent<*>) => void
};

class Tooltip extends React.Component<Props> {
  static defaultProps = {
    placement: 'right'
  };

  render() {
    let {
      placement,
      className,
      positionLeft,
      arrowOffsetLeft,
      arrowOffsetTop,
      positionTop,
      classPrefix,
      children,
      style,
      onMouseLeave,
      onMouseEnter
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(placement), className);

    const styles = {
      left: positionLeft,
      top: positionTop,
      ...style
    };

    const arrowStyle = {
      left: arrowOffsetLeft,
      top: arrowOffsetTop
    };

    return (
      <div
        role="tooltip"
        className={classes}
        style={styles}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        <div className={addPrefix('arrow')} style={arrowStyle} />
        <div className={addPrefix('inner')}>{children}</div>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'tooltip'
})(Tooltip);
