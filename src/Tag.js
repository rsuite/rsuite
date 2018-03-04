// @flow

import * as React from 'react';
import classnames from 'classnames';
import compose from 'recompose/compose';

import Icon from './Icon';
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
        <span className="rs-tag-text">{children}</span>
        {closable && <Icon icon="close" onClick={onClose} />}
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
