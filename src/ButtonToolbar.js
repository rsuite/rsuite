/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps } from './utils';

type Props = {
  className?: string,
  classPrefix?: string
};

class ButtonToolbar extends React.Component<Props> {
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return <div role="toolbar" className={classes} {...props} />;
  }
}

export default defaultProps({
  classPrefix: 'btn-toolbar'
})(ButtonToolbar);
