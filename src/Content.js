// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  className?: string,
  classPrefix?: string,
  children?: React.Node
}

class Content extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}content`
  };
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('wrapper'), className);

    return (
      <div
        {...props}
        className={classes}
      >
        <div className={classPrefix}>
          {children}
        </div>
      </div>
    );
  }
}

export default Content;

