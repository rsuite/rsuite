// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  vertical?: boolean,
  classPrefix: string,
  children?: React.Node,
  componentClass: React.ElementType
};

class Divider extends React.Component<Props> {
  render() {
    const {
      vertical,
      componentClass: Component,
      className,
      children,
      classPrefix,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix('vertical')]: vertical,
      [addPrefix('horizontal')]: !vertical,
      [addPrefix('with-text')]: !!children
    });

    return (
      <Component {...props} className={classes}>
        {children ? <span className={addPrefix('inner-text')}>{children}</span> : null}
      </Component>
    );
  }
}

export default defaultProps({
  componentClass: 'div',
  classPrefix: 'divider'
})(Divider);
