import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { defaultProps, prefix } from '../utils';
import { DividerProps } from './Divider.d';

class Divider extends React.Component<DividerProps> {
  static propTypes = {
    className: PropTypes.string,
    vertical: PropTypes.bool,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    as: PropTypes.elementType
  };
  render() {
    const { vertical, as: Component, className, children, classPrefix, ...props } = this.props;

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

export default defaultProps<DividerProps>({
  as: 'div',
  classPrefix: 'divider'
})(Divider);
