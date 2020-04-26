import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SafeAnchor from '../SafeAnchor';
import { defaultProps, prefix } from '../utils';

import { BreadcrumbItemProps } from './BreadcrumbItem.d';

class BreadcrumbItem extends React.Component<BreadcrumbItemProps> {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    href: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    classPrefix: PropTypes.string,
    componentClass: PropTypes.elementType,
    renderItem: PropTypes.func
  };
  render() {
    const {
      href,
      classPrefix,
      title,
      target,
      componentClass: Component,
      className,
      style,
      active,
      renderItem,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);

    const linkProps = { href, title, target };
    const classes = classNames(classPrefix, className, {
      [addPrefix('active')]: active
    });

    let item: React.ReactNode = <Component {...rest} {...linkProps} />;
    if (renderItem) {
      item = renderItem(item);
    }

    return (
      <li style={style} className={classes}>
        {active ? <span {...rest} /> : item}
      </li>
    );
  }
}

const enhance = defaultProps<BreadcrumbItemProps>({
  classPrefix: 'breadcrumb-item',
  componentClass: SafeAnchor
});

export default enhance(BreadcrumbItem);
