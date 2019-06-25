

import * as React from 'react';
import classNames from 'classnames';
import { defaultProps, ReactChildren } from './utils';
import Col from './Col';

type Props = {
  className?: string,
  classPrefix?: string,
  gutter?: number,
  style?: Object,
  componentClass: React.ElementType,
  children: React.ChildrenArray<React.Element<typeof Col>>
};

class Row extends React.Component<Props> {
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

export default defaultProps({
  classPrefix: 'row',
  componentClass: 'div'
})(Row);
