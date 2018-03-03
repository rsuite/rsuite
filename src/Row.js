// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  componentClass: React.ElementType
};

class Row extends React.Component<Props> {
  render() {
    const { className, componentClass: Component, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return <Component {...props} className={classes} />;
  }
}

export default defaultProps({
  classPrefix: 'row',
  componentClass: 'div'
})(Row);
