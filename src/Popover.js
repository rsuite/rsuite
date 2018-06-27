// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

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
  | 'rightBottom'
  | 'auto'
  | 'autoVertical'
  | 'autoVerticalLeft'
  | 'autoVerticalRight'
  | 'autoHorizontal'
  | 'autoHorizontalTop'
  | 'autoHorizontalBottom';

type Props = {
  placement?: PlacementFourSides | PlacementEightPoints,
  classPrefix: string,
  children?: React.Node,
  title?: React.Node,
  style?: Object,
  visible?: boolean,
  className?: string,
  full?: boolean,
  onMouseLeave?: (event: SyntheticEvent<*>) => void,
  onMouseEnter?: (event: SyntheticEvent<*>) => void
};

class Popover extends React.Component<Props> {
  render() {
    const {
      classPrefix,
      title,
      children,
      style,
      visible,
      placement,
      className,
      full,
      onMouseLeave,
      onMouseEnter
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix(`placement-${_.kebabCase(placement || '')}`)]: placement,
      [addPrefix('full')]: full
    });

    const styles = {
      display: 'block',
      opacity: visible ? 1 : undefined,
      ...style
    };

    return (
      <div
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        className={classes}
        style={styles}
      >
        <div className="arrow" />
        {title ? <h3 className={addPrefix('title')}>{title}</h3> : null}
        <div className={addPrefix('content')}>{children}</div>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'popover'
})(Popover);
