// @flow

import * as React from 'react';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { prefix, withStyleProps, defaultProps } from './utils';

type Props = {
  closable?: boolean,
  classPrefix?: string,
  onClose?: (event: SyntheticEvent<*>) => void,
  children?: React.Node,
  className?: string,
  componentClass: React.ElementType
};

class Tag extends React.Component<Props> {
  render() {
    const {
      children,
      componentClass: Component,
      onClose,
      classPrefix,
      closable,
      className,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classnames(classPrefix, className, {
      [addPrefix('closeable')]: closable
    });

    return (
      <Component className={classes} {...rest}>
        <span className={addPrefix('text')}>{children}</span>
        {closable && <i className={addPrefix('icon-close')} />}
      </Component>
    );
  }
}

export default compose(
  withStyleProps({
    hasColor: true
  }),
  defaultProps({
    componentClass: 'div',
    classPrefix: 'tag'
  })
)(Tag);
