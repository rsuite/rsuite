import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarHeader from './NavbarHeader';
import NavbarToggle from './NavbarToggle';

const propTypes = {
  classPrefix: PropTypes.string,
  fixedTop: PropTypes.bool,
  fixedBottom: PropTypes.bool,
  inverse: PropTypes.bool,
  componentClass: elementType,
  onToggle: PropTypes.func
};

const defaultProps = {
  classPrefix: 'navbar',
  componentClass: 'div',
  fixedTop: false,
  fixedBottom: false,
  inverse: false,
  onToggle: undefined
};

const childContextTypes = {
  classPrefix: PropTypes.string,
  navbar: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  getChildContext() {
    return {
      navbar: true,
      classPrefix: this.props.classPrefix,
      onToggle: this.handleToggle,
      expanded: this.state.expanded
    };
  }

  handleToggle() {
    const { onToggle } = this.props;
    this.setState({
      expanded: !this.state.expanded
    });
    onToggle && onToggle();
  }

  render() {
    const {
      inverse,
      fixedTop,
      fixedBottom,
      className,
      classPrefix,
      onToggle,
      componentClass: Component,
      ...props
    } = this.props;

    const classes = classNames({
      [`${classPrefix}-default`]: !inverse,
      [`${classPrefix}-inverse`]: inverse,
      [`${classPrefix}-fixed-top`]: fixedTop,
      [`${classPrefix}-fixed-bottom`]: fixedBottom
    }, classPrefix, className);

    return (
      <Component
        {...props}
        className={classes}
        role="navigation"
      />
    );
  }

}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
Navbar.childContextTypes = childContextTypes;


Navbar.Brand = NavbarBrand;
Navbar.Header = NavbarHeader;
Navbar.Collapse = NavbarCollapse;
Navbar.Toggle = NavbarToggle;

export default Navbar;
