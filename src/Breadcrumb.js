import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BreadcrumbItem from './BreadcrumbItem';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: null
};

class Breadcrumb extends React.Component {
  render() {
    const { className, ...props } = this.props;
    return (
      <ol
        {...props}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames('breadcrumb', className)}
      />
    );
  }
}


Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
