// @flow

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';

type Props = {
  className?: string,
  fluid?: boolean
}

const Component = createComponent();

class Grid extends React.Component<Props> {
  render() {
    const {
      fluid,
      className,
      ...props
    } = this.props;

    const clesses = classNames(`container${fluid ? '-fluid' : ''}`, className);

    return (
      <Component
        {...props}
        className={clesses}
      />
    );
  }
}

export default Grid;
