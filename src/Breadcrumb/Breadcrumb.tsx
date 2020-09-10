import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';

import BreadcrumbItem from './BreadcrumbItem';
import { defaultProps, prefix, getUnhandledProps } from '../utils';

import { BreadcrumbProps } from './Breadcrumb.d';

interface BreadcrumbState {
  ellipsis: boolean;
}

class Breadcrumb extends React.Component<BreadcrumbProps, BreadcrumbState> {
  static propTypes = {
    separator: PropTypes.node,
    componentClass: PropTypes.elementType,
    children: PropTypes.node,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    maxItems: PropTypes.number,
    onExpand: PropTypes.func
  };
  static defaultProps = {
    separator: '/',
    maxItems: 5
  };

  state = {
    ellipsis: true
  };

  addPrefix = (className: string) => prefix(this.props.classPrefix)(className);
  getSeparatorNode(key) {
    return (
      <li key={key} className={this.addPrefix('separator')}>
        {this.props.separator}
      </li>
    );
  }
  getCollapseItems(items, total) {
    if (total > this.props.maxItems && total > 2 && this.state.ellipsis) {
      return [
        items[0],
        items[1],
        [
          <BreadcrumbItem key="2" onClick={this.handleClickEllipsis}>
            <span>...</span>
          </BreadcrumbItem>
        ],
        items[items.length - 2],
        items[items.length - 1]
      ];
    }
    return items;
  }
  handleClickEllipsis = (event: React.MouseEvent) => {
    this.setState({ ellipsis: false });
    this.props.onExpand?.(event);
  };

  render() {
    const { classPrefix, componentClass: Component, className, children, ...rest } = this.props;
    const unhandledProps = getUnhandledProps(Breadcrumb, rest);
    const total = React.Children.count(children);
    const items = [];

    if (total) {
      React.Children.forEach(children, (item, index) => {
        items.push(item);
        if (index < total - 1) {
          items.push(this.getSeparatorNode(index));
        }
      });
    }

    return (
      <Component
        {...unhandledProps}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames(classPrefix, className)}
      >
        {this.getCollapseItems(items, total)}
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
