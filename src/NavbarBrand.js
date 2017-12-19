// @flow

import * as React from 'react';
import classNames from 'classnames';
import { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  children?: React.Element<any>
};

class NavbarBrand extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${globalKey}navbar-brand`
  }
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const classes = classNames(classPrefix, className);

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
