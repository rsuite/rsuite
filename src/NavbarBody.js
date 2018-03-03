// @flow

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps } from './utils';

type Props = {
  classPrefix?: string,
  className?: string,
  children?: React.Node
};

class NavbarBody extends React.Component<Props> {
  render() {
    const { children, classPrefix, className, ...props } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div {...props} className={classes}>
        {children}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'navbar-body'
})(NavbarBody);
