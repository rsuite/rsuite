import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const propTypes = {
  classPrefix: PropTypes.string
};

const defaultProps = {
  classPrefix: 'navbar'
};

class NavbarBrand extends React.Component {
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const classes = classNames(`${classPrefix}-brand`, className);

    if (React.isValidElement(children)) {
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

NavbarBrand.propTypes = propTypes;
NavbarBrand.defaultProps = defaultProps;

export default NavbarBrand;
