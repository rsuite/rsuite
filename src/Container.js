
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  page: PropTypes.bool
};

const defaultProps = {
  page: false
};

class Container extends React.Component {
  render() {
    const { className, page, ...props } = this.props;
    const pagePrefix = page ? 'page-' : '';
    const classes = classNames(`${pagePrefix}container`, className);

    return (
      <div {...props} className={classes} />
    );
  }
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
