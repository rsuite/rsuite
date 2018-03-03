// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps } from './utils';

type Props = {
  className?: string,
  fluid?: boolean,
  classPrefix: string,
  componentClass: React.ElementType
};

class Grid extends React.Component<Props> {
  render() {
    const { fluid, componentClass: Component, className, classPrefix, ...props } = this.props;

    const clesses = classNames(`${classPrefix}${fluid ? '-fluid' : ''}`, className);

    return <Component {...props} className={clesses} />;
  }
}

export default defaultProps({
  componentClass: 'div',
  classPrefix: 'container'
})(Grid);
