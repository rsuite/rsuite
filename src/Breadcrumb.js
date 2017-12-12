/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import createComponent from './utils/createComponent';

const Component = createComponent('ol');

type Props = {
  className?: string
};

class Breadcrumb extends React.Component<Props> {
  static Item = BreadcrumbItem;
  render() {
    const { className, ...props } = this.props;
    return (
      <Component
        {...props}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames('breadcrumb', className)}
      />
    );
  }
}

export default Breadcrumb;
