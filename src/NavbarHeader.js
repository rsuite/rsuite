
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  prefixClass: PropTypes.string,
};

const defaultProps = {
  prefixClass: 'navbar'
};

class NavbarHeader extends React.Component {
  render() {
    const {
      className,
      prefixClass,
      ...props
    } = this.props;
    const classes = classNames(`${prefixClass}-header`, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

NavbarHeader.propTypes = propTypes;
NavbarHeader.defaultProps = defaultProps;

export default NavbarHeader;
