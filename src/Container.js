// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';


type Props = {
  className?: string,
  classPrefix?: string
}

class Container extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}container`
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

export default Container;
