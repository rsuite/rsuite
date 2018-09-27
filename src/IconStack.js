// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  size?: 'lg' | '2x' | '3x' | '4x' | '5x'
};

class IconStack extends React.Component<Props> {
  render() {
    const { className, size, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix(size)]: size
    });
    return <span {...props} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'icon-stack'
})(IconStack);
