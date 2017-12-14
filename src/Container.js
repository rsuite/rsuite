// @flow

import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string,
  page?: boolean
}

class Container extends React.Component<Props> {
  render() {
    const { className, page, ...props } = this.props;
    const pagePrefix = page ? 'page-' : '';
    const classes = classNames(`${pagePrefix}container`, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

export default Container;
