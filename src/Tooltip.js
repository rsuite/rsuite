// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  placement?: 'top' | 'right' | 'bottom' | 'left',
  positionLeft?: number,
  positionTop?: number,
  classPrefix?: string,
  className?: string,
  arrowOffsetLeft?: number | string,
  arrowOffsetTop?: number | string,
  style?: Object,
  children?: React.Node
}


class Tooltip extends React.Component<Props> {
  static defaultProps = {
    placement: 'right',
    classPrefix: `${globalKey}tooltip`
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
      style
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
      >
        <div className={addPrefix('arrow')} style={arrowStyle} />
        <div className={addPrefix('inner')}>
          {children}
        </div>
      </div>
    );
  }
}

export default Tooltip;
