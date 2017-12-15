
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  classPrefix: PropTypes.string,
};

const defaultProps = {
  classPrefix: 'navbar'
};

class NavbarHeader extends React.Component {
  render() {
    const {
      className,
      classPrefix,
      ...props
    } = this.props;
    const classes = classNames(`${classPrefix}-header`, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

NavbarHeader.propTypes = propTypes;
NavbarHeader.defaultProps = defaultProps;

export default NavbarHeader;
