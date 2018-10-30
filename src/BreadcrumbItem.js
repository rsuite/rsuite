/* @flow */

import * as React from 'react';
import classNames from 'classnames';

import SafeAnchor from './SafeAnchor';
import { defaultProps, prefix } from './utils';

type Props = {
  active?: boolean,
  className?: string,
  style?: Object,
  href?: string,
  title?: string,
  target?: string,
  classPrefix: string,
  componentClass: React.ElementType
};

class BreadcrumbItem extends React.Component<Props> {
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
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);

    const linkProps = { href, title, target };
    const classes = classNames(classPrefix, className, {
      [addPrefix('active')]: active
    });

    return (
      <li style={style} className={classes}>
        {active ? <span {...rest} /> : <Component {...rest} {...linkProps} />}
      </li>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'breadcrumb-item',
  componentClass: SafeAnchor
});

export default enhance(BreadcrumbItem);
