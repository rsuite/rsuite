/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

const Component = createComponent('ol');

type Props = {
  separator: React.Node,
  children?: React.ChildrenArray<React.Element<typeof BreadcrumbItem>>,
  className?: string,
  classPrefix?: string
};

class Breadcrumb extends React.Component<Props> {
  static Item = BreadcrumbItem;
  static defaultProps = {
    separator: <i className="icon icon-angle-right" />,
    classPrefix: `${globalKey}breadcrumb`
  };

  render() {
    const { classPrefix, className, children, separator, ...props } = this.props;
    const items = [];
    const count = React.Children.count(children);
    const addPrefix = prefix(classPrefix);

    if (children) {
      React.Children.forEach(children, (item, index) => {
        items.push(item);
        if (index < count - 1) {
          items.push(
            <li key={index} className={addPrefix('separator')}>
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
        className={classNames(classPrefix, className)}
      >
        {items}
      </Component>
    );
  }
}

export default Breadcrumb;
