// @flow

import * as React from 'react';
import classNames from 'classnames';

type Props = {
  className?: string,
  children?: React.Node,
  page?: boolean
}

class Content extends React.Component<Props> {
  render() {
    const { className, page, children, ...props } = this.props;
    const pagePrefix = page ? 'page-' : '';
    const classes = classNames(`${pagePrefix}content-wrapper`, className);

    return (
      <div
        {...props}
        className={classes}
      >
        <div className={`${pagePrefix}content`}>
          {children}
        </div>
      </div>
    );
  }
}

export default Content;

