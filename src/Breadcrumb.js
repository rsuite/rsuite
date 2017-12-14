/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import createComponent from './utils/createComponent';

const Component = createComponent('ol');

type Props = {
  separator: React.Node,
  children?: React.ChildrenArray<React.Element<typeof BreadcrumbItem>>,
  className?: string
};

class Breadcrumb extends React.Component<Props> {
  static Item = BreadcrumbItem;
  static defaultProps = {
    separator: <i className="icon icon-angle-right" />
  };
  render() {
    const { className, children, separator, ...props } = this.props;
    const items = [];
    const count = React.Children.count(children);

    if (children) {
      React.Children.forEach(children, (item, index) => {
        items.push(item);
        if (index < count - 1) {
          items.push(
            <li key={index} className="breadcrumb-separator">
              {separator}
            </li>
          );
        }
      });
    }

    return (
      <Component
        {...props}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames('breadcrumb', className)}
      >
        {items}
      </Component>
    );
  }
}

export default Breadcrumb;
