/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import BreadcrumbItem from './BreadcrumbItem';
import { defaultProps, prefix } from './utils';

type Props = {
  separator: React.Node,
  componentClass: React.ElementType,
  children?: React.ChildrenArray<React.Element<typeof BreadcrumbItem>>,
  className?: string,
  classPrefix?: string
};

class Breadcrumb extends React.Component<Props> {
  static defaultProps = {
    separator: <i className="icon icon-angle-right" />
  };

  render() {
    const {
      classPrefix,
      componentClass: Component,
      className,
      children,
      separator,
      ...rest
    } = this.props;

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
        {...rest}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames(classPrefix, className)}
      >
        {items}
      </Component>
    );
  }
}

const EnhancedBreadcrumb = defaultProps({
  classPrefix: 'breadcrumb',
  componentClass: 'ol'
})(Breadcrumb);

setStatic('Item', BreadcrumbItem)(EnhancedBreadcrumb);

export default EnhancedBreadcrumb;
