// @flow

import * as React from 'react';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import classNames from 'classnames';

type Props = {
  className?: string,
  style?: Object,
  classPrefix?: string,
  width?: number | string,
  height?: number | string,
  active?: boolean
};

class PlaceholderGraph extends React.Component<Props> {
  static defaultProps = {
    height: 200
  };

  render() {
    const { className, width, height, style, active, classPrefix, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PlaceholderGraph, rest);
    const classes = classNames(classPrefix, addPrefix('graph'), className, {
      [addPrefix('active')]: active
    });
    return (
      <div
        className={classes}
        style={{
          width: width || '100%',
          height,
          ...style
        }}
        {...unhandled}
      />
    );
  }
}

export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderGraph);
