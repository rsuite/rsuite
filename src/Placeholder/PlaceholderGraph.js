// @flow

import * as React from 'react';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import classNames from 'classnames';

type Props = {
  className?: string,
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
    const { className, width, height, active, classPrefix, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PlaceholderGraph, rest);
    const classes = classNames(classPrefix, addPrefix('graph'), className);
    return (
      <div className={classes} {...unhandled}>
        <div
          className={classNames(addPrefix('graph-placeholder'), { [addPrefix('active')]: active })}
          style={{
            width: width || '100%',
            height
          }}
        />
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderGraph);
