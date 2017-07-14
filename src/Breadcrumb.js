import React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';

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

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
