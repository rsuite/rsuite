// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string,
  children?: React.Node
};

class Content extends React.Component<Props> {
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('wrapper'), className);

    return (
      <div {...props} className={classes}>
        <div className={classPrefix}>{children}</div>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'content'
})(Content);
