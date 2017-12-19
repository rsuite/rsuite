// @flow

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';
import { globalKey } from './utils/prefix';


type Props = {
  className?: string,
  fluid?: boolean,
  classPrefix: string
}

const Component = createComponent();

class Grid extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}container`,
  };
  render() {
    const {
      fluid,
      className,
      classPrefix,
      ...props
    } = this.props;

    const clesses = classNames(`${classPrefix}${fluid ? '-fluid' : ''}`, className);

    return (
      <Component
        {...props}
        className={clesses}
      />
    );
  }
}

export default Grid;
