// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  appearance: 'default' | 'inverse' | 'subtle'
}


const Component = createComponent('div');

class Navbar extends React.Component<Props> {

  static defaultProps = {
    appearance: 'default',
    classPrefix: `${globalKey}navbar`
  };

  static childContextTypes = {
    classPrefix: PropTypes.string,
    navbar: PropTypes.bool
  };

  static Header = NavbarHeader;
  static Body = NavbarBody;

  getChildContext() {
    return {
      navbar: true,
      classPrefix: this.props.classPrefix
    };
  }

  render() {
    const {
      className,
      classPrefix,
      appearance,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(
      classPrefix,
      addPrefix(appearance),
      className
    );

    return (
      <Component
        {...props}
        className={classes}
        role="navigation"
      />
    );
  }

}


export default Navbar;
