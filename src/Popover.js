// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix, { globalKey } from './utils/prefix';

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
  placement: PlacementFourSides | PlacementEightPoints,
  classPrefix: string,
  children?: React.Node,
  title?: React.Node,
  style?: Object,
  className?: string,
  onMouseLeave?: (event: SyntheticEvent<*>) => void,
  onMouseEnter?: (event: SyntheticEvent<*>) => void
};

class Popover extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}popover`,
    placement: 'top'
  };
  render() {
    const {
      classPrefix,
      title,
      children,
      style,
      placement,
      className,
      onMouseLeave,
      onMouseEnter
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix(placement)]: true
    });

    const styles = {
      display: 'block',
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

export default Popover;
