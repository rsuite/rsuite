// @flow

import * as React from 'react';
import classNames from 'classnames';
import prefix from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  children?: React.Element<any>
};

class NavbarBrand extends React.Component<Props> {
  static defaultProps = {
    classPrefix: 'navbar'
  }
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('brand'), className);

    if (children && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(
          children.props.className, classes
        )
      });
    }

    return (
      <span
        {...props}
        className={classes}
      >
        {children}
      </span>
    );
  }
}


export default NavbarBrand;
