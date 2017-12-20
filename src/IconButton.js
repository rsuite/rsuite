// @flow

import * as React from 'react';
import classNames from 'classnames';
import IconFont from './IconFont';
import Button from './Button';
import type { Props } from './Button';
import prefix, { globalKey } from './utils/prefix';

type IconProps = {
  className?: string,
  classPrefix?: string,
  circle?: boolean,
  icon: string
}

class IconButton extends React.Component<Props & IconProps> {
  static defaultProps = {
    classPrefix: `${globalKey}btn`
  }
  render() {

    const { icon, circle, classPrefix, className, ...props } = this.props;
    const addPrefix = prefix(classPrefix);

    const classes = classNames({
      [addPrefix('circle')]: circle
    }, className);

    return (
      <Button {...props} className={classes} classPrefix={classPrefix}>
        <IconFont icon={icon} />
      </Button>
    );
  }
}

export default IconButton;

