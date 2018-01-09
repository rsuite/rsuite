// @flow

import * as React from 'react';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import Icon from './Icon';
import Button from './Button';
import type { Props } from './Button';
import prefix, { globalKey } from './utils/prefix';

type IconProps = {
  className?: string,
  iconClassName?: string,
  iconStyle?: Object,
  classPrefix?: string,
  circle?: boolean,
  children?: React.Node,
  placement: 'left' | 'right',
  icon: string | { viewBox: string, id: string },
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
      iconClassName,
      iconStyle,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('circle')]: circle,
      [addPrefix('with-text')]: !isUndefined(children)
    }, addPrefix(`placement-${placement}`), className);

    return (
      <Button {...props} className={classes} >
        <Icon icon={icon} className={iconClassName} style={iconStyle} />
        {children}
      </Button>
    );
  }
}

export default IconButton;

