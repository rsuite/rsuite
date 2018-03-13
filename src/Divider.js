// @flow

import * as React from 'react';
import classNames from 'classnames';

import { defaultProps, prefix } from './utils';

type Props = {
  className?: string,
  vertical?: boolean,
  classPrefix: string,
  children: React.Node,
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
    const clesses = classNames(classPrefix, className, {
      [addPrefix('vertical')]: vertical
    });

    return (
      <Component {...props} className={clesses}>
        {children ? <span className={addPrefix('inner-text')}>{children}</span> : null}
      </Component>
    );
  }
}

export default defaultProps({
  componentClass: 'div',
  classPrefix: 'divider'
})(Divider);
