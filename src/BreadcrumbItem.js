/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';
import SafeAnchor from './SafeAnchor';
import { globalKey } from './utils/prefix';

type Props = {
  active?: boolean,
  className?: string,
  style?: Object,
  href?: string,
  title?: React.ElementType,
  target?: string,
  classPrefix?: string
};

const Component = createComponent(SafeAnchor);

class BreadcrumbItem extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${globalKey}breadcrumb-item`
  };
  render() {

    const { href, classPrefix, title, target, className, style, active, ...props } = this.props;
    const linkProps = { href, title, target };
    const classes: string = classNames(
      classPrefix,
      { active },
      className
    );

    return (
      <li
        style={style}
        className={classes}
      >
        {active ? (<span {...props} />) : (
          <Component
            {...props}
            {...linkProps}
          />
        )}
      </li>
    );
  }
}

export default BreadcrumbItem;
