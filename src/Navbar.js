// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarHeader from './NavbarHeader';
import NavbarToggle from './NavbarToggle';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  appearance: 'default' | 'inverse' | 'subtle',
  onToggle?: (expanded: boolean) => void
}

type States = {
  expanded?: boolean
}

const Component = createComponent('div');

class Navbar extends React.Component<Props, States> {

  static defaultProps = {
    appearance: 'default',
    classPrefix: `${globalKey}navbar`
  };

  static childContextTypes = {
    classPrefix: PropTypes.string,
    navbar: PropTypes.bool,
    expanded: PropTypes.bool,
    onToggle: PropTypes.func
  };

  static Brand = NavbarBrand;
  static Header = NavbarHeader;
  static Collapse = NavbarCollapse;
  static Toggle = NavbarToggle;

  state = {
    expanded: false
  };

  getChildContext() {
    return {
      navbar: true,
      classPrefix: this.props.classPrefix,
      onToggle: this.handleToggle,
      expanded: this.state.expanded
    };
  }

  handleToggle = () => {
    const { onToggle } = this.props;
    const expanded = !this.state.expanded;
    this.setState({ expanded });
    onToggle && onToggle(expanded);
  }

  render() {
    const {
      className,
      classPrefix,
      onToggle,
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
