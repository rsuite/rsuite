import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { compose } from 'recompose';
import { prefix, withStyleProps, defaultProps } from '../utils';
import { TagProps } from './Tag.d';

class Tag extends React.Component<TagProps> {
  static propTypes = {
    closable: PropTypes.bool,
    classPrefix: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    componentClass: PropTypes.elementType
  };
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
        {closable && (
          <i role="button" tabIndex={-1} className={addPrefix('icon-close')} onClick={onClose} />
        )}
      </Component>
    );
  }
}

export default compose<any, TagProps>(
  withStyleProps<TagProps>({
    hasColor: true,
    defaultColor: 'default'
  }),
  defaultProps<TagProps>({
    componentClass: 'div',
    classPrefix: 'tag'
  })
)(Tag);
