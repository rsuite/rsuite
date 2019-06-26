import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, ReactChildren } from '../utils';

import { RowProps } from './Row.d';

class Row extends React.Component<RowProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    gutter: PropTypes.number,
    style: PropTypes.object,
    componentClass: PropTypes.elementType,
    children: PropTypes.node
  };
  render() {
    const {
      className,
      gutter,
      children,
      componentClass: Component,
      classPrefix,
      style,
      ...props
    } = this.props;

    const classes = classNames(classPrefix, className);

    if (typeof gutter !== 'undefined') {
      const padding = gutter / 2;
      const cols = ReactChildren.mapCloneElement(children, child => ({
        ...child.props,
        style: {
          ...child.props.style,
          paddingLeft: padding,
          paddingRight: padding
        }
      }));
      const styles = {
        ...style,
        marginLeft: -padding,
        marginRight: -padding
      };

      return (
        <Component {...props} className={classes} style={styles}>
          {cols}
        </Component>
      );
    }

    return (
      <Component {...props} className={classes} style={style}>
        {children}
      </Component>
    );
  }
}

export default defaultProps<RowProps>({
  classPrefix: 'row',
  componentClass: 'div'
})(Row);
