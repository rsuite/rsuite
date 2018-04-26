// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';

import { prefix, defaultProps, getUnhandledProps } from './utils';

type Props = {
  classPrefix?: string,
  className?: string,
  appearance: 'default' | 'inverse' | 'subtle',
  componentClass: React.ElementType,
  hasChildContext?: boolean
};

class Navbar extends React.Component<Props> {
  static defaultProps = {
    hasChildContext: true,
    appearance: 'default'
  };

  static childContextTypes = {
    navbar: PropTypes.bool
  };

  getChildContext() {
    return {
      navbar: this.props.hasChildContext
    };
  }

  render() {
    const { className, componentClass: Component, classPrefix, appearance, ...rest } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(Navbar, rest);
    const classes = classNames(classPrefix, addPrefix(appearance), className);

    return <Component {...unhandled} className={classes} role="navigation" />;
  }
}

const EnhancedNavbar = defaultProps({
  componentClass: 'div',
  classPrefix: 'navbar'
})(Navbar);

setStatic('Header', NavbarHeader)(EnhancedNavbar);
setStatic('Body', NavbarBody)(EnhancedNavbar);

export default EnhancedNavbar;
