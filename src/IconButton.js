// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from './Icon';
import Button from './Button';
import prefix, { globalKey } from './utils/prefix';

import type { Props } from './Button';

type IconProps = {
  className?: string,
  icon?: React.Element<typeof Icon>,
  classPrefix?: string,
  circle?: boolean,
  children?: React.Node,
  placement: 'left' | 'right',
}

class IconButton extends React.Component<Props & IconProps> {
  static defaultProps = {
    placement: 'left',
    classPrefix: `${globalKey}btn-icon`
  }
  render() {

    const {
      icon,
      placement,
      children,
      circle,
      classPrefix,
      className,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('circle')]: circle,
      [addPrefix('with-text')]: !_.isUndefined(children)
    }, addPrefix(`placement-${placement}`), className);

    return (
      <Button {...props} className={classes} >
        {icon}
        {children}
      </Button>
    );
  }
}

export default IconButton;

