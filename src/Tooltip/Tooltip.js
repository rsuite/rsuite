

import * as React from 'react';
import classNames from 'classnames';

import { prefix, defaultProps } from './utils';

type Props = {
  positionLeft?: number,
  positionTop?: number,
  visible?: boolean,
  classPrefix?: string,
  className?: string,
  style?: Object,
  children?: React.Node,
  onMouseLeave?: (event: SyntheticEvent<*>) => void,
  onMouseEnter?: (event: SyntheticEvent<*>) => void
};

class Tooltip extends React.Component<Props> {
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

export default defaultProps({
  classPrefix: 'tooltip'
})(Tooltip);
